import 'dotenv/config';

export const config = {
  port: Number(process.env.PORT || 4000),
  env: process.env.NODE_ENV || 'development',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  corsOrigin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
  jwtSecret: process.env.JWT_SECRET || 'dev-only-insecure-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  passwordResetTtlMinutes: Number(process.env.PASSWORD_RESET_TTL_MINUTES || 60),
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  maxFileSizeMb: Number(process.env.MAX_FILE_SIZE_MB || 10),
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    secure: process.env.SMTP_SECURE === 'true',
    from: process.env.MAIL_FROM || 'PLURIPERF <no-reply@pluriperf.com>',
    contactTo: process.env.MAIL_CONTACT_TO || 'contact@pluriperf.com',
  },
};

if (config.env === 'production' && config.jwtSecret === 'dev-only-insecure-secret-change-me') {
  throw new Error('JWT_SECRET must be set in production');
}