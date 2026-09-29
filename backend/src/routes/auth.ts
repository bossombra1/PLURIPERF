import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { z } from 'zod';
import { zodParse } from '../validate.js';
import { query, transaction } from '../db.js';
import { signToken, setAuthCookie, clearAuthCookie, requireAuth, AuthUser } from '../auth.js';
import { HttpError, asyncHandler } from '../middleware.js';
import { sendMail } from '../mailer.js';
import { config } from '../config.js';

const router = Router();

const sensitiveLimiter = rateLimit({
  windowMs: 15 * 60_000,
  limit: 20,
  standardHeaders: true,
  message: { error: 'RATE_LIMITED', message: 'Trop de tentatives. Réessayez plus tard.' },
});

const publicUser = (u: AuthUser) => ({
  id: u.id,
  email: u.email,
  fullName: u.full_name,
  role: u.role,
  studentRef: u.student_ref,
});

router.get('/verify-email', asyncHandler(async (req: Request, res: Response) => {
  const token = String(req.query.token || '');
  if (token.length < 10) throw new HttpError(400, 'Jeton de vérification invalide');
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  const result = await query<{ id: number; user_id: number }>(
    "SELECT id, user_id FROM email_verifications WHERE token_hash = $1 AND verified_at IS NULL AND expires_at > CURRENT_TIMESTAMP",
    [hash],
  );
  const row = result.rows[0];
  if (!row) throw new HttpError(400, 'Jeton invalide ou expiré');
  await query('UPDATE email_verifications SET verified_at = CURRENT_TIMESTAMP WHERE id = $1', [row.id]);
  res.json({ verified: true, message: 'Adresse e-mail vérifiée.' });
}));

const loginSchema = z.object({
  email: z.string().optional(),
  password: z.string().min(1),
  studentRef: z.string().optional(),
}).refine((d) => d.studentRef || (d.email && d.email.includes('@')), { message: 'Email ou matricule requis' });

router.post('/login', sensitiveLimiter, zodParse(loginSchema), asyncHandler(async (req: Request, res: Response) => {
  const { email, password, studentRef } = req.body as z.infer<typeof loginSchema>;
  const result = studentRef
    ? await query<AuthUser & { password_hash: string; is_active: boolean }>('SELECT * FROM users WHERE student_ref = $1', [studentRef])
    : await query<AuthUser & { password_hash: string; is_active: boolean }>('SELECT * FROM users WHERE email = $1', [(email as string).toLowerCase()]);
  const user = result.rows[0];
  if (!user || !user.is_active) throw new HttpError(401, 'Identifiants incorrects');
  if (!(await bcrypt.compare(password, user.password_hash))) throw new HttpError(401, 'Identifiants incorrects');
  setAuthCookie(res, signToken(user));
  res.json({ user: publicUser(user) });
}));

router.get('/me', requireAuth, (req: Request, res: Response) => {
  res.json({ user: publicUser((req as any).user) });
});

const forgotSchema = z.object({ email: z.string().email() });

router.post('/forgot-password', sensitiveLimiter, zodParse(forgotSchema), asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body as z.infer<typeof forgotSchema>;
  const result = await query<{ id: number; full_name: string; email: string }>('SELECT id, full_name, email FROM users WHERE email = $1', [email.toLowerCase()]);
  const user = result.rows[0];
  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    const expires = new Date(Date.now() + config.passwordResetTtlMinutes * 60_000);
    await query('INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES ($1, $2, $3)', [user.id, hash, expires]);
    const link = config.appUrl + '/reset-password?token=' + token;
    await sendMail(user.email, 'Réinitialisation de votre mot de passe PLURIPERF', 'Bonjour ' + user.full_name + ',\n\nPour réinitialiser votre mot de passe, ouvrez ce lien (valide ' + config.passwordResetTtlMinutes + ' minutes) :\n' + link);
  }
  res.json({ message: 'Si un compte existe, un email de réinitialisation a été envoyé.' });
}));

const resetSchema = z.object({ token: z.string().min(10), password: z.string().min(8).max(128) });

router.post('/reset-password', sensitiveLimiter, zodParse(resetSchema), asyncHandler(async (req: Request, res: Response) => {
  const { token, password } = req.body as z.infer<typeof resetSchema>;
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  const result = await query<{ id: number; user_id: number }>(
    "SELECT id, user_id FROM password_resets WHERE token_hash = $1 AND used_at IS NULL AND expires_at > CURRENT_TIMESTAMP",
    [hash],
  );
  const row = result.rows[0];
  if (!row) throw new HttpError(400, 'Lien invalide ou expiré');
  const passwordHash = await bcrypt.hash(password, 12);
  await transaction(async (client) => {
    await client.query('UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [passwordHash, row.user_id]);
    await client.query('UPDATE password_resets SET used_at = CURRENT_TIMESTAMP WHERE id = $1', [row.id]);
  });
  clearAuthCookie(res);
  res.json({ message: 'Mot de passe mis à jour. Vous pouvez vous connecter.' });
}));

router.post('/logout', (_req: Request, res: Response) => {
  clearAuthCookie(res);
  res.json({ message: 'Déconnecté' });
});

export default router;
