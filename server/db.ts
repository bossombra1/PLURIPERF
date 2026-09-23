import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';

const DB_PATH = process.env.DB_PATH || './data/pluriperf.db';

fs.mkdirSync(path.dirname(path.resolve(DB_PATH)), { recursive: true });

export const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const schema = fs.readFileSync(path.resolve('server/schema.sql'), 'utf-8');
db.exec(schema);

export default db;