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
import newsletterRoutes from './routes/newsletter';

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));

const apiLimiter = rateLimit({ windowMs: 15 * 60_000, limit: 300, standardHeaders: true });
const authLimiter = rateLimit({ windowMs: 15 * 60_000, limit: 20, standardHeaders: true });

const mountApi = (prefix: string) => {
  app.use(`${prefix}/auth`, authLimiter, authRoutes);
  app.use(`${prefix}/applications`, apiLimiter, applicationRoutes);
  app.use(`${prefix}/appointments`, apiLimiter, appointmentRoutes);
  app.use(`${prefix}/contact`, apiLimiter, contactRoutes);
  app.use(`${prefix}/newsletter`, apiLimiter, newsletterRoutes);
  app.use(`${prefix}/advisory`, apiLimiter, advisoryRoutes);
  app.use(prefix, apiLimiter, contentRoutes);
  app.use(`${prefix}/admin`, apiLimiter, adminRoutes);
  app.use(`${prefix}/student`, apiLimiter, studentRoutes);
  app.use(`${prefix}/teacher`, apiLimiter, teacherRoutes);
};

mountApi('/api');
mountApi('/api/v1');

app.get('/health', (_req, res) => res.json({ status: 'ok', env: config.env }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', env: config.env }));
app.get('/api/v1/health', (_req, res) => res.json({ status: 'ok', env: config.env }));

app.use('/api', notFound);
app.use(errorHandler);

if (config.env === 'production') {
  const dist = path.resolve('dist');
  app.use(express.static(dist));
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.listen(config.port, () => {
  console.log(`PLURIPERF API prête sur http://localhost:${config.port} (${config.env})`);
});

export default app;
