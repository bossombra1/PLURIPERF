import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { z } from 'zod';
import { zodParse } from '../validate';
import { db } from '../db';
import { signToken, setAuthCookie, clearAuthCookie, requireAuth, AuthUser } from '../auth';
import { HttpError, asyncHandler } from '../middleware';
import { sendMail } from '../mailer';
import { config } from '../config';

const router = Router();

const publicUser = (u: AuthUser) => ({
  id: u.id,
  email: u.email,
  fullName: u.full_name,
  role: u.role,
  studentRef: u.student_ref,
});

const registerSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8, '8 caractères minimum').max(128),
  fullName: z.string().min(2).max(120),
});

router.post('/register', zodParse(registerSchema), asyncHandler(async (req: Request, res: Response) => {
  const { email, password, fullName } = req.body as z.infer<typeof registerSchema>;
  const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
  if (exists) throw new HttpError(409, 'Un compte existe déjà avec cet email');
  const hash = await bcrypt.hash(password, 12);
  const year = new Date().getFullYear();
  const seq = (db.prepare('SELECT COUNT(*) c FROM users').get() as any).c + 1;
  const studentRef = `PLU-${year}-${String(seq).padStart(4, '0')}`;
  const info = db.prepare(
    "INSERT INTO users (email, password_hash, full_name, role, student_ref) VALUES (?, ?, ?, 'student', ?)",
  ).run(email.toLowerCase(), hash, fullName, studentRef);
  const user = db.prepare(
    'SELECT id, email, full_name, role, student_ref FROM users WHERE id = ?',
  ).get(info.lastInsertRowid) as AuthUser;
  db.prepare(
    "INSERT INTO notifications (user_id, type, payload_fr, payload_en) VALUES (?, 'welcome', ?, ?)",
  ).run(
    user.id,
    `Bienvenue à PLURIPERF, ${user.full_name} ! Votre matricule est ${studentRef}.`,
    `Welcome to PLURIPERF, ${user.full_name}! Your student ID is ${studentRef}.`,
  );
  await sendMail(
    user.email,
    'Bienvenue à PLURIPERF International University',
    `Bonjour ${user.full_name},\n\nVotre compte a été créé. Votre matricule est ${studentRef}.\n\nL'équipe PLURIPERF`,
  );
  setAuthCookie(res, signToken(user));
  res.status(201).json({ user: publicUser(user) });
}));


router.get('/verify-email', asyncHandler(async (req: Request, res: Response) => {
  const token = String(req.query.token || '');
  if (token.length < 10) throw new HttpError(400, 'Jeton de vérification invalide');
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  const row = db.prepare(
    "SELECT id, user_id FROM email_verifications WHERE token_hash = ? AND verified_at IS NULL AND expires_at > datetime('now')",
  ).get(hash) as { id: number; user_id: number } | undefined;
  if (!row) throw new HttpError(400, 'Jeton invalide ou expiré');
  db.prepare('UPDATE email_verifications SET verified_at = datetime("now") WHERE id = ?').run(row.id);
  res.json({ verified: true, message: 'Adresse e-mail vérifiée.' });
}));

const loginSchema = z.object({
  email: z.string().optional(),
  password: z.string().min(1),
  studentRef: z.string().optional(),
}).refine((d) => d.studentRef || (d.email && d.email.includes('@')), {
  message: 'Email ou matricule requis',
});

router.post('/login', zodParse(loginSchema), asyncHandler(async (req: Request, res: Response) => {
  const { email, password, studentRef } = req.body as z.infer<typeof loginSchema>;
  const user = (
    studentRef
      ? db.prepare('SELECT * FROM users WHERE student_ref = ?').get(studentRef)
      : db.prepare('SELECT * FROM users WHERE email = ?').get((email as string).toLowerCase())
  ) as (AuthUser & { password_hash: string; is_active: number }) | undefined;
  if (!user || !user.is_active) throw new HttpError(401, 'Identifiants incorrects');
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) throw new HttpError(401, 'Identifiants incorrects');
  setAuthCookie(res, signToken(user));
  res.json({ user: publicUser(user) });
}));

router.get('/me', requireAuth, (req: Request, res: Response) => {
  res.json({ user: publicUser((req as any).user) });
});

const forgotSchema = z.object({ email: z.string().email() });

router.post('/forgot-password', zodParse(forgotSchema), asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body as z.infer<typeof forgotSchema>;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase()) as
    | { id: number; full_name: string; email: string } | undefined;
  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    const expires = new Date(Date.now() + config.passwordResetTtlMinutes * 60_000).toISOString();
    db.prepare('INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES (?, ?, ?)').run(
      user.id, hash, expires,
    );
    const link = `${config.appUrl}/reset-password?token=${token}`;
    await sendMail(
      user.email,
      'Réinitialisation de votre mot de passe PLURIPERF',
      `Bonjour ${user.full_name},\n\nPour réinitialiser votre mot de passe, ouvrez ce lien (valide ${config.passwordResetTtlMinutes} minutes) :\n${link}\n\nSi vous n'êtes pas à l'origine de cette demande, ignorez cet email.`,
    );
  }
  res.json({ message: 'Si un compte existe, un email de réinitialisation a été envoyé.' });
}));

const resetSchema = z.object({ token: z.string().min(10), password: z.string().min(8).max(128) });

router.post('/reset-password', zodParse(resetSchema), asyncHandler(async (req: Request, res: Response) => {
  const { token, password } = req.body as z.infer<typeof resetSchema>;
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  const row = db.prepare(
    "SELECT * FROM password_resets WHERE token_hash = ? AND used_at IS NULL AND expires_at > datetime('now')",
  ).get(hash) as { id: number; user_id: number } | undefined;
  if (!row) throw new HttpError(400, 'Lien invalide ou expiré');
  const passwordHash = await bcrypt.hash(password, 12);
  db.prepare('UPDATE users SET password_hash = ?, updated_at = datetime("now") WHERE id = ?').run(passwordHash, row.user_id);
  db.prepare('UPDATE password_resets SET used_at = datetime("now") WHERE id = ?').run(row.id);
  clearAuthCookie(res);
  res.json({ message: 'Mot de passe mis à jour. Vous pouvez vous connecter.' });
}));

router.post('/logout', (_req: Request, res: Response) => {
  clearAuthCookie(res);
  res.json({ message: 'Déconnecté' });
});

export default router;
