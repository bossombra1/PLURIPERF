import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { db } from './db';
import { config } from './config';
import { HttpError } from './middleware';

export type Role = 'student' | 'teacher' | 'advisor' | 'editor' | 'admin' | 'super_admin';

export interface AuthUser {
  id: number;
  email: string;
  full_name: string;
  role: Role;
  student_ref: string | null;
}

const SESSION_COOKIE = 'pluriperf_session';

export function signToken(user: AuthUser): string {
  return jwt.sign({ sub: user.id, role: user.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  } as jwt.SignOptions);
}

export function setAuthCookie(res: Response, token: string) {
  const secure = config.env === 'production' ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800${secure}`,
  );
}

export function clearAuthCookie(res: Response) {
  const secure = config.env === 'production' ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`,
  );
}

function readCookie(req: Request, name: string): string | null {
  const raw = req.headers.cookie;
  if (!raw) return null;
  const entry = raw.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : null;
}

function readToken(req: Request): string | null {
  const cookieToken = readCookie(req, SESSION_COOKIE);
  if (cookieToken) return cookieToken;
  const header = req.headers.authorization;
  return header?.startsWith('Bearer ') ? header.slice(7) : null;
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const token = readToken(req);
  if (!token) return next();
  try {
    const payload = jwt.verify(token, config.jwtSecret) as unknown as { sub: number };
    const user = db
      .prepare('SELECT id, email, full_name, role, student_ref FROM users WHERE id = ? AND is_active = 1')
      .get(payload.sub) as AuthUser | undefined;
    if (user) (req as any).user = user;
  } catch {
    // Une session invalide ne bloque pas les endpoints publics : elle est simplement ignorée.
  }
  next();
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const token = readToken(req);
  if (!token) return next(new HttpError(401, 'Authentification requise'));

  try {
    const payload = jwt.verify(token, config.jwtSecret) as unknown as { sub: number };
    const user = db
      .prepare('SELECT id, email, full_name, role, student_ref FROM users WHERE id = ? AND is_active = 1')
      .get(payload.sub) as AuthUser | undefined;
    if (!user) return next(new HttpError(401, 'Session invalide'));
    (req as any).user = user;
    next();
  } catch {
    next(new HttpError(401, 'Session expirée ou invalide'));
  }
}

export function requireRole(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user as AuthUser | undefined;
    if (!user) return next(new HttpError(401, 'Authentification requise'));
    if (user.role === 'super_admin' || roles.includes(user.role)) return next();
    next(new HttpError(403, 'Accès refusé'));
  };
}
