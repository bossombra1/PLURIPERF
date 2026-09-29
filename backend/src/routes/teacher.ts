import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { zodParse } from '../validate.js';
import { query } from '../db.js';
import { requireAuth, requireRole, AuthUser } from '../auth.js';
import { HttpError, asyncHandler } from '../middleware.js';

const router=Router();
router.use(requireAuth,requireRole('teacher'));

router.get('/dashboard',asyncHandler(async(req:Request,res:Response)=>{
 const user=(req as any).user as AuthUser;
 const [courses,pendingSubmissions]=await Promise.all([
  query('SELECT c.id,c.code,c.title_fr,c.title_en,c.ects,c.semester,c.program,(SELECT COUNT(*)::int FROM enrollments e WHERE e.course_id=c.id) AS students FROM courses c JOIN teacher_courses tc ON tc.course_id=c.id WHERE tc.teacher_id=$1 ORDER BY c.code',[user.id]),
  query('SELECT s.id,s.assignment_id,s.submitted_at,a.title_fr,u.full_name AS student FROM submissions s JOIN assignments a ON a.id=s.assignment_id JOIN users u ON u.id=s.user_id JOIN teacher_courses tc ON tc.course_id=a.course_id WHERE s.grade IS NULL AND tc.teacher_id=$1 ORDER BY s.submitted_at ASC LIMIT 50',[user.id])
 ]);
 res.json({teacher:{fullName:user.full_name},courses:courses.rows,pendingSubmissions:pendingSubmissions.rows});
}));
router.get('/courses',asyncHandler(async(req:Request,res:Response)=>{
 const user=(req as any).user as AuthUser;
 const r=await query('SELECT c.id,c.code,c.title_fr,c.title_en,c.ects,c.semester,c.program,(SELECT COUNT(*)::int FROM enrollments e WHERE e.course_id=c.id) AS students FROM courses c JOIN teacher_courses tc ON tc.course_id=c.id WHERE tc.teacher_id=$1 ORDER BY c.code',[user.id]); res.json(r.rows);
}));
router.get('/grades',asyncHandler(async(req:Request,res:Response)=>{
 const user=(req as any).user as AuthUser;
 const r=await query('SELECT e.user_id,u.full_name AS student,u.student_ref,c.id AS course_id,c.code,c.title_fr,e.grade FROM enrollments e JOIN users u ON u.id=e.user_id JOIN courses c ON c.id=e.course_id JOIN teacher_courses tc ON tc.course_id=c.id WHERE tc.teacher_id=$1 ORDER BY c.code,u.full_name',[user.id]); res.json(r.rows);
}));
router.post('/assignments',zodParse(z.object({courseId:z.number().int().positive(),titleFr:z.string().min(3).max(200),titleEn:z.string().min(3).max(200),dueDate:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),description:z.string().max(4000).optional().default('')})),asyncHandler(async(req:Request,res:Response)=>{
 const d=req.body as {courseId:number;titleFr:string;titleEn:string;dueDate:string;description?:string}; const user=(req as any).user as AuthUser;
 if(!(await query('SELECT c.id FROM courses c JOIN teacher_courses tc ON tc.course_id=c.id WHERE c.id=$1 AND tc.teacher_id=$2',[d.courseId,user.id])).rowCount) throw new HttpError(403,'Vous ne gérez pas ce cours');
 const r=await query<{id:number}>('INSERT INTO assignments (course_id,title_fr,title_en,due_date,description) VALUES ($1,$2,$3,$4,$5) RETURNING id',[d.courseId,d.titleFr,d.titleEn,d.dueDate,d.description||'']); res.status(201).json({id:r.rows[0].id});
}));
router.get('/assignments',asyncHandler(async(req:Request,res:Response)=>{
 const user=(req as any).user as AuthUser;
 const r=await query('SELECT a.id,a.title_fr,a.title_en,a.due_date,c.title_fr AS course_title,(SELECT COUNT(*)::int FROM submissions s WHERE s.assignment_id=a.id) AS submissions,(SELECT COUNT(*)::int FROM submissions s WHERE s.assignment_id=a.id AND s.grade IS NULL) AS to_grade FROM assignments a JOIN courses c ON c.id=a.course_id JOIN teacher_courses tc ON tc.course_id=c.id WHERE tc.teacher_id=$1 ORDER BY a.due_date ASC',[user.id]); res.json(r.rows);
}));
router.get('/assignments/:id/submissions',asyncHandler(async(req:Request,res:Response)=>{
 const user=(req as any).user as AuthUser;
 if(!(await query('SELECT a.id FROM assignments a JOIN teacher_courses tc ON tc.course_id=a.course_id WHERE a.id=$1 AND tc.teacher_id=$2',[req.params.id,user.id])).rowCount) throw new HttpError(403,'Vous ne gérez pas ce devoir');
 const r=await query('SELECT s.id,s.submitted_at,s.grade,s.feedback,u.full_name AS student,u.student_ref FROM submissions s JOIN users u ON u.id=s.user_id WHERE s.assignment_id=$1 ORDER BY s.submitted_at ASC',[req.params.id]); res.json(r.rows);
}));
router.patch('/submissions/:id/grade',zodParse(z.object({grade:z.number().min(0).max(20),feedback:z.string().max(2000).optional().default('')})),asyncHandler(async(req:Request,res:Response)=>{
 const user=(req as any).user as AuthUser; const d=req.body as {grade:number;feedback?:string};
 const sub=(await query<{id:number;user_id:number}>('SELECT id,user_id FROM submissions WHERE id=$1',[req.params.id])).rows[0]; if(!sub) throw new HttpError(404,'Dépôt introuvable');
 if(!(await query('SELECT s.id FROM submissions s JOIN assignments a ON a.id=s.assignment_id JOIN teacher_courses tc ON tc.course_id=a.course_id WHERE s.id=$1 AND tc.teacher_id=$2',[req.params.id,user.id])).rowCount) throw new HttpError(403,'Vous ne gérez pas ce devoir');
 await query('UPDATE submissions SET grade=$1,feedback=$2 WHERE id=$3',[d.grade,d.feedback||'',req.params.id]);
 await query("INSERT INTO notifications (user_id,type,payload_fr,payload_en) VALUES ($1,'grade',$2,$3)",[sub.user_id,'Votre devoir a été corrigé : '+d.grade+'/20.','Your assignment has been graded: '+d.grade+'/20.']);
 res.json({ok:true});
}));
router.post('/courses/:id/grades',asyncHandler(async(req:Request,res:Response)=>{
 const user=(req as any).user as AuthUser;
 if(!(await query('SELECT c.id FROM courses c JOIN teacher_courses tc ON tc.course_id=c.id WHERE c.id=$1 AND tc.teacher_id=$2',[req.params.id,user.id])).rowCount) throw new HttpError(403,'Vous ne gérez pas ce cours');
 const students=(await query<{user_id:number;grade:number}>('SELECT e.user_id,e.grade FROM enrollments e WHERE e.course_id=$1 AND e.grade IS NOT NULL',[req.params.id])).rows;
 for(const s of students) await query("INSERT INTO notifications (user_id,type,payload_fr,payload_en) VALUES ($1,'grade_published',$2,$3)",[s.user_id,'Les notes du cours ont été publiées (votre note : '+s.grade+'/20).','Course grades have been published (your grade: '+s.grade+'/20).']);
 res.json({published:students.length});
}));
export default router;
