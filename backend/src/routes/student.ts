import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { zodParse } from '../validate';
import { query } from '../db';
import { requireAuth, requireRole, AuthUser } from '../auth';
import { HttpError, asyncHandler } from '../middleware';

const router = Router();
router.use(requireAuth, requireRole('student'));

router.get('/dashboard', asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user as AuthUser;
  const [courses, pendingAssignments, grades, notifications] = await Promise.all([
    query('SELECT c.id,c.code,c.title_fr,c.title_en,c.ects,c.semester,c.program,e.progress,e.grade FROM enrollments e JOIN courses c ON c.id=e.course_id WHERE e.user_id=$1 ORDER BY c.code',[user.id]),
    query('SELECT a.id,a.title_fr,a.title_en,a.due_date,c.title_fr AS course_title FROM assignments a JOIN courses c ON c.id=a.course_id JOIN enrollments e ON e.course_id=a.course_id WHERE e.user_id=$1 AND NOT EXISTS (SELECT 1 FROM submissions s WHERE s.assignment_id=a.id AND s.user_id=$1) ORDER BY a.due_date ASC LIMIT 20',[user.id]),
    query('SELECT c.title_fr,c.title_en,c.ects,e.grade FROM enrollments e JOIN courses c ON c.id=e.course_id WHERE e.user_id=$1 AND e.grade IS NOT NULL',[user.id]),
    query('SELECT id,type,payload_fr,payload_en,read_at,created_at FROM notifications WHERE user_id=$1 ORDER BY created_at DESC LIMIT 10',[user.id]),
  ]);
  const gradeRows=grades.rows as {grade:number}[];
  const avg=gradeRows.length ? Math.round(gradeRows.reduce((s,g)=>s+Number(g.grade),0)/gradeRows.length*100)/100 : null;
  res.json({student:{fullName:user.full_name,studentRef:user.student_ref,email:user.email},courses:courses.rows,pendingAssignments:pendingAssignments.rows,grades:grades.rows,notifications:notifications.rows,stats:{enrolled:courses.rowCount,pendingAssignments:pendingAssignments.rowCount,averageGrade:avg}});
}));

router.get('/courses', asyncHandler(async (req: Request,res: Response)=>{
 const user=(req as any).user as AuthUser;
 const r=await query('SELECT c.id,c.code,c.title_fr,c.title_en,c.ects,c.semester,c.program,e.progress,e.grade FROM enrollments e JOIN courses c ON c.id=e.course_id WHERE e.user_id=$1 ORDER BY c.code',[user.id]); res.json(r.rows);
}));
router.get('/grades', asyncHandler(async (req: Request,res: Response)=>{
 const user=(req as any).user as AuthUser;
 const r=await query('SELECT c.code,c.title_fr,c.title_en,c.ects,e.grade FROM enrollments e JOIN courses c ON c.id=e.course_id WHERE e.user_id=$1 ORDER BY c.code',[user.id]);
 const rows=r.rows as {ects:number;grade:number|null}[]; const graded=rows.filter(x=>x.grade!==null);
 const average=graded.length?Math.round(graded.reduce((s,x)=>s+Number(x.grade),0)/graded.length*100)/100:null;
 res.json({rows,ectsTotal:rows.reduce((s,x)=>s+Number(x.ects),0),average});
}));
router.post('/assignments/:id/submit',zodParse(z.object({content:z.string().max(10000).optional().default(''),filePath:z.string().max(500).optional().default('')})),asyncHandler(async(req:Request,res:Response)=>{
 const user=(req as any).user as AuthUser, id=Number(req.params.id);
 if(!(await query('SELECT id FROM assignments WHERE id=$1',[id])).rowCount) throw new HttpError(404,'Devoir introuvable');
 if((await query('SELECT id FROM submissions WHERE assignment_id=$1 AND user_id=$2',[id,user.id])).rowCount) throw new HttpError(409,'Ce devoir a déjà été déposé');
 const r=await query<{id:number}>('INSERT INTO submissions (assignment_id,user_id,file_path) VALUES ($1,$2,$3) RETURNING id',[id,user.id,req.body.filePath||req.body.content||null]);
 res.status(201).json({id:r.rows[0].id,status:'submitted'});
}));
router.get('/assignments',asyncHandler(async(req:Request,res:Response)=>{
 const user=(req as any).user as AuthUser;
 const r=await query('SELECT a.id,a.title_fr,a.title_en,a.due_date,c.title_fr AS course_title,(SELECT COUNT(*)::int FROM submissions s WHERE s.assignment_id=a.id AND s.user_id=$1) AS submitted FROM assignments a JOIN courses c ON c.id=a.course_id JOIN enrollments e ON e.course_id=a.course_id WHERE e.user_id=$1 ORDER BY a.due_date ASC',[user.id]); res.json(r.rows);
}));
router.get('/diplomas',asyncHandler(async(req:Request,res:Response)=>{
 const user=(req as any).user as AuthUser;
 const r=await query('SELECT c.code,c.title_fr,c.title_en,c.ects,e.grade FROM enrollments e JOIN courses c ON c.id=e.course_id WHERE e.user_id=$1 AND e.grade IS NOT NULL AND e.grade>=10 ORDER BY c.code',[user.id]); res.json(r.rows);
}));
export default router;
