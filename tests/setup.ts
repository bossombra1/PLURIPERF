import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-for-vitest-0123456789abcdef';
process.env.DB_PATH = './data/test.db';

for (const p of ['./data/test.db', './data/test.db-wal', './data/test.db-shm']) {
  try { fs.rmSync(p, { force: true }); } catch { /* noop */ }
}

const db = new Database(process.env.DB_PATH);
db.exec(fs.readFileSync(path.resolve('server/schema.sql'), 'utf8'));
const passwordHash = bcrypt.hashSync('Pluri2026!', 12);
const insertUser = db.prepare(
  "INSERT INTO users (email, password_hash, full_name, role, student_ref) VALUES (?, ?, ?, ?, ?)",
);
insertUser.run('sarah@pluriperf.com', passwordHash, 'Sarah Kouassi', 'student', 'PLU-2025-8842');
insertUser.run('admin@pluriperf.com', passwordHash, 'Admin Test', 'admin', null);
const course = db.prepare(
  "INSERT INTO courses (code, title_fr, title_en, ects, semester, program) VALUES (?, ?, ?, ?, ?, ?)",
).run('TEST-101', 'Cours de test', 'Test Course', 6, 'S1', 'Test');
const sarah = db.prepare("SELECT id FROM users WHERE email = 'sarah@pluriperf.com'").get() as { id: number };
db.prepare("INSERT INTO enrollments (user_id, course_id, progress, grade) VALUES (?, ?, ?, ?)").run(
  sarah.id, course.lastInsertRowid, 50, 14,
);
db.close();
