import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { zodParse } from '../validate.js';
import { query } from '../db.js';
import { requireAuth, requireRole, AuthUser } from '../auth.js';
import { HttpError, asyncHandler } from '../middleware.js';

const router=Router();
router.use(requireAuth,requireRole('admin','super_admin'));
const STATUSES=['submitted','under_review','accepted','rejected','waitlisted'] as const;

router.get('/stats',asyncHandler(async(_req,res:Response)=>{
 const r=await query<{users:number;applications:number;pending_appointments:number;contact_messages:number;advisory_requests:number;news:number}>(`SELECT
 (SELECT COUNT(*)::int FROM users) users,(SELECT COUNT(*)::int FROM applications) applications,
 (SELECT COUNT(*)::int FROM appointments WHERE status='pending') pending_appointments,
 (SELECT COUNT(*)::int FROM contact_messages WHERE handled=FALSE) contact_messages,
 (SELECT COUNT(*)::int FROM advisory_requests) advisory_requests,(SELECT COUNT(*)::int FROM news) news`);
 const x=r.rows[0];res.json({users:x.users,applications:x.applications,pendingAppointments:x.pending_appointments,contactMessages:x.contact_messages,advisoryRequests:x.advisory_requests,news:x.news});
}));
router.get('/applications',asyncHandler(async(_req,res:Response)=>res.json((await query('SELECT id,reference,program,level,full_name,email,status,created_at FROM applications ORDER BY created_at DESC LIMIT 200')).rows)));
router.patch('/applications/:id/status',zodParse(z.object({status:z.enum(STATUSES)})),asyncHandler(async(req:Request,res:Response)=>{
 const actor=(req as any).user as AuthUser;const id=req.params.id;const updated=await query('UPDATE applications SET status=$1 WHERE id=$2',[req.body.status,id]);
 if(!updated.rowCount)throw new HttpError(404,'Candidature introuvable');
 const app=(await query<{user_id:number|null;reference:string}>('SELECT user_id,reference FROM applications WHERE id=$1',[id])).rows[0];
 await query('INSERT INTO application_history (application_id,actor_user_id,status,comment) VALUES ($1,$2,$3,$4)',[id,actor.id,req.body.status,'Mise à jour administrative']);
 if(app?.user_id){const labels:Record<string,[string,string]>={submitted:['Candidature reçue','Application received'],under_review:['Candidature en cours d’examen','Application under review'],accepted:['Candidature acceptée — félicitations !','Application accepted — congratulations!'],rejected:['Candidature non retenue','Application not retained'],waitlisted:['Candidature sur liste d’attente','Application waitlisted']};const [fr,en]=labels[req.body.status];await query("INSERT INTO notifications (user_id,type,payload_fr,payload_en) VALUES ($1,'application_status',$2,$3)",[app.user_id,fr+' ('+app.reference+')',en+' ('+app.reference+')']);}
 res.json({ok:true});
}));
router.get('/appointments',asyncHandler(async(_req,res:Response)=>res.json((await query('SELECT * FROM appointments ORDER BY date DESC LIMIT 200')).rows)));
router.patch('/appointments/:id/status',zodParse(z.object({status:z.enum(['pending','confirmed','cancelled','completed'])})),asyncHandler(async(req:Request,res:Response)=>{const r=await query('UPDATE appointments SET status=$1 WHERE id=$2',[req.body.status,req.params.id]);if(!r.rowCount)throw new HttpError(404,'Rendez-vous introuvable');res.json({ok:true});}));
router.get('/users',asyncHandler(async(_req,res:Response)=>res.json((await query('SELECT id,email,full_name,role,student_ref,is_active,created_at FROM users ORDER BY id DESC LIMIT 500')).rows)));
router.patch('/users/:id',zodParse(z.object({role:z.enum(['student','teacher','advisor','editor','admin','super_admin']).optional(),isActive:z.boolean().optional()})),asyncHandler(async(req:Request,res:Response)=>{
 const {role,isActive}=req.body;const actor=(req as any).user as AuthUser;
 if(role==='super_admin'&&actor.role!=='super_admin')throw new HttpError(403,'Seul un super administrateur peut attribuer ce rôle');
 if(Number(req.params.id)===actor.id&&isActive===false)throw new HttpError(400,'Vous ne pouvez pas désactiver votre propre compte');
 if(!(await query('SELECT id FROM users WHERE id=$1',[req.params.id])).rowCount)throw new HttpError(404,'Utilisateur introuvable');
 if(role!==undefined)await query('UPDATE users SET role=$1,updated_at=CURRENT_TIMESTAMP WHERE id=$2',[role,req.params.id]);
 if(isActive!==undefined)await query('UPDATE users SET is_active=$1,updated_at=CURRENT_TIMESTAMP WHERE id=$2',[isActive,req.params.id]);
 res.json({ok:true});
}));
router.get('/contact-messages',asyncHandler(async(_req,res:Response)=>res.json((await query('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 200')).rows)));
router.patch('/contact-messages/:id/handled',asyncHandler(async(req:Request,res:Response)=>{await query('UPDATE contact_messages SET handled=TRUE WHERE id=$1',[req.params.id]);res.json({ok:true});}));
router.get('/advisory-requests',asyncHandler(async(_req,res:Response)=>res.json((await query('SELECT * FROM advisory_requests ORDER BY created_at DESC LIMIT 200')).rows)));
export default router;
