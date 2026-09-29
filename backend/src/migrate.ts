import fs from 'node:fs/promises';
import path from 'node:path';
import { pool } from './db.js';

const schemaPath = path.resolve(process.cwd(), 'database/schema.sql');
const schema = await fs.readFile(schemaPath, 'utf8');
await pool.query(schema);
await pool.end();
console.log('Schéma PostgreSQL initialisé.');
