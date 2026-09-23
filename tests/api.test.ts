import { describe, it, expect } from 'vitest';
import crypto from 'crypto';
import request from 'supertest';
import express from 'express';
import authRoutes from '../server/routes/auth';
import contactRoutes from '../server/routes/contact';
import advisoryRoutes from '../server/routes/advisory';
import applicationRoutes from '../server/routes/applications';
import appointmentRoutes from '../server/routes/appointments';
import teacherRoutes from '../server/routes/teacher';
import { db } from '../server/db';
import adminRoutes from '../server/routes/admin';
import studentRoutes from '../server/routes/student';
import { errorHandler, notFound } from '../server/middleware';

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/auth', authRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/advisory', advisoryRoutes);
  app.use('/api/applications', applicationRoutes);
  app.use('/api/appointments', appointmentRoutes);
  app.use('/api/teacher', teacherRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/student', studentRoutes);
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
    expect(res.headers['set-cookie']).toBeTruthy();
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
    expect(res.headers['set-cookie']).toBeTruthy();
    expect(res.body.user.studentRef).toBe('PLU-2025-8842');
  });

  it('connecte par matricule', async () => {
    const res = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: undefined, password: 'Pluri2026!', studentRef: 'PLU-2025-8842' });
    expect(res.status).toBe(200);
    expect(res.headers['set-cookie']).toBeTruthy();
  });

  it('expose /me avec le cookie HttpOnly', async () => {
    const login = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'sarah@pluriperf.com', password: 'Pluri2026!' });
    const res = await request(buildApp())
      .get('/api/auth/me')
      .set('Cookie', login.headers['set-cookie'][0]);
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe('sarah@pluriperf.com');
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

describe('Permissions et espaces protégés', () => {
  it('refuse l espace étudiant sans session', async () => {
    const res = await request(buildApp()).get('/api/student/dashboard');
    expect(res.status).toBe(401);
  });

  it('autorise l administrateur à consulter les utilisateurs', async () => {
    const login = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'admin@pluriperf.com', password: 'Pluri2026!' });
    const res = await request(buildApp())
      .get('/api/admin/users')
      .set('Cookie', login.headers['set-cookie'][0]);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  it('autorise l étudiant à consulter son propre dashboard', async () => {
    const login = await request(buildApp())
      .post('/api/auth/login')
      .send({ email: 'sarah@pluriperf.com', password: 'Pluri2026!' });
    const res = await request(buildApp())
      .get('/api/student/dashboard')
      .set('Cookie', login.headers['set-cookie'][0]);
    expect(res.status).toBe(200);
    expect(res.body.student.studentRef).toBe('PLU-2025-8842');
  });
});


describe('Candidatures et CV', () => {
  it('accepte un CV PDF valide et le téléchargement reste protégé', async () => {
    const app = buildApp();
    const pdf = Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\n%%EOF');
    const create = await request(app)
      .post('/api/applications')
      .field('program', 'Master Management Durable')
      .field('level', 'Master')
      .field('fullName', 'Candidat Test')
      .field('email', 'sarah@pluriperf.com')
      .field('phone', '+2250700000000')
      .field('country', 'Côte d’Ivoire')
      .field('currentDiploma', 'Licence')
      .attach('cv', pdf, { filename: 'cv.pdf', contentType: 'application/pdf' });
    expect(create.status).toBe(201);
    const unauthorized = await request(app).get(`/api/applications/${create.body.id}/cv`);
    expect(unauthorized.status).toBe(401);
    const login = await request(app).post('/api/auth/login').send({ email: 'sarah@pluriperf.com', password: 'Pluri2026!' });
    const download = await request(app).get(`/api/applications/${create.body.id}/cv`).set('Cookie', login.headers['set-cookie'][0]);
    expect(download.status).toBe(200);
    expect(download.headers['content-type']).toMatch(/application\/pdf/);
  });
});

describe('Rendez-vous', () => {
  const futureDate = '2099-12-15';

  it('expose les disponibilités et refuse une double réservation', async () => {
    const app = buildApp();
    const available = await request(app).get(`/api/appointments/availability?date=${futureDate}`);
    expect(available.status).toBe(200);
    expect(available.body).toContain('09:00');
    const payload = { date: futureDate, timeSlot: '09:00', reason: 'orientation', fullName: 'Sarah Kouassi', email: 'sarah@pluriperf.com', phone: '+2250700000000' };
    const first = await request(app).post('/api/appointments').send(payload);
    expect(first.status).toBe(201);
    const second = await request(app).post('/api/appointments').send(payload);
    expect(second.status).toBe(409);
  });

  it('permet au propriétaire d’annuler son rendez-vous', async () => {
    const app = buildApp();
    const payload = { date: '2099-12-16', timeSlot: '11:00', reason: 'admissions', fullName: 'Sarah Kouassi', email: 'sarah@pluriperf.com', phone: '+2250700000000' };
    const created = await request(app).post('/api/appointments').send(payload);
    expect(created.status).toBe(201);
    const login = await request(app).post('/api/auth/login').send({ email: 'sarah@pluriperf.com', password: 'Pluri2026!' });
    const cancelled = await request(app).patch(`/api/appointments/${created.body.id}`).set('Cookie', login.headers['set-cookie'][0]).send({ status: 'cancelled' });
    expect(cancelled.status).toBe(200);
  });
});

describe('Permissions enseignant', () => {
  it('limite les cours à ceux attribués à l’enseignant', async () => {
    const app = buildApp();
    const login = await request(app).post('/api/auth/login').send({ email: 'teacher@pluriperf.com', password: 'Pluri2026!' });
    const courses = await request(app).get('/api/teacher/courses').set('Cookie', login.headers['set-cookie'][0]);
    expect(courses.status).toBe(200);
    expect(courses.body).toHaveLength(1);
    expect(courses.body[0].code).toBe('TEST-101');
    const forbidden = await request(app).post('/api/teacher/assignments').set('Cookie', login.headers['set-cookie'][0]).send({
      courseId: 999999, titleFr: 'Devoir interdit', titleEn: 'Forbidden assignment', dueDate: '2099-12-20',
    });
    expect(forbidden.status).toBe(403);
  });
});

describe('Vérification e-mail', () => {
  it('valide un jeton de vérification et le rend inutilisable une seconde fois', async () => {
    const rawToken = 'verification-token-for-tests-123456';
    const hash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const user = db.prepare("SELECT id FROM users WHERE email = 'sarah@pluriperf.com'").get() as { id: number };
    db.prepare("INSERT INTO email_verifications (user_id, token_hash, expires_at) VALUES (?, ?, datetime('now', '+1 day'))").run(user.id, hash);
    const first = await request(buildApp()).get(`/api/auth/verify-email?token=${rawToken}`);
    expect(first.status).toBe(200);
    expect(first.body.verified).toBe(true);
    const second = await request(buildApp()).get(`/api/auth/verify-email?token=${rawToken}`);
    expect(second.status).toBe(400);
  });
});
