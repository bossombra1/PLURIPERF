import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { zodParse } from '../validate';
import { query } from '../db';
import { requireAuth, requireRole, AuthUser } from '../auth';
import { HttpError, asyncHandler } from '../middleware';

const router=Router();
const parseJson=(value:unknown)=>{if(Array.isArray(value))return value;try{return JSON.parse(String(value||'[]'));}catch{return [];}};

router.get('/faculties',asyncHandler(async(_req,res:Response)=>{const r=await query('SELECT * FROM faculties ORDER BY id');res.json(r.rows.map((f:any)=>({...f,keyThemesFr:parseJson(f.key_themes_fr),keyThemesEn:parseJson(f.key_themes_en)})));}));
router.get('/faculties/:id',asyncHandler(async(req:Request,res:Response)=>{const r=await query('SELECT * FROM faculties WHERE id::text=$1 OR slug=$1',[req.params.id]);const row:any=r.rows[0];if(!row)throw new HttpError(404,'Faculté introuvable');row.keyThemesFr=parseJson(row.key_themes_fr);row.keyThemesEn=parseJson(row.key_themes_en);delete row.key_themes_fr;delete row.key_themes_en;res.json(row);}));
router.get('/programs',asyncHandler(async(req:Request,res:Response)=>{
 const {facultyId,q,level}=req.query;const where:string[]=[];const params:unknown[]=[];
 if(facultyId){params.push(facultyId);where.push('faculty_id=$'+params.length);} if(level){params.push(level);where.push('level=$'+params.length);}
 if(q){params.push('%'+q+'%','%'+q+'%');where.push('(title_fr ILIKE $'+(params.length-1)+' OR title_en ILIKE $'+params.length+')');}
 const r=await query('SELECT * FROM programs '+(where.length?'WHERE '+where.join(' AND '):'')+' ORDER BY id',params);
 res.json(r.rows.map((p:any)=>({...p,careerOutcomesFr:parseJson(p.career_outcomes_fr),careerOutcomesEn:parseJson(p.career_outcomes_en)})));
}));
router.get('/programs/:id',asyncHandler(async(req:Request,res:Response)=>{const r=await query('SELECT * FROM programs WHERE id=$1',[req.params.id]);const row:any=r.rows[0];if(!row)throw new HttpError(404,'Formation introuvable');row.careerOutcomesFr=parseJson(row.career_outcomes_fr);row.careerOutcomesEn=parseJson(row.career_outcomes_en);delete row.career_outcomes_fr;delete row.career_outcomes_en;res.json(row);}));
router.get('/news',asyncHandler(async(req:Request,res:Response)=>{const r=await query('SELECT * FROM news '+(!req.query.all?'WHERE published=TRUE ':'')+'ORDER BY date DESC,id DESC');res.json(r.rows.map((n:any)=>({...n,featured:Boolean(n.featured),published:Boolean(n.published)}));}));
router.get('/news/:slug',asyncHandler(async(req:Request,res:Response)=>{const r=await query('SELECT * FROM news WHERE slug=$1',[req.params.slug]);if(!r.rows[0])throw new HttpError(404,'Actualité introuvable');res.json(r.rows[0]);}));
router.get('/library',asyncHandler(async(_req,res:Response)=>res.json((await query('SELECT * FROM library_items ORDER BY year DESC')).rows)));
router.get('/research',asyncHandler(async(_req,res:Response)=>res.json((await query('SELECT * FROM research_projects ORDER BY year DESC')).rows)));

router.get('/forum',requireAuth,asyncHandler(async(_req,res:Response)=>{res.json((await query('SELECT t.id,t.title,t.body,t.created_at,u.full_name AS author FROM forum_topics t LEFT JOIN users u ON u.id=t.user_id ORDER BY t.created_at DESC LIMIT 100')).rows);}));
const topicSchema=z.object({title:z.string().min(3).max(200),body:z.string().max(4000).optional().default('')});
router.post('/forum',requireAuth,zodParse(topicSchema),asyncHandler(async(req:Request,res:Response)=>{const user=(req as any).user as AuthUser;const d=req.body as z.infer<typeof topicSchema>;const r=await query<{id:number}>('INSERT INTO forum_topics (user_id,title,body) VALUES ($1,$2,$3) RETURNING id',[user.id,d.title,d.body]);res.status(201).json({id:r.rows[0].id});}));

router.get('/messages',requireAuth,asyncHandler(async(req:Request,res:Response)=>{const user=(req as any).user as AuthUser;res.json((await query('SELECT m.id,m.subject,m.body,m.read_at,m.created_at,u.full_name AS sender FROM messages m JOIN users u ON u.id=m.sender_id WHERE m.recipient_id=$1 ORDER BY m.created_at DESC',[user.id])).rows);}));
const messageSchema=z.object({recipientEmail:z.string().email(),subject:z.string().min(1).max(200),body:z.string().min(1).max(10000)});
router.post('/messages',requireAuth,zodParse(messageSchema),asyncHandler(async(req:Request,res:Response)=>{const user=(req as any).user as AuthUser;const d=req.body as z.infer<typeof messageSchema>;const recipient=(await query<{id:number}>('SELECT id FROM users WHERE email=$1',[d.recipientEmail.toLowerCase()])).rows[0];if(!recipient)throw new HttpError(404,'Destinataire introuvable');const r=await query<{id:number}>('INSERT INTO messages (sender_id,recipient_id,subject,body) VALUES ($1,$2,$3,$4) RETURNING id',[user.id,recipient.id,d.subject,d.body]);res.status(201).json({id:r.rows[0].id});}));

router.get('/notifications',requireAuth,asyncHandler(async(req:Request,res:Response)=>{const user=(req as any).user as AuthUser;res.json((await query('SELECT * FROM notifications WHERE user_id=$1 ORDER BY created_at DESC LIMIT 50',[user.id])).rows);}));
router.post('/notifications/read',requireAuth,asyncHandler(async(req:Request,res:Response)=>{const user=(req as any).user as AuthUser;await query('UPDATE notifications SET read_at=CURRENT_TIMESTAMP WHERE user_id=$1 AND read_at IS NULL',[user.id]);res.json({ok:true});}));

const newsSchema=z.object({slug:z.string().min(2).max(120),category:z.string().min(2).max(60),titleFr:z.string().min(2),titleEn:z.string().min(2),date:z.string().min(4),summaryFr:z.string().min(2),summaryEn:z.string().min(2),contentFr:z.string().min(2),contentEn:z.string().min(2),featured:z.boolean().optional().default(false)});
router.post('/news',requireAuth,requireRole('editor','admin'),zodParse(newsSchema),asyncHandler(async(req:Request,res:Response)=>{const d=req.body as z.infer<typeof newsSchema>;const r=await query<{id:number}>('INSERT INTO news (slug,category,title_fr,title_en,date,summary_fr,summary_en,content_fr,content_en,featured) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id',[d.slug,d.category,d.titleFr,d.titleEn,d.date,d.summaryFr,d.summaryEn,d.contentFr,d.contentEn,d.featured]);res.status(201).json({id:r.rows[0].id});}));
export default router;
