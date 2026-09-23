import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { zodParse } from '../validate';
import { db } from '../db';
import { requireAuth, requireRole, AuthUser } from '../auth';
import { HttpError, asyncHandler } from '../middleware';

const router = Router();

router.get(
  '/faculties',
  asyncHandler(async (_req, res: Response) => {
    const rows = db.prepare('SELECT * FROM faculties ORDER BY id').all() as any[];
    res.json(
      rows.map((f) => ({
        ...f,
        keyThemesFr: JSON.parse(f.key_themes_fr || '[]'),
        keyThemesEn: JSON.parse(f.key_themes_en || '[]'),
      })),
    );
  }),
);

router.get(
  '/programs',
  asyncHandler(async (req: Request, res: Response) => {
    const { facultyId, q, level } = req.query;
    let sql = 'SELECT * FROM programs WHERE 1=1';
    const params: unknown[] = [];
    if (facultyId) { sql += ' AND faculty_id = ?'; params.push(facultyId); }
    if (level) { sql += ' AND level = ?'; params.push(level); }
    if (q) { sql += ' AND (title_fr LIKE ? OR title_en LIKE ?)'; params.push(`%${q}%`, `%${q}%`); }
    const rows = db.prepare(sql + ' ORDER BY id').all(...params) as any[];
    res.json(
      rows.map((p) => ({
        ...p,
        careerOutcomesFr: JSON.parse(p.career_outcomes_fr || '[]'),
        careerOutcomesEn: JSON.parse(p.career_outcomes_en || '[]'),
      })),
    );
  }),
);

router.get(
  '/news',
  asyncHandler(async (req: Request, res: Response) => {
    const onlyPublished = !req.query.all;
    const rows = db
      .prepare(`SELECT * FROM news ${onlyPublished ? 'WHERE published = 1' : ''} ORDER BY date DESC, id DESC`)
      .all() as any[];
    res.json(rows.map((n) => ({ ...n, featured: !!n.featured, published: !!n.published })));
  }),
);

router.get(
  '/news/:slug',
  asyncHandler(async (req: Request, res: Response) => {
    const row = db.prepare('SELECT * FROM news WHERE slug = ?').get(req.params.slug);
    if (!row) throw new HttpError(404, 'Actualité introuvable');
    res.json(row);
  }),
);

router.get(
  '/library',
  asyncHandler(async (_req, res: Response) => {
    res.json(db.prepare('SELECT * FROM library_items ORDER BY year DESC').all());
  }),
);

router.get(
  '/research',
  asyncHandler(async (_req, res: Response) => {
    res.json(db.prepare('SELECT * FROM research_projects ORDER BY year DESC').all());
  }),
);

// ---- Forum (authentifié) ----
router.get(
  '/forum',
  requireAuth,
  asyncHandler(async (_req, res: Response) => {
    const rows = db
      .prepare(
        `SELECT t.id, t.title, t.body, t.created_at, u.full_name AS author
         FROM forum_topics t LEFT JOIN users u ON u.id = t.user_id
         ORDER BY t.created_at DESC LIMIT 100`,
      )
      .all();
    res.json(rows);
  }),
);

const topicSchema = z.object({
  title: z.string().min(3).max(200),
  body: z.string().max(4000).optional().default(''),
});

router.post(
  '/forum',
  requireAuth,
  zodParse(topicSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    const { title, body } = req.body as z.infer<typeof topicSchema>;
    const info = db.prepare('INSERT INTO forum_topics (user_id, title, body) VALUES (?, ?, ?)').run(user.id, title, body);
    res.status(201).json({ id: info.lastInsertRowid });
  }),
);

// ---- Messagerie ----
router.get(
  '/messages',
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    const rows = db
      .prepare(
        `SELECT m.id, m.subject, m.body, m.read_at, m.created_at, u.full_name AS sender
         FROM messages m JOIN users u ON u.id = m.sender_id
         WHERE m.recipient_id = ? ORDER BY m.created_at DESC`,
      )
      .all(user.id);
    res.json(rows);
  }),
);

const messageSchema = z.object({
  recipientEmail: z.string().email(),
  subject: z.string().min(1).max(200),
  body: z.string().min(1).max(10000),
});

router.post(
  '/messages',
  requireAuth,
  zodParse(messageSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    const data = req.body as z.infer<typeof messageSchema>;
    const recipient = db.prepare('SELECT id FROM users WHERE email = ?').get(data.recipientEmail.toLowerCase()) as
      | { id: number }
      | undefined;
    if (!recipient) throw new HttpError(404, 'Destinataire introuvable');
    const info = db
      .prepare('INSERT INTO messages (sender_id, recipient_id, subject, body) VALUES (?, ?, ?, ?)')
      .run(user.id, recipient.id, data.subject, data.body);
    res.status(201).json({ id: info.lastInsertRowid });
  }),
);

// ---- Notifications ----
router.get(
  '/notifications',
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    res.json(
      db
        .prepare('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50')
        .all(user.id),
    );
  }),
);

router.post(
  '/notifications/read',
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    db.prepare('UPDATE notifications SET read_at = datetime("now") WHERE user_id = ? AND read_at IS NULL').run(user.id);
    res.json({ ok: true });
  }),
);

// ---- Écriture contenu (editor/admin) ----
const newsSchema = z.object({
  slug: z.string().min(2).max(120),
  category: z.string().min(2).max(60),
  titleFr: z.string().min(2),
  titleEn: z.string().min(2),
  date: z.string().min(4),
  summaryFr: z.string().min(2),
  summaryEn: z.string().min(2),
  contentFr: z.string().min(2),
  contentEn: z.string().min(2),
  featured: z.boolean().optional().default(false),
});

router.post(
  '/news',
  requireAuth,
  requireRole('editor', 'admin'),
  zodParse(newsSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const d = req.body as z.infer<typeof newsSchema>;
    const info = db
      .prepare(
        `INSERT INTO news (slug, category, title_fr, title_en, date, summary_fr, summary_en, content_fr, content_en, featured)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(d.slug, d.category, d.titleFr, d.titleEn, d.date, d.summaryFr, d.summaryEn, d.contentFr, d.contentEn, d.featured ? 1 : 0);
    res.status(201).json({ id: info.lastInsertRowid });
  }),
);

export default router;