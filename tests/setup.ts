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
db.prepare(
  "INSERT INTO users (email, password_hash, full_name, role, student_ref) VALUES (?, ?, ?, 'student', ?)",
).run('sarah@pluriperf.com', passwordHash, 'Sarah Kouassi', 'PLU-2025-8842');
db.close();
