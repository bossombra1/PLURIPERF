import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { zodParse } from '../validate';
import { db } from '../db';
import { requireAuth, requireRole, AuthUser } from '../auth';
import { HttpError, asyncHandler } from '../middleware';

const router = Router();
router.use(requireAuth, requireRole('admin', 'super_admin'));

const STATUSES = ['submitted', 'under_review', 'accepted', 'rejected', 'waitlisted'] as const;

router.get(
  '/stats',
  asyncHandler(async (_req, res: Response) => {
    const count = (sql: string) => (db.prepare(sql).get() as any).c;
    res.json({
      users: count('SELECT COUNT(*) c FROM users'),
      applications: count('SELECT COUNT(*) c FROM applications'),
      pendingAppointments: count("SELECT COUNT(*) c FROM appointments WHERE status = 'pending'"),
      contactMessages: count('SELECT COUNT(*) c FROM contact_messages WHERE handled = 0'),
      advisoryRequests: count('SELECT COUNT(*) c FROM advisory_requests'),
      news: count('SELECT COUNT(*) c FROM news'),
    });
  }),
);

router.get(
  '/applications',
  asyncHandler(async (_req, res: Response) => {
    res.json(
      db
        .prepare('SELECT id, reference, program, level, full_name, email, status, created_at FROM applications ORDER BY created_at DESC LIMIT 200')
        .all(),
    );
  }),
);

router.patch(
  '/applications/:id/status',
  zodParse(z.object({ status: z.enum(STATUSES) })),
  asyncHandler(async (req: Request, res: Response) => {
    const info = db.prepare('UPDATE applications SET status = ? WHERE id = ?').run(req.body.status, req.params.id);
    if (info.changes === 0) throw new HttpError(404, 'Candidature introuvable');
    const app = db.prepare('SELECT user_id, reference FROM applications WHERE id = ?').get(req.params.id) as any;
    if (app?.user_id) {
      const labels: Record<string, [string, string]> = {
        submitted: ['Candidature reçue', 'Application received'],
        under_review: ['Candidature en cours d’examen', 'Application under review'],
        accepted: ['Candidature acceptée — félicitations !', 'Application accepted — congratulations!'],
        rejected: ['Candidature non retenue', 'Application not retained'],
        waitlisted: ['Candidature sur liste d’attente', 'Application waitlisted'],
      };
      const [fr, en] = labels[req.body.status];
      db.prepare('INSERT INTO notifications (user_id, type, payload_fr, payload_en) VALUES (?, ?, ?, ?)').run(
        app.user_id, 'application_status', `${fr} (${app.reference})`, `${en} (${app.reference})`,
      );
    }
    res.json({ ok: true });
  }),
);

router.get(
  '/appointments',
  asyncHandler(async (_req, res: Response) => {
    res.json(db.prepare('SELECT * FROM appointments ORDER BY date DESC LIMIT 200').all());
  }),
);

router.patch(
  '/appointments/:id/status',
  zodParse(z.object({ status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']) })),
  asyncHandler(async (req: Request, res: Response) => {
    const info = db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(req.body.status, req.params.id);
    if (info.changes === 0) throw new HttpError(404, 'Rendez-vous introuvable');
    res.json({ ok: true });
  }),
);

router.get(
  '/users',
  asyncHandler(async (_req, res: Response) => {
    res.json(
      db.prepare('SELECT id, email, full_name, role, student_ref, is_active, created_at FROM users ORDER BY id DESC LIMIT 500').all(),
    );
  }),
);

router.patch(
  '/users/:id',
  zodParse(
    z.object({
      role: z.enum(['student', 'teacher', 'advisor', 'editor', 'admin', 'super_admin']).optional(),
      isActive: z.boolean().optional(),
    }),
  ),
  asyncHandler(async (req: Request, res: Response) => {
    const { role, isActive } = req.body;
    const current = db.prepare('SELECT id FROM users WHERE id = ?').get(req.params.id);
    if (!current) throw new HttpError(404, 'Utilisateur introuvable');
    if (role !== undefined) db.prepare('UPDATE users SET role = ?, updated_at = datetime("now") WHERE id = ?').run(role, req.params.id);
    if (isActive !== undefined) db.prepare('UPDATE users SET is_active = ?, updated_at = datetime("now") WHERE id = ?').run(isActive ? 1 : 0, req.params.id);
    res.json({ ok: true });
  }),
);

router.get(
  '/contact-messages',
  asyncHandler(async (_req, res: Response) => {
    res.json(db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 200').all());
  }),
);

router.patch(
  '/contact-messages/:id/handled',
  asyncHandler(async (req: Request, res: Response) => {
    db.prepare('UPDATE contact_messages SET handled = 1 WHERE id = ?').run(req.params.id);
    res.json({ ok: true });
  }),
);

router.get(
  '/advisory-requests',
  asyncHandler(async (_req, res: Response) => {
    res.json(db.prepare('SELECT * FROM advisory_requests ORDER BY created_at DESC LIMIT 200').all());
  }),
);

export default router;