/**
 * Email dispatch abstraction for re-engagement sends.
 *
 * Uses SMTP (nodemailer) when SMTP_* env is present; otherwise falls back to a
 * console log so the scheduler is fully exercisable in dev without a provider.
 * Swap `sendEmail` for Resend/SES/Postmark by editing only this file.
 */
import { ENV } from "./env";

export interface OutboundEmail {
  to: string;
  subject: string;
  html: string;
  /** Provider tags for campaign tracking. */
  tags?: string[];
}

export interface SendResult {
  ok: boolean;
  messageId?: string;
  error?: string;
}

let _transport: any = null;
let _transportUnavailable = false;

/** Lazily build (and reuse) a single pooled SMTP transport for the process. */
async function getTransport(): Promise<any | null> {
  if (_transportUnavailable) return null;
  if (_transport) return _transport;
  const modName = "nodemailer";
  const nodemailer = (await import(modName).catch(() => null)) as any;
  if (!nodemailer) {
    _transportUnavailable = true;
    return null;
  }
  _transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
  });
  return _transport;
}

export async function sendEmail(msg: OutboundEmail): Promise<SendResult> {
  if (!process.env.SMTP_HOST) {
    // Dev / no-provider fallback.
    console.info(`[Mail:dev] -> ${msg.to} | ${msg.subject} (${msg.html.length} bytes)`);
    return { ok: true, messageId: `dev_${Date.now()}` };
  }

  try {
    const transport = await getTransport();
    if (!transport) {
      console.warn("[Mail] SMTP configured but nodemailer not installed; logging only.");
      return { ok: true, messageId: `dev_${Date.now()}` };
    }
    const info = await transport.sendMail({
      from: process.env.SMTP_FROM ?? "Blacklisted Studio <no-reply@blacklisted.studio>",
      to: msg.to,
      subject: msg.subject,
      html: msg.html,
    });
    return { ok: true, messageId: info.messageId };
  } catch (error) {
    // Reset the cached transport so a transient failure doesn't poison future sends.
    _transport = null;
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}



