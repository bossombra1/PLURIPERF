import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { zodParse } from '../validate';
import { db } from '../db';
import { asyncHandler } from '../middleware';

const router = Router();

const schema = z.object({ email: z.string().email().max(255) });

router.post('/subscribe', zodParse(schema), asyncHandler(async (req: Request, res: Response) => {
  const email = (req.body as z.infer<typeof schema>).email.toLowerCase();
  db.prepare(
    "INSERT INTO newsletter_subscribers (email) VALUES (?) ON CONFLICT(email) DO UPDATE SET active = 1",
  ).run(email);
  res.status(201).json({ subscribed: true, message: 'Inscription confirmée.' });
}));

export default router;
