import bcrypt from 'bcryptjs';
import { db } from './db';
import {
  FACULTIES_DATA,
  PROGRAMS_DATA,
  NEWS_DATA,
  LIBRARY_DATA,
  RESEARCH_DATA,
} from '../src/data/universityData';

async function main() {
  const hash = await bcrypt.hash('Pluri2026!', 12);
  const insertUser = db.prepare(
    'INSERT OR IGNORE INTO users (email, password_hash, full_name, role, student_ref) VALUES (?, ?, ?, ?, ?)',
  );
  insertUser.run('admin@pluriperf.com', hash, 'Amina Diallo', 'super_admin', null);
  insertUser.run('advisor@pluriperf.com', hash, 'Marc Conseil', 'advisor', null);
  insertUser.run('teacher@pluriperf.com', hash, 'Pr. N’Guessan', 'teacher', 'PR-NGUESSAN-001');
  insertUser.run('sarah@pluriperf.com', hash, 'Sarah Kouassi', 'student', 'PLU-2025-8842');
  insertUser.run('editor@pluriperf.com', hash, 'Léo Rédaction', 'editor', null);

  const insertFaculty = db.prepare(
    `INSERT OR IGNORE INTO faculties
     (slug, name_fr, name_en, dean, description_fr, description_en, key_themes_fr, key_themes_en, degrees_count, highlighted_program_fr, highlighted_program_en)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  const facultyIds: Record<string, number> = {};
  for (const f of FACULTIES_DATA) {
    const info = insertFaculty.run(
      f.id, f.nameFr, f.nameEn, f.dean, f.descriptionFr, f.descriptionEn,
      JSON.stringify(f.keyThemesFr), JSON.stringify(f.keyThemesEn),
      f.degreesCount, f.highlightedProgramFr, f.highlightedProgramEn,
    );
    facultyIds[f.id] =
      Number(info.lastInsertRowid) ||
      (db.prepare('SELECT id FROM faculties WHERE slug = ?').get(f.id) as { id: number }).id;
  }

  const insertProgram = db.prepare(
    `INSERT OR IGNORE INTO programs
     (faculty_id, title_fr, title_en, level, duration_fr, duration_en, modality, ects, description_fr, description_en, career_outcomes_fr, career_outcomes_en)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  for (const p of PROGRAMS_DATA) {
    insertProgram.run(
      facultyIds[p.facultyId] ?? 1, p.titleFr, p.titleEn, p.level,
      p.durationFr, p.durationEn, p.modality, p.ects,
      p.descriptionFr, p.descriptionEn,
      JSON.stringify(p.careerOutcomesFr), JSON.stringify(p.careerOutcomesEn),
    );
  }

  const insertNews = db.prepare(
    `INSERT OR IGNORE INTO news
     (slug, category, title_fr, title_en, date, read_time, summary_fr, summary_en, content_fr, content_en, featured)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  for (const n of NEWS_DATA) {
    insertNews.run(
      n.id, n.category, n.titleFr, n.titleEn, n.date, n.readTime,
      n.summaryFr, n.summaryEn, n.contentFr, n.contentEn, n.featured ? 1 : 0,
    );
  }

  const insertLib = db.prepare(
    `INSERT OR IGNORE INTO library_items
     (type, title_fr, title_en, author, year, category_fr, category_en, file_size_or_duration, read_time, downloads_count)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  for (const l of LIBRARY_DATA) {
    insertLib.run(l.type, l.titleFr, l.titleEn, l.author, l.year, l.categoryFr, l.categoryEn, l.fileSizeOrDuration, l.readTime, l.downloadsCount);
  }

  const insertResearch = db.prepare(
    `INSERT OR IGNORE INTO research_projects
     (title_fr, title_en, center_fr, center_en, lead_researcher, status, year, abstract_fr, abstract_en)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  for (const r of RESEARCH_DATA) {
    insertResearch.run(r.titleFr, r.titleEn, r.centerFr, r.centerEn, r.leadResearcher, r.status, r.year, r.abstractFr, r.abstractEn);
  }

  // Cours + inscription de démo pour le campus virtuel
  const insertCourse = db.prepare(
    'INSERT OR IGNORE INTO courses (code, title_fr, title_en, ects, semester, program) VALUES (?, ?, ?, ?, ?, ?)',
  );
  insertCourse.run('SIEDS-501', 'Systèmes d’information environnementaux', 'Environmental Information Systems', 6, 'S1', 'Master SIEDS');
  insertCourse.run('ECO-410', 'Écologie régénérative appliquée', 'Applied Regenerative Ecology', 4, 'S1', 'Licence Écologie');
  insertCourse.run('LDR-602', 'Leadership régénératif', 'Regenerative Leadership', 5, 'S2', 'Executive Master');

  const courses = db.prepare('SELECT id FROM courses').all() as { id: number }[];
  const sarah = db.prepare('SELECT id FROM users WHERE email = ?').get('sarah@pluriperf.com') as { id: number };
  const insertEnroll = db.prepare('INSERT OR IGNORE INTO enrollments (user_id, course_id, progress, grade) VALUES (?, ?, ?, ?)');
  insertEnroll.run(sarah.id, courses[0]?.id ?? 1, 65, 14.5);
  insertEnroll.run(sarah.id, courses[1]?.id ?? 2, 30, null);

  const t = db.prepare('SELECT id FROM users WHERE email = ?').get('teacher@pluriperf.com') as { id: number };
  const teacherCourses = db.prepare('SELECT id FROM courses ORDER BY id LIMIT 2').all() as { id: number }[];
  const assignTeacher = db.prepare('INSERT OR IGNORE INTO teacher_courses (teacher_id, course_id) VALUES (?, ?)');
  for (const course of teacherCourses) assignTeacher.run(t.id, course.id);
  const existingMessage = db.prepare(
    'SELECT id FROM messages WHERE sender_id = ? AND recipient_id = ? AND subject = ?',
  ).get(t.id, sarah.id, 'Validation de votre projet');
  if (!existingMessage) {
    db.prepare(
      'INSERT INTO messages (sender_id, recipient_id, subject, body) VALUES (?, ?, ?, ?)',
    ).run(
      t.id, sarah.id, 'Validation de votre projet',
      'Bonjour Sarah, j’ai bien pris connaissance de votre projet sur la modélisation bio-inspirée des corridors écologiques. Votre proposition est validée avec mention.',
    );
  }

  console.log('Seed terminé : 5 comptes, facultés, formations, actualités, bibliothèque, recherche, cours.');
  console.log('Comptes de démo (mot de passe : Pluri2026!) :');
  console.log('  admin@pluriperf.com (super_admin)');
  console.log('  advisor@pluriperf.com (advisor)');
  console.log('  teacher@pluriperf.com (teacher)');
  console.log('  sarah@pluriperf.com (student)');
  console.log('  editor@pluriperf.com (editor)');
}

main();
