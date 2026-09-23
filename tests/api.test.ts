import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import fs from 'fs';
import authRoutes from '../server/routes/auth';
import contactRoutes from '../server/routes/contact';
import advisoryRoutes from '../server/routes/advisory';
import { errorHandler, notFound } from '../server/middleware';

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-for-vitest-0123456789abcdef';
const dbPath = './data/test.db';
process.env.DB_PATH = dbPath;
// Base de test isolée : on repart d'une base vierge (seed + migrations au démarrage de la route)
for (const p of [dbPath, `${dbPath}-wal`, `${dbPath}-shm`]) {
  try { fs.rmSync(p, { force: true }); } catch { /* noop */ }
}

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/auth', authRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/advisory', advisoryRoutes);
  app.use('/api', notFound);
  app.use(errorHandler);
  return app;
}

let createdEmail = '';

describe('POST /api/auth/register', () => {
  it('crée un compte et renvoie un token', async () => {
    createdEmail = `test-${Date.now()}@example.com`;
    const res = await request(buildApp())
      .post('/api/auth/register')
      .send({ email: createdEmail, password: 'Password123!', fullName: 'Test User' });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeTruthy();
    expect(res.body.user.role).toBe('student');
    expect(res.body.user.studentRef).toMatch(/^PLU-\d{4}-\d{4}$/);
  });

  it('refuse un mot de passe trop court (validation backend)', async () => {
    const res = await request(buildApp())
      .post('/api/auth/register')
      .send({ email: `x-${Date.now()}@example.com`, password: 'court', fullName: 'X' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('VALIDATION_ERROR');
  });

  it('refuse un email déjà utilisé (409)', async () => {
    const res = await request(buildApp())
      .post('/api/auth/register')
      .send({ email: createdEmail, password: 'Password123!', fullName: 'Dup' });
    expect(res.status).toBe(409);
  });
});

describe('POST /api/auth/login', () => {
  it('connecte un utilisateur seedé', async () => {
    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'sarah@pluriperf.com', password: 'Pluri2026!' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
    expect(res.body.user.studentRef).toBe('PLU-2025-8842');
  });

  it('connecte par matricule', async () => {
    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: undefined, password: 'Pluri2026!', studentRef: 'PLU-2025-8842' });
    expect(res.status).toBe(200);
  });

  it('rejette un mauvais mot de passe (401)', async () => {
    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'sarah@pluriperf.com', password: 'wrong' });
    expect(res.status).toBe(401);
  });
});

describe('POST /api/contact', () => {
  it('persiste un message de contact', async () => {
    const res = await request(buildApp())
      .post('/api/contact')
      .send({ name: 'Jean Test', email: 'jean@test.com', subject: 'Sujet', message: 'Message de test suffisamment long.' });
    expect(res.status).toBe(201);
  });

  it('rejette un message trop court (validation)', async () => {
    const res = await request(buildApp())
      .post('/api/contact')
      .send({ name: 'J', email: 'pas-un-email', subject: 'S', message: 'court' });
    expect(res.status).toBe(400);
  });
});

describe('POST /api/advisory', () => {
  it('retourne une référence AUDIT-####', async () => {
    const res = await request(buildApp())
      .post('/api/advisory')
      .send({
        service: 'Audit Carbone',
        company: 'ACME',
        contactName: 'John Doe',
        email: 'john@acme.com',
        phone: '+33612345678',
      });
    expect(res.status).toBe(201);
    expect(res.body.reference).toMatch(/^AUDIT-\d{4}$/);
  });
});

describe('Gestion uniforme des erreurs', () => {
  it('renvoie 404 JSON pour une route inconnue', async () => {
    const res = await request(buildApp()).get('/api/inconnu');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('NOT_FOUND');
  });
});