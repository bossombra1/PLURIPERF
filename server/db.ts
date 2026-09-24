import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';

const isVercelRuntime = process.env.VERCEL === '1';
const DB_PATH = process.env.DB_PATH || './data/pluriperf.db';

fs.mkdirSync(path.dirname(path.resolve(DB_PATH)), { recursive: true });

export const db = new Database(DB_PATH, { readonly: isVercelRuntime });
if (!isVercelRuntime) db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

if (!isVercelRuntime) {
  const schema = fs.readFileSync(path.resolve('server/schema.sql'), 'utf-8');
  db.exec(schema);
}

// Migrations additives nécessaires aux bases SQLite déjà existantes.
if (!isVercelRuntime) {
  const appointmentColumns = db.prepare('PRAGMA table_info(appointments)').all() as { name: string }[];
  if (!appointmentColumns.some((column) => column.name === 'timezone')) {
    db.exec("ALTER TABLE appointments ADD COLUMN timezone TEXT NOT NULL DEFAULT 'Africa/Abidjan'");
  }
}

export default db;