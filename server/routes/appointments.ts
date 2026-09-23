import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { zodParse } from '../validate';
import { db } from '../db';
import { requireAuth, AuthUser } from '../auth';
import { HttpError, asyncHandler } from '../middleware';
import { notifyStaff } from '../mailer';

const router = Router();

const appointmentSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date invalide (AAAA-MM-JJ)'),
  timeSlot: z.enum(['09:00', '11:00', '14:30', '16:30']),
  reason: z.enum(['admissions', 'orientation', 'cabinet', 'autre']),
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
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
    // Unicité du créneau
    const clash = db
      .prepare("SELECT id FROM appointments WHERE date = ? AND time_slot = ? AND status != 'cancelled'")
      .get(data.date, data.timeSlot);
    if (clash) throw new HttpError(409, 'Ce créneau est déjà réservé, choisissez-en un autre');
    const user = (req as any).user as AuthUser | undefined;
    // Affectation round-robin à un conseiller
    const advisors = db
      .prepare("SELECT id FROM users WHERE role IN ('advisor','admin','super_admin') AND is_active = 1")
      .all() as { id: number }[];
    const advisorId = advisors.length ? advisors[Math.floor(Math.random() * advisors.length)].id : null;
    const info = db
      .prepare(
        `INSERT INTO appointments (user_id, advisor_id, date, time_slot, reason, full_name, email, phone)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
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
  '/mine',
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

export default router;