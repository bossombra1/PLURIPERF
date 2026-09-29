import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import crypto from 'crypto';
import { z } from 'zod';
import { zodParse } from '../validate';
import { query, transaction } from '../db';
import { requireAuth, optionalAuth, AuthUser } from '../auth';
import { HttpError, asyncHandler } from '../middleware';
import { config } from '../config';
import { notifyStaff } from '../mailer';

const router=Router();
fs.mkdirSync(config.uploadDir,{recursive:true});
const upload=multer({
 storage:multer.diskStorage({
  destination:(_req,_file,cb)=>cb(null,config.uploadDir),
  filename:(_req,file,cb)=>cb(null,Date.now()+'-'+crypto.randomBytes(8).toString('hex')+path.extname(file.originalname).toLowerCase())
 }),
 limits:{fileSize:config.maxFileSizeMb*1024*1024,files:1},
 fileFilter:(_req,file,cb)=>{
  const ext=path.extname(file.originalname).toLowerCase();
  const allowed:Record<string,string[]>={'.pdf':['application/pdf'],'.doc':['application/msword','application/octet-stream'],'.docx':['application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/zip']};
  if(!allowed[ext]) return cb(new HttpError(400,'Format de CV non autorisé'));
  if(!allowed[ext].includes(file.mimetype)) return cb(new HttpError(400,'Type MIME de CV invalide'));
  cb(null,true);
 }
});
const applicationSchema=z.object({
 program:z.string().min(1).max(200),level:z.string().min(1).max(60),fullName:z.string().min(2).max(120),
 email:z.string().email(),phone:z.string().min(6).max(30),country:z.string().min(2).max(80),
 currentDiploma:z.string().min(1).max(120),motivation:z.string().max(4000).optional().default(''),needScholarship:z.boolean().optional().default(false)
});

router.post('/',optionalAuth,upload.single('cv'),asyncHandler(async(req:Request,res:Response)=>{
 const parsed=applicationSchema.safeParse({...req.body,needScholarship:req.body.needScholarship==='true'||req.body.needScholarship===true});
 if(!parsed.success){if(req.file)fs.unlinkSync(req.file.path);throw parsed.error;}
 if(req.file){
  const signature=Buffer.alloc(8);const handle=fs.openSync(req.file.path,'r');try{fs.readSync(handle,signature,0,signature.length,0);}finally{fs.closeSync(handle);}
  const ext=path.extname(req.file.originalname).toLowerCase();
  const isPdf=ext==='.pdf'&&signature.subarray(0,4).toString()==='%PDF';
  const isOffice=(['.doc','.docx'].includes(ext)&&signature[0]===0x50&&signature[1]===0x4b)||(ext==='.doc'&&signature[0]===0xd0&&signature[1]===0xcf);
  if(!isPdf&&!isOffice){fs.unlinkSync(req.file.path);throw new HttpError(400,'Le contenu du fichier ne correspond pas à son format déclaré');}
 }
 const data=parsed.data;const user=(req as any).user as AuthUser|undefined;
 const reference='PLU-APP-'+new Date().getFullYear()+'-'+crypto.randomInt(1000,10000);
 try{
  const result=await transaction(async(client)=>{
   const inserted=await client.query<{id:number}>(
    'INSERT INTO applications (reference,user_id,program,level,full_name,email,phone,country,current_diploma,motivation,need_scholarship,cv_path,cv_original_name) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id',
    [reference,user?.id??null,data.program,data.level,data.fullName,data.email.toLowerCase(),data.phone,data.country,data.currentDiploma,data.motivation,Boolean(data.needScholarship),req.file?.path??null,req.file?.originalname??null]);
   const id=inserted.rows[0].id;
   await client.query('INSERT INTO application_history (application_id,status,comment) VALUES ($1,$2,$3)',[id,'submitted','Candidature déposée']);
   if(req.file) await client.query('INSERT INTO application_documents (application_id,document_type,storage_path,original_name,mime_type,size_bytes) VALUES ($1,$2,$3,$4,$5,$6)',[id,'cv',req.file.path,req.file.originalname,req.file.mimetype,req.file.size]);
   if(user) await client.query("INSERT INTO notifications (user_id,type,payload_fr,payload_en) VALUES ($1,'application',$2,$3)",[user.id,'Candidature '+reference+' déposée pour '+data.program+'. Suivez son statut dans votre espace.','Application '+reference+' submitted for '+data.program+'. Track its status in your portal.']);
   return id;
  });
  await notifyStaff('Nouvelle candidature '+reference,data.fullName+' ('+data.email+') a candidaté au programme "'+data.program+'" ('+data.level+').');
  res.status(201).json({reference,id:result});
 }catch(error){if(req.file)try{fs.unlinkSync(req.file.path);}catch{}throw error;}
}));

router.get('/track/:reference',asyncHandler(async(req:Request,res:Response)=>{
 const r=await query('SELECT reference,program,level,status,created_at FROM applications WHERE reference=$1',[req.params.reference]);const row=r.rows[0];
 if(!row)throw new HttpError(404,'Aucun dossier trouvé pour cette référence');res.json(row);
}));
router.get('/:id',requireAuth,asyncHandler(async(req:Request,res:Response)=>{
 const user=(req as any).user as AuthUser;
 const r=await query('SELECT id,reference,program,level,full_name,email,phone,country,current_diploma,motivation,need_scholarship,status,created_at FROM applications WHERE id=$1',[req.params.id]);const row=r.rows[0];
 if(!row)throw new HttpError(404,'Candidature introuvable');
 if(row.email!==user.email&&!['advisor','editor','admin','super_admin'].includes(user.role))throw new HttpError(403,'Accès refusé');
 res.json(row);
}));
router.get('/:id/cv',requireAuth,asyncHandler(async(req:Request,res:Response)=>{
 const user=(req as any).user as AuthUser;
 const r=await query<{user_id:number|null;email:string;cv_path:string|null;cv_original_name:string|null}>('SELECT user_id,email,cv_path,cv_original_name FROM applications WHERE id=$1',[req.params.id]);const row=r.rows[0];
 if(!row||!row.cv_path)throw new HttpError(404,'CV introuvable');
 if(!['advisor','editor','admin','super_admin'].includes(user.role)&&row.user_id!==user.id)throw new HttpError(403,'Accès refusé');
 if(!fs.existsSync(row.cv_path))throw new HttpError(404,'Fichier indisponible');res.download(row.cv_path,row.cv_original_name||'cv');
}));
const listMine=async(req:Request,res:Response)=>{const user=(req as any).user as AuthUser;const r=await query('SELECT reference,program,level,status,created_at FROM applications WHERE user_id=$1 ORDER BY created_at DESC',[user.id]);res.json(r.rows);};
router.get('/me',requireAuth,asyncHandler(listMine));router.get('/mine',requireAuth,asyncHandler(listMine));
export default router;
