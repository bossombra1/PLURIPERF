import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { zodParse } from '../validate';
import { query, transaction } from '../db';
import { requireAuth, optionalAuth, AuthUser } from '../auth';
import { HttpError, asyncHandler } from '../middleware';
import { notifyStaff } from '../mailer';
import { config } from '../config';

const TIME_SLOTS = ['09:00','11:00','14:30','16:30'] as const;
const router=Router();
const appointmentSchema=z.object({
 date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/,'Date invalide (AAAA-MM-JJ)'),timeSlot:z.enum(TIME_SLOTS),
 reason:z.enum(['admissions','orientation','cabinet','autre']),fullName:z.string().min(2).max(120),
 email:z.string().email(),phone:z.string().min(6).max(30),timezone:z.string().min(3).max(80).optional()
});

router.post('/',optionalAuth,zodParse(appointmentSchema),asyncHandler(async(req:Request,res:Response)=>{
 const data=req.body as z.infer<typeof appointmentSchema>;
 if(new Date(data.date+'T'+data.timeSlot+':00')<new Date()) throw new HttpError(400,'Le créneau choisi est dans le passé');
 const user=(req as any).user as AuthUser|undefined;
 const result=await transaction(async(client)=>{
   const clash=await client.query('SELECT id FROM appointments WHERE date=$1 AND time_slot=$2 AND status <> $3 FOR UPDATE',[data.date,data.timeSlot,'cancelled']);
   if(clash.rowCount) throw new HttpError(409,'Ce créneau est déjà réservé, choisissez-en un autre');
   const advisor=await client.query<{id:number}>("SELECT id FROM users WHERE role='advisor' AND is_active=TRUE ORDER BY id LIMIT 1",[ ]);
   const advisorId=advisor.rows[0]?.id??null;
   return client.query<{id:number}>('INSERT INTO appointments (user_id,advisor_id,date,time_slot,reason,full_name,email,phone,timezone) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id',[user?.id??null,advisorId,data.date,data.timeSlot,data.reason,data.fullName,data.email.toLowerCase(),data.phone,data.timezone||config.appointmentTimezone]);
 });
 await notifyStaff('Nouvelle demande de rendez-vous',data.fullName+' ('+data.email+') souhaite un RDV le '+data.date+' à '+data.timeSlot+' GMT — motif : '+data.reason+'.');
 res.status(201).json({id:result.rows[0].id,status:'pending'});
}));

const listMine=async(req:Request,res:Response)=>{const user=(req as any).user as AuthUser;const r=await query('SELECT id,date,time_slot,reason,status,created_at FROM appointments WHERE user_id=$1 OR advisor_id=$1 ORDER BY date DESC',[user.id]);res.json(r.rows);};
router.get('/me',requireAuth,asyncHandler(listMine));
router.get('/mine',requireAuth,asyncHandler(listMine));

router.get('/availability',asyncHandler(async(req:Request,res:Response)=>{
 const date=String(req.query.date||''); if(!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new HttpError(400,'Date invalide');
 const [occupied,configured]=await Promise.all([
  query<{time_slot:string}>("SELECT time_slot FROM appointments WHERE date=$1 AND status <> 'cancelled'",[date]),
  query<{time_slot:string}>('SELECT time_slot FROM advisor_availability WHERE date=$1 AND available=TRUE',[date])
 ]);
 const occupiedSet=new Set(occupied.rows.map(x=>x.time_slot)); const allowed=configured.rows.length?new Set(configured.rows.map(x=>x.time_slot)):new Set<string>(TIME_SLOTS);
 res.json(TIME_SLOTS.filter(x=>allowed.has(x)&&!occupiedSet.has(x)));
}));

router.patch('/:id',requireAuth,zodParse(z.object({status:z.enum(['confirmed','cancelled'])})),asyncHandler(async(req:Request,res:Response)=>{
 const user=(req as any).user as AuthUser; const row=(await query<{id:number;user_id:number|null;advisor_id:number|null}>('SELECT id,user_id,advisor_id FROM appointments WHERE id=$1',[req.params.id])).rows[0];
 if(!row) throw new HttpError(404,'Rendez-vous introuvable');
 if(row.user_id!==user.id&&row.advisor_id!==user.id&&!['admin','super_admin'].includes(user.role)) throw new HttpError(403,'Accès refusé');
 await query('UPDATE appointments SET status=$1 WHERE id=$2',[req.body.status,req.params.id]); res.json({ok:true});
}));
router.delete('/:id',requireAuth,asyncHandler(async(req:Request,res:Response)=>{
 const user=(req as any).user as AuthUser; const row=(await query<{id:number;user_id:number|null}>('SELECT id,user_id FROM appointments WHERE id=$1',[req.params.id])).rows[0];
 if(!row) throw new HttpError(404,'Rendez-vous introuvable');
 if(row.user_id!==user.id&&!['admin','super_admin'].includes(user.role)) throw new HttpError(403,'Accès refusé');
 await query("UPDATE appointments SET status='cancelled' WHERE id=$1",[req.params.id]); res.status(204).send();
}));
export default router;
