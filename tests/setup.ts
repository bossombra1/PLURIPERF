import fs from 'fs';

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-for-vitest-0123456789abcdef';
process.env.DB_PATH = './data/test.db';

for (const p of ['./data/test.db', './data/test.db-wal', './data/test.db-shm']) {
  try { fs.rmSync(p, { force: true }); } catch { /* noop */ }
}
