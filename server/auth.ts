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

export function signToken(user: AuthUser): string {
  return jwt.sign({ sub: user.id, role: user.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  } as jwt.SignOptions);
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next(new HttpError(401, 'Authentification requise'));
  }
  try {
    const payload = jwt.verify(header.slice(7), config.jwtSecret) as unknown as { sub: number };
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