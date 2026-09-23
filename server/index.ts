import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { config } from './config';
import { notFound, errorHandler } from './middleware';
import authRoutes from './routes/auth';
import applicationRoutes from './routes/applications';
import appointmentRoutes from './routes/appointments';
import contactRoutes from './routes/contact';
import advisoryRoutes from './routes/advisory';
import contentRoutes from './routes/content';
import adminRoutes from './routes/admin';
import studentRoutes from './routes/student';
import teacherRoutes from './routes/teacher';

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));

const apiLimiter = rateLimit({ windowMs: 15 * 60_000, limit: 300, standardHeaders: true });
const authLimiter = rateLimit({ windowMs: 15 * 60_000, limit: 20, standardHeaders: true });

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/applications', apiLimiter, applicationRoutes);
app.use('/api/appointments', apiLimiter, appointmentRoutes);
app.use('/api/contact', apiLimiter, contactRoutes);
app.use('/api/advisory', apiLimiter, advisoryRoutes);
app.use('/api', apiLimiter, contentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', apiLimiter, studentRoutes);
app.use('/api/teacher', apiLimiter, teacherRoutes);

// Fichiers CV téléchargeables uniquement côté serveur (pas d'accès public direct)
app.get('/health', (_req, res) => res.json({ status: 'ok', env: config.env }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', env: config.env }));

app.use('/api', notFound);
app.use(errorHandler);

// En production : servir le build frontend + fallback SPA
if (config.env === 'production') {
  const dist = path.resolve('dist');
  app.use(express.static(dist));
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.listen(config.port, () => {
  console.log(`PLURIPERF API prête sur http://localhost:${config.port} (${config.env})`);
});

export default app;