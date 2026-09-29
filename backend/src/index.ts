import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config.js';
import { notFound, errorHandler } from './middleware.js';
import authRoutes from './routes/auth.js';
import applicationRoutes from './routes/applications.js';
import appointmentRoutes from './routes/appointments.js';
import contactRoutes from './routes/contact.js';
import advisoryRoutes from './routes/advisory.js';
import contentRoutes from './routes/content.js';
import adminRoutes from './routes/admin.js';
import studentRoutes from './routes/student.js';
import teacherRoutes from './routes/teacher.js';
import newsletterRoutes from './routes/newsletter.js';

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));

const apiLimiter = rateLimit({ windowMs: 15 * 60_000, limit: 300, standardHeaders: true });

const mountApi = (prefix: string) => {
  app.use(prefix + '/auth', authRoutes);
  app.use(prefix + '/applications', apiLimiter, applicationRoutes);
  app.use(prefix + '/appointments', apiLimiter, appointmentRoutes);
  app.use(prefix + '/contact', apiLimiter, contactRoutes);
  app.use(prefix + '/newsletter', apiLimiter, newsletterRoutes);
  app.use(prefix + '/advisory', apiLimiter, advisoryRoutes);
  app.use(prefix, apiLimiter, contentRoutes);
  app.use(prefix + '/admin', apiLimiter, adminRoutes);
  app.use(prefix + '/student', apiLimiter, studentRoutes);
  app.use(prefix + '/teacher', apiLimiter, teacherRoutes);
};

mountApi('/api');
mountApi('/api/v1');

app.get('/health', (_req, res) => res.json({ status: 'ok', env: config.env }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', env: config.env }));
app.get('/api/v1/health', (_req, res) => res.json({ status: 'ok', env: config.env }));

app.use('/api', notFound);
app.use(errorHandler);

if (config.env === 'production') {
  const staticDir = process.env.VERCEL ? path.resolve('public') : path.resolve('dist');
  app.use(express.static(staticDir));
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(staticDir, 'index.html')));
}

if (!process.env.VERCEL && config.env !== 'test') {
  app.listen(config.port, () => console.log('PLURIPERF API prête sur http://localhost:' + config.port + ' (' + config.env + ')'));
}

export default app;
