import { Request, Response, NextFunction } from 'express';

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({ error: 'NOT_FOUND', message: `Route introuvable: ${req.method} ${req.path}` });
};

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: 'HTTP_ERROR', message: err.message });
  }
  // Zod validation errors
  if (typeof err === 'object' && err !== null && 'issues' in err && Array.isArray((err as any).issues)) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Données invalides',
      details: (err as any).issues.map((i: any) => ({ path: i.path.join('.'), message: i.message })),
    });
  }
  console.error(err);
  return res.status(500).json({ error: 'INTERNAL_ERROR', message: 'Erreur interne du serveur' });
};

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };