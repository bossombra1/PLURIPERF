import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { zodParse } from '../validate';
import { db } from '../db';
import { asyncHandler } from '../middleware';
import { notifyStaff } from '../mailer';

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
  campus: z.enum(['paris', 'abidjan', 'geneva']).default('paris'),
});

router.post(
  '/',
  zodParse(contactSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const data = req.body as z.infer<typeof contactSchema>;
    const info = db
      .prepare('INSERT INTO contact_messages (name, email, subject, message, campus) VALUES (?, ?, ?, ?, ?)')
      .run(data.name, data.email.toLowerCase(), data.subject, data.message, data.campus);
    await notifyStaff(
      `Message de contact : ${data.subject}`,
      `${data.name} (${data.email}, campus ${data.campus}) écrit :\n\n${data.message}`,
    );
    res.status(201).json({ id: info.lastInsertRowid, message: 'Message reçu. Réponse sous 24h ouvrées.' });
  }),
);

const newsletterSchema = z.object({ email: z.string().email().max(255) });

router.post(
  '/newsletter/subscribe',
  zodParse(newsletterSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const email = (req.body as z.infer<typeof newsletterSchema>).email.toLowerCase();
    db.prepare(
      "INSERT INTO newsletter_subscribers (email) VALUES (?) ON CONFLICT(email) DO UPDATE SET active = 1",
    ).run(email);
    res.status(201).json({ subscribed: true, message: 'Inscription confirmée.' });
  }),
);

export default router;