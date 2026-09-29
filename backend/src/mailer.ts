import nodemailer from 'nodemailer';
import { config } from './config';

const transporter = config.smtp.host
  ? nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
    })
  : null;

export async function sendMail(to: string, subject: string, text: string, html?: string) {
  if (!transporter) {
    console.log(`[mail:dev] to=${to} subject="${subject}"\n${text}`);
    return;
  }
  await transporter.sendMail({ from: config.smtp.from, to, subject, text, html: html ?? text });
}

export async function notifyStaff(subject: string, text: string) {
  await sendMail(config.smtp.contactTo, subject, text);
}