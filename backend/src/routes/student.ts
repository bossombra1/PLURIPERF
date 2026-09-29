import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { zodParse } from '../validate';
import { db } from '../db';
import { requireAuth, requireRole, AuthUser } from '../auth';
import { HttpError, asyncHandler } from '../middleware';

const router = Router();
router.use(requireAuth, requireRole('student'));

// Tableau de bord étudiant (cours, devoirs à rendre, notes, notifications)
router.get(
  '/dashboard',
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    const courses = db
      .prepare(
        `SELECT c.id, c.code, c.title_fr, c.title_en, c.ects, c.semester, c.program, e.progress, e.grade
         FROM enrollments e JOIN courses c ON c.id = e.course_id
         WHERE e.user_id = ? ORDER BY c.code`,
      )
      .all(user.id);
    const pendingAssignments = db
      .prepare(
        `SELECT a.id, a.title_fr, a.title_en, a.due_date, c.title_fr AS course_title
         FROM assignments a
         JOIN courses c ON c.id = a.course_id
         JOIN enrollments e ON e.course_id = a.course_id
         WHERE e.user_id = ?
           AND NOT EXISTS (SELECT 1 FROM submissions s WHERE s.assignment_id = a.id AND s.user_id = ?)
         ORDER BY a.due_date ASC LIMIT 20`,
      )
      .all(user.id, user.id);
    const grades = db
      .prepare(
        `SELECT c.title_fr, c.title_en, c.ects, e.grade
         FROM enrollments e JOIN courses c ON c.id = e.course_id
         WHERE e.user_id = ? AND e.grade IS NOT NULL`,
      )
      .all(user.id);
    const notifications = db
      .prepare('SELECT id, type, payload_fr, payload_en, read_at, created_at FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 10')
      .all(user.id);
    const avg =
      grades.length > 0
        ? Math.round(((grades as { grade: number }[]).reduce((s, g) => s + g.grade, 0) / grades.length) * 100) / 100
        : null;
    res.json({
      student: { fullName: user.full_name, studentRef: user.student_ref, email: user.email },
      courses,
      pendingAssignments,
      grades,
      notifications,
      stats: { enrolled: courses.length, pendingAssignments: pendingAssignments.length, averageGrade: avg },
    });
  }),
);

// Mes cours
router.get(
  '/courses',
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    res.json(
      db
        .prepare(
          `SELECT c.id, c.code, c.title_fr, c.title_en, c.ects, c.semester, c.program, e.progress, e.grade
           FROM enrollments e JOIN courses c ON c.id = e.course_id
           WHERE e.user_id = ? ORDER BY c.code`,
        )
        .all(user.id),
    );
  }),
);

// Mes notes / crédits ECTS
router.get(
  '/grades',
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    const rows = db
      .prepare(
        `SELECT c.code, c.title_fr, c.title_en, c.ects, e.grade
         FROM enrollments e JOIN courses c ON c.id = e.course_id
         WHERE e.user_id = ? ORDER BY c.code`,
      )
      .all(user.id) as { ects: number; grade: number | null }[];
    const ectsTotal = rows.reduce((s, r) => s + r.ects, 0);
    const graded = rows.filter((r) => r.grade !== null);
    const average = graded.length ? Math.round((graded.reduce((s, r) => s + (r.grade as number), 0) / graded.length) * 100) / 100 : null;
    res.json({ rows, ectsTotal, average });
  }),
);

// Dépôt d'un devoir (fichier ou texte)
router.post(
  '/assignments/:id/submit',
  zodParse(z.object({ content: z.string().max(10000).optional().default(''), filePath: z.string().max(500).optional().default('') })),
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    const assignmentId = Number(req.params.id);
    const assignment = db.prepare('SELECT id FROM assignments WHERE id = ?').get(assignmentId);
    if (!assignment) throw new HttpError(404, 'Devoir introuvable');
    const already = db
      .prepare('SELECT id FROM submissions WHERE assignment_id = ? AND user_id = ?')
      .get(assignmentId, user.id);
    if (already) throw new HttpError(409, 'Ce devoir a déjà été déposé');
    const info = db
      .prepare('INSERT INTO submissions (assignment_id, user_id, file_path) VALUES (?, ?, ?)')
      .run(assignmentId, user.id, req.body.filePath || req.body.content || null);
    res.status(201).json({ id: info.lastInsertRowid, status: 'submitted' });
  }),
);

// Mes devoirs (avec statut de dépôt)
router.get(
  '/assignments',
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    res.json(
      db
        .prepare(
          `SELECT a.id, a.title_fr, a.title_en, a.due_date, c.title_fr AS course_title,
                  (SELECT COUNT(*) FROM submissions s WHERE s.assignment_id = a.id AND s.user_id = ?) AS submitted
           FROM assignments a
           JOIN courses c ON c.id = a.course_id
           JOIN enrollments e ON e.course_id = a.course_id
           WHERE e.user_id = ?
           ORDER BY a.due_date ASC`,
        )
        .all(user.id, user.id),
    );
  }),
);

// Mes diplômes (consultation ; émission gérée côté admin/enseignant)
router.get(
  '/diplomas',
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    res.json(
      db
        .prepare(
          `SELECT c.code, c.title_fr, c.title_en, c.ects, e.grade
           FROM enrollments e JOIN courses c ON c.id = e.course_id
           WHERE e.user_id = ? AND e.grade IS NOT NULL AND e.grade >= 10
           ORDER BY c.code`,
        )
        .all(user.id),
    );
  }),
);

export default router;
