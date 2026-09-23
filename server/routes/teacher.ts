import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { zodParse } from '../validate';
import { db } from '../db';
import { requireAuth, requireRole, AuthUser } from '../auth';
import { HttpError, asyncHandler } from '../middleware';

const router = Router();
router.use(requireAuth, requireRole('teacher'));

// Tableau de bord enseignant
router.get(
  '/dashboard',
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    const courses = db
      .prepare(
        `SELECT c.id, c.code, c.title_fr, c.title_en, c.ects, c.semester, c.program,
                (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.id) AS students
         FROM courses c
         JOIN teacher_courses tc ON tc.course_id = c.id
         WHERE tc.teacher_id = ?
         ORDER BY c.code`,
      )
.all(user.id);
    const pendingSubmissions = db.prepare(
      `SELECT s.id, s.assignment_id, s.submitted_at, a.title_fr, u.full_name AS student
       FROM submissions s
       JOIN assignments a ON a.id = s.assignment_id
       JOIN users u ON u.id = s.user_id
       JOIN teacher_courses tc ON tc.course_id = a.course_id
       WHERE s.grade IS NULL AND tc.teacher_id = ?
       ORDER BY s.submitted_at ASC LIMIT 50`,
    ).all(user.id);
    res.json({ teacher: { fullName: user.full_name }, courses, pendingSubmissions });
  }),
);

// Cours enseignés
router.get(
  '/courses',
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    res.json(
      db.prepare(
        `SELECT c.id, c.code, c.title_fr, c.title_en, c.ects, c.semester, c.program,
                (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.id) AS students
         FROM courses c JOIN teacher_courses tc ON tc.course_id = c.id
         WHERE tc.teacher_id = ? ORDER BY c.code`,
      ).all(user.id),
    );
  }),
);

// Créer un devoir
router.post(
  '/assignments',
  zodParse(
    z.object({
      courseId: z.number().int().positive(),
      titleFr: z.string().min(3).max(200),
      titleEn: z.string().min(3).max(200),
      dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date invalide (AAAA-MM-JJ)'),
      description: z.string().max(4000).optional().default(''),
    }),
  ),
  asyncHandler(async (req: Request, res: Response) => {
    const { courseId, titleFr, titleEn, dueDate, description } = req.body as {
      courseId: number;
      titleFr: string;
      titleEn: string;
      dueDate: string;
      description?: string;
    };
    const user = (req as any).user as AuthUser;
    const course = db.prepare(
      'SELECT c.id FROM courses c JOIN teacher_courses tc ON tc.course_id = c.id WHERE c.id = ? AND tc.teacher_id = ?',
    ).get(courseId, user.id);
    if (!course) throw new HttpError(403, 'Vous ne gérez pas ce cours');
    const info = db
      .prepare('INSERT INTO assignments (course_id, title_fr, title_en, due_date, description) VALUES (?, ?, ?, ?, ?)')
      .run(courseId, titleFr, titleEn, dueDate, description || '');
    res.status(201).json({ id: info.lastInsertRowid });
  }),
);

// Liste des devoirs + dépôts
router.get(
  '/assignments',
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    res.json(
      db.prepare(
        `SELECT a.id, a.title_fr, a.title_en, a.due_date, c.title_fr AS course_title,
                (SELECT COUNT(*) FROM submissions s WHERE s.assignment_id = a.id) AS submissions,
                (SELECT COUNT(*) FROM submissions s WHERE s.assignment_id = a.id AND s.grade IS NULL) AS to_grade
         FROM assignments a JOIN courses c ON c.id = a.course_id
         JOIN teacher_courses tc ON tc.course_id = c.id
         WHERE tc.teacher_id = ?
         ORDER BY a.due_date ASC`,
      ).all(user.id),
    );
  }),
);

// Dépôts d'un devoir
router.get(
  '/assignments/:id/submissions',
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    const assignment = db.prepare(
      `SELECT a.id FROM assignments a JOIN teacher_courses tc ON tc.course_id = a.course_id
       WHERE a.id = ? AND tc.teacher_id = ?`,
    ).get(req.params.id, user.id);
    if (!assignment) throw new HttpError(403, 'Vous ne gérez pas ce devoir');
    res.json(db.prepare(
      `SELECT s.id, s.submitted_at, s.grade, s.feedback, u.full_name AS student, u.student_ref
       FROM submissions s JOIN users u ON u.id = s.user_id
       WHERE s.assignment_id = ? ORDER BY s.submitted_at ASC`,
    ).all(req.params.id));
  }),
);

// Corriger un dépôt (grade + feedback) — notifie l'étudiant
router.patch(
  '/submissions/:id/grade',
  zodParse(z.object({ grade: z.number().min(0).max(20), feedback: z.string().max(2000).optional().default('') })),
  asyncHandler(async (req: Request, res: Response) => {
    const { grade, feedback } = req.body as { grade: number; feedback?: string };
    const user = (req as any).user as AuthUser;
    const sub = db.prepare('SELECT id, user_id FROM submissions WHERE id = ?').get(req.params.id) as
      | { id: number; user_id: number }
      | undefined;
    if (!sub) throw new HttpError(404, 'Dépôt introuvable');
    const managed = db.prepare(
      `SELECT s.id FROM submissions s JOIN assignments a ON a.id = s.assignment_id
       JOIN teacher_courses tc ON tc.course_id = a.course_id
       WHERE s.id = ? AND tc.teacher_id = ?`,
    ).get(req.params.id, user.id);
    if (!managed) throw new HttpError(403, 'Vous ne gérez pas ce devoir');
    db.prepare('UPDATE submissions SET grade = ?, feedback = ? WHERE id = ?').run(grade, feedback || '', req.params.id);
    db.prepare("INSERT INTO notifications (user_id, type, payload_fr, payload_en) VALUES (?, 'grade', ?, ?)").run(
      sub.user_id,
      `Votre devoir a été corrigé : ${grade}/20.`,
      `Your assignment has been graded: ${grade}/20.`,
    );
    res.json({ ok: true });
  }),
);

// Publier les notes d'un cours (verrouille les enrollments)
router.post(
  '/courses/:id/grades',
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user as AuthUser;
    const course = db.prepare(
      'SELECT c.id FROM courses c JOIN teacher_courses tc ON tc.course_id = c.id WHERE c.id = ? AND tc.teacher_id = ?',
    ).get(req.params.id, user.id);
    if (!course) throw new HttpError(403, 'Vous ne gérez pas ce cours');
    const students = db
      .prepare(
        `SELECT e.user_id, e.grade FROM enrollments e
         WHERE e.course_id = ? AND e.grade IS NOT NULL`,
      )
      .all(req.params.id) as { user_id: number; grade: number }[];
    for (const s of students) {
      db.prepare("INSERT INTO notifications (user_id, type, payload_fr, payload_en) VALUES (?, 'grade_published', ?, ?)").run(
        s.user_id,
        `Les notes du cours ont été publiées (votre note : ${s.grade}/20).`,
        `Course grades have been published (your grade: ${s.grade}/20).`,
      );
    }
    res.json({ published: students.length });
  }),
);

export default router;
