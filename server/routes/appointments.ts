import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { zodParse } from '../validate';
import { db } from '../db';
import { requireAuth, AuthUser } from '../auth';
import { HttpError, asyncHandler } from '../middleware';
import { notifyStaff } from '../mailer';
import { config } from '../config';

const TIME_SLOTS = ['09:00', '11:00', '14:30', '16:30'] as const;

const router = Router();

const appointmentSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date invalide (AAAA-MM-JJ)'),
  timeSlot: z.enum(TIME_SLOTS),
  reason: z.enum(['admissions', 'orientation', 'cabinet', 'autre']),
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  timezone: z.string().min(3).max(80).optional(),
});

router.post(
  '/',
  zodParse(appointmentSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const data = req.body as z.infer<typeof appointmentSchema>;
    // Refuser les créneaux passés
    if (new Date(`${data.date}T${data.timeSlot}:00`) < new Date()) {
      throw new HttpError(400, 'Le créneau choisi est dans le passé');
    }
    const clash = db
      .prepare("SELECT id FROM appointments WHERE date = ? AND time_slot = ? AND status != 'cancelled'")
      .get(data.date, data.timeSlot);
    if (clash) throw new HttpError(409, 'Ce créneau est déjà réservé, choisissez-en un autre');
    const user = (req as any).user as AuthUser | undefined;
    const advisor = db
      .prepare("SELECT id FROM users WHERE role = 'advisor' AND is_active = 1 ORDER BY id LIMIT 1")
      .get() as { id: number } | undefined;
    const advisorId = advisor?.id ?? null;
    const info = db
      .prepare(
        `INSERT INTO appointments (user_id, advisor_id, date, time_slot, reason, full_name, email, phone, timezone)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        user?.id ?? null,
        advisorId,
        data.date,
        data.timeSlot,
        data.reason,
        data.fullName,
        data.email.toLowerCase(),
        data.phone,
        data.timezone || config.appointmentTimezone,
      );
    await notifyStaff(
      'Nouvelle demande de rendez-vous',
      `${data.fullName} (${data.email}) souhaite un RDV le ${data.date} à ${data.timeSlot} GMT — motif : ${data.reason}.`,
    );
    res.status(201).json({ id: info.lastInsertRowid, status: 'pending' });
  }),
);

// Mes rendez-vous
router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    const rows = db
      .prepare(
        'SELECT id, date, time_slot, reason, status, created_at FROM appointments WHERE user_id = ? OR advisor_id = ? ORDER BY date DESC',
      )
      .all(user.id, user.id);
    res.json(rows);
  }),
);

// Ancien nom conservé pour compatibilité avec les clients déjà déployés.
router.get('/mine', requireAuth, asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as AuthUser;
  const rows = db.prepare(
    'SELECT id, date, time_slot, reason, status, created_at FROM appointments WHERE user_id = ? OR advisor_id = ? ORDER BY date DESC',
  ).all(user.id, user.id);
  res.json(rows);
}));

// Créneaux publics disponibles. La disponibilité explicite d'un conseiller peut être utilisée
// par l'administration ; à défaut, les quatre créneaux institutionnels sont proposés.
router.get('/availability', asyncHandler(async (req: Request, res: Response) => {
  const date = String(req.query.date || '');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new HttpError(400, 'Date invalide');
  const rows = db.prepare(
    "SELECT time_slot FROM appointments WHERE date = ? AND status != 'cancelled'",
  ).all(date) as { time_slot: string }[];
  const occupied = new Set(rows.map((r) => r.time_slot));
  const configured = db.prepare(
    "SELECT time_slot FROM advisor_availability WHERE date = ? AND available = 1",
  ).all(date) as { time_slot: string }[];
  const allowed = configured.length ? new Set(configured.map((r) => r.time_slot)) : new Set<string>(TIME_SLOTS);
  res.json(TIME_SLOTS.filter((slot) => allowed.has(slot) && !occupied.has(slot)));
}));

router.patch('/:id', requireAuth, zodParse(
  z.object({ status: z.enum(['confirmed', 'cancelled']) }),
), asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as AuthUser;
  const row = db.prepare('SELECT id, user_id, advisor_id FROM appointments WHERE id = ?').get(req.params.id) as
    | { id: number; user_id: number | null; advisor_id: number | null } | undefined;
  if (!row) throw new HttpError(404, 'Rendez-vous introuvable');
  const canManage = row.user_id === user.id || row.advisor_id === user.id || ['admin', 'super_admin'].includes(user.role);
  if (!canManage) throw new HttpError(403, 'Accès refusé');
  db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(req.body.status, req.params.id);
  res.json({ ok: true });
}));

router.delete('/:id', requireAuth, asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as AuthUser;
  const row = db.prepare('SELECT id, user_id, advisor_id FROM appointments WHERE id = ?').get(req.params.id) as
    | { id: number; user_id: number | null; advisor_id: number | null } | undefined;
  if (!row) throw new HttpError(404, 'Rendez-vous introuvable');
  if (row.user_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
    throw new HttpError(403, 'Accès refusé');
  }
  db.prepare("UPDATE appointments SET status = 'cancelled' WHERE id = ?").run(req.params.id);
  res.status(204).send();
}));

export default router;
