import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { z } from 'zod';
import { zodParse } from '../validate';
import { db } from '../db';
import { asyncHandler } from '../middleware';
import { notifyStaff } from '../mailer';

const router = Router();

const quoteSchema = z.object({
  service: z.string().min(1).max(120),
  company: z.string().min(2).max(160),
  contactName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  employees: z.string().max(40).optional().default(''),
  message: z.string().max(5000).optional().default(''),
});

router.post(
  '/',
  zodParse(quoteSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const data = req.body as z.infer<typeof quoteSchema>;
    const reference = `AUDIT-${crypto.randomInt(1000, 10000)}`;
    db.prepare(
      `INSERT INTO advisory_requests (reference, service, company, contact_name, email, phone, employees, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      reference,
      data.service,
      data.company,
      data.contactName,
      data.email.toLowerCase(),
      data.phone,
      data.employees,
      data.message,
    );
    await notifyStaff(
      `Demande d'accompagnement ${reference}`,
      `${data.company} (${data.contactName}, ${data.email}) — service : ${data.service}.`,
    );
    res.status(201).json({ reference });
  }),
);

export default router;