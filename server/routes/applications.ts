import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import crypto from 'crypto';
import { z } from 'zod';
import { zodParse } from '../validate';
import { db } from '../db';
import { requireAuth, AuthUser } from '../auth';
import { HttpError, asyncHandler } from '../middleware';
import { config } from '../config';
import { notifyStaff } from '../mailer';

const router = Router();

// ---- Secure CV upload (multer) ----
fs.mkdirSync(config.uploadDir, { recursive: true });
const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, config.uploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${ext}`);
    },
  }),
  limits: { fileSize: config.maxFileSizeMb * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const ok = ['.pdf', '.doc', '.docx'].includes(path.extname(file.originalname).toLowerCase());
    cb(null, ok);
  },
});

const applicationSchema = z.object({
  program: z.string().min(1).max(200),
  level: z.string().min(1).max(60),
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  country: z.string().min(2).max(80),
  currentDiploma: z.string().min(1).max(120),
  motivation: z.string().max(4000).optional().default(''),
  needScholarship: z.boolean().optional().default(false),
});

router.post(
  '/',
  upload.single('cv'),
  asyncHandler(async (req: Request, res: Response) => {
    const parsed = applicationSchema.safeParse({
      ...req.body,
      needScholarship: req.body.needScholarship === 'true' || req.body.needScholarship === true,
    });
    if (!parsed.success) {
      if (req.file) fs.unlinkSync(req.file.path);
      throw parsed.error;
    }
    const data = parsed.data;
    const user = (req as any).user as AuthUser | undefined;
    const reference = `PLU-APP-${new Date().getFullYear()}-${crypto.randomInt(1000, 10000)}`;
    const info = db
      .prepare(
        `INSERT INTO applications
         (reference, user_id, program, level, full_name, email, phone, country, current_diploma, motivation, need_scholarship, cv_path, cv_original_name)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        reference,
        user?.id ?? null,
        data.program,
        data.level,
        data.fullName,
        data.email.toLowerCase(),
        data.phone,
        data.country,
        data.currentDiploma,
        data.motivation,
        data.needScholarship ? 1 : 0,
        req.file ? req.file.path : null,
        req.file ? req.file.originalname : null,
      );
    if (user) {
      db.prepare(
        "INSERT INTO notifications (user_id, type, payload_fr, payload_en) VALUES (?, 'application', ?, ?)",
      ).run(
        user.id,
        `Candidature ${reference} déposée pour ${data.program}. Suivez son statut dans votre espace.`,
        `Application ${reference} submitted for ${data.program}. Track its status in your portal.`,
      );
    }
    await notifyStaff(
      `Nouvelle candidature ${reference}`,
      `${data.fullName} (${data.email}) a candidaté au programme "${data.program}" (${data.level}).`,
    );
    res.status(201).json({ reference, id: info.lastInsertRowid });
  }),
);

// Suivi public par référence
router.get(
  '/track/:reference',
  asyncHandler(async (req: Request, res: Response) => {
    const row = db
      .prepare('SELECT reference, program, level, status, created_at FROM applications WHERE reference = ?')
      .get(req.params.reference) as
      | { reference: string; program: string; level: string; status: string; created_at: string }
      | undefined;
    if (!row) throw new HttpError(404, 'Aucun dossier trouvé pour cette référence');
    res.json(row);
  }),
);

// Une candidature précise : propriétaire ou personnel autorisé
router.get(
  '/:id',
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    const row = db.prepare(
      'SELECT id, reference, program, level, full_name, email, phone, country, current_diploma, motivation, need_scholarship, status, created_at FROM applications WHERE id = ?',
    ).get(req.params.id) as any;
    if (!row) throw new HttpError(404, 'Candidature introuvable');
    if (row.email !== user.email && !['advisor', 'editor', 'admin', 'super_admin'].includes(user.role)) {
      throw new HttpError(403, 'Accès refusé');
    }
    res.json(row);
  }),
);

// Mes candidatures (étudiant connecté)
router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    const rows = db
      .prepare(
        'SELECT reference, program, level, status, created_at FROM applications WHERE user_id = ? ORDER BY created_at DESC',
      )
      .all(user.id);
    res.json(rows);
  }),
);

export default router;
// Alias de compatibilité avec l'ancienne route frontend.
router.get('/mine', requireAuth, asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as AuthUser;
  const rows = db.prepare('SELECT reference, program, level, status, created_at FROM applications WHERE user_id = ? ORDER BY created_at DESC').all(user.id);
  res.json(rows);
}));
