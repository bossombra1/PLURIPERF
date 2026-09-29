import bcrypt from 'bcryptjs';
import { query } from './db';
import { FACULTIES_DATA, PROGRAMS_DATA, NEWS_DATA, LIBRARY_DATA, RESEARCH_DATA } from '../../frontend/src/data/universityData';

async function main() {
  const hash = await bcrypt.hash('Pluri2026!', 12);

  const users = [
    ['admin@pluriperf.com','Amina Diallo','super_admin',null],
    ['advisor@pluriperf.com','Marc Conseil','advisor',null],
    ['teacher@pluriperf.com','Pr. N’Guessan','teacher','PR-NGUESSAN-001'],
    ['sarah@pluriperf.com','Sarah Kouassi','student','PLU-2025-8842'],
    ['editor@pluriperf.com','Léo Rédaction','editor',null],
  ] as const;

  for (const [email,name,role,studentRef] of users) {
    await query(
      'INSERT INTO users (email,password_hash,full_name,role,student_ref) VALUES ($1,$2,$3,$4,$5) ON CONFLICT(email) DO NOTHING',
      [email,hash,name,role,studentRef],
    );
  }

  const facultyIds: Record<string,number> = {};
  for (const f of FACULTIES_DATA) {
    const r=await query<{id:number}>(
      'INSERT INTO faculties (slug,name_fr,name_en,dean,description_fr,description_en,key_themes_fr,key_themes_en,degrees_count,highlighted_program_fr,highlighted_program_en) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT(slug) DO UPDATE SET name_fr=EXCLUDED.name_fr RETURNING id',
      [f.id,f.nameFr,f.nameEn,f.dean,f.descriptionFr,f.descriptionEn,JSON.stringify(f.keyThemesFr),JSON.stringify(f.keyThemesEn),f.degreesCount,f.highlightedProgramFr,f.highlightedProgramEn],
    );
    facultyIds[f.id]=r.rows[0].id;
  }

  for (const p of PROGRAMS_DATA) {
    await query(
      'INSERT INTO programs (faculty_id,title_fr,title_en,level,duration_fr,duration_en,modality,ects,description_fr,description_en,career_outcomes_fr,career_outcomes_en) SELECT $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12 WHERE NOT EXISTS (SELECT 1 FROM programs WHERE faculty_id=$1 AND title_fr=$2)',
      [facultyIds[p.facultyId]??1,p.titleFr,p.titleEn,p.level,p.durationFr,p.durationEn,p.modality,p.ects,p.descriptionFr,p.descriptionEn,JSON.stringify(p.careerOutcomesFr),JSON.stringify(p.careerOutcomesEn)],
    );
  }

  for (const n of NEWS_DATA) {
    await query(
      'INSERT INTO news (slug,category,title_fr,title_en,date,read_time,summary_fr,summary_en,content_fr,content_en,featured) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT(slug) DO NOTHING',
      [n.id,n.category,n.titleFr,n.titleEn,n.date,n.readTime,n.summaryFr,n.summaryEn,n.contentFr,n.contentEn,n.featured],
    );
  }

  for (const l of LIBRARY_DATA) {
    await query(
      'INSERT INTO library_items (type,title_fr,title_en,author,year,category_fr,category_en,file_size_or_duration,read_time,downloads_count) SELECT $1,$2,$3,$4,$5,$6,$7,$8,$9,$10 WHERE NOT EXISTS (SELECT 1 FROM library_items WHERE title_fr=$2)',
      [l.type,l.titleFr,l.titleEn,l.author,l.year,l.categoryFr,l.categoryEn,l.fileSizeOrDuration,l.readTime,l.downloadsCount],
    );
  }

  for (const r of RESEARCH_DATA) {
    await query(
      'INSERT INTO research_projects (title_fr,title_en,center_fr,center_en,lead_researcher,status,year,abstract_fr,abstract_en) SELECT $1,$2,$3,$4,$5,$6,$7,$8,$9 WHERE NOT EXISTS (SELECT 1 FROM research_projects WHERE title_fr=$1)',
      [r.titleFr,r.titleEn,r.centerFr,r.centerEn,r.leadResearcher,r.status,r.year,r.abstractFr,r.abstractEn],
    );
  }

  const courses=[
    ['SIEDS-501','Systèmes d’information environnementaux','Environmental Information Systems',6,'S1','Master SIEDS'],
    ['ECO-410','Écologie régénérative appliquée','Applied Regenerative Ecology',4,'S1','Licence Écologie'],
    ['LDR-602','Leadership régénératif','Regenerative Leadership',5,'S2','Executive Master'],
  ];
  for(const c of courses) await query('INSERT INTO courses (code,title_fr,title_en,ects,semester,program) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT(code) DO NOTHING',c);

  const sarah=(await query<{id:number}>('SELECT id FROM users WHERE email=$1',['sarah@pluriperf.com'])).rows[0];
  const teacher=(await query<{id:number}>('SELECT id FROM users WHERE email=$1',['teacher@pluriperf.com'])).rows[0];
  const courseRows=(await query<{id:number}>('SELECT id FROM courses ORDER BY id')).rows;
  if(sarah){
    if(courseRows[0]) await query('INSERT INTO enrollments (user_id,course_id,progress,grade) VALUES ($1,$2,$3,$4) ON CONFLICT(user_id,course_id) DO NOTHING',[sarah.id,courseRows[0].id,65,14.5]);
    if(courseRows[1]) await query('INSERT INTO enrollments (user_id,course_id,progress,grade) VALUES ($1,$2,$3,$4) ON CONFLICT(user_id,course_id) DO NOTHING',[sarah.id,courseRows[1].id,30,null]);
  }
  if(teacher) for(const c of courseRows.slice(0,2)) await query('INSERT INTO teacher_courses (teacher_id,course_id) VALUES ($1,$2) ON CONFLICT DO NOTHING',[teacher.id,c.id]);

  console.log('Seed PostgreSQL terminé.');
  console.log('Comptes de démo : admin@pluriperf.com, advisor@pluriperf.com, teacher@pluriperf.com, sarah@pluriperf.com, editor@pluriperf.com');
  console.log('Mot de passe de démonstration : Pluri2026!');
}
main().catch((error)=>{console.error(error);process.exit(1);});
