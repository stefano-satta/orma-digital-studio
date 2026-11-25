/**
 * Riceve il modulo contatti e lo inoltra al Google Sheet (Apps Script).
 * URL e segreto restano sul server: il browser parla solo con /api/contact.
 *
 * Variabili d'ambiente (server, senza NEXT_PUBLIC_):
 *   GOOGLE_SHEETS_WEBHOOK_URL  URL /exec dell'app web Apps Script
 *   GOOGLE_SHEETS_SECRET       stessa stringa di SHARED_SECRET nello script
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_FIELD_LENGTH = 300;
const MAX_MESSAGE_LENGTH = 5000;
const UPSTREAM_TIMEOUT_MS = 15_000;

const TEXT_FIELDS = ["name", "email", "property", "location", "propertyType", "services", "budget", "message"] as const;
type TextField = (typeof TEXT_FIELDS)[number];
type ContactSubmission = Record<TextField, string>;

function readSubmission(body: unknown): ContactSubmission | null {
  if (typeof body !== "object" || body === null) return null;
  const source = body as Record<string, unknown>;
  const submission = {} as ContactSubmission;
  for (const field of TEXT_FIELDS) {
    const value = source[field] ?? "";
    if (typeof value !== "string") return null;
    const maxLength = field === "message" ? MAX_MESSAGE_LENGTH : MAX_FIELD_LENGTH;
    submission[field] = value.trim().slice(0, maxLength);
  }
  const isValid =
    submission.name.length >= 2 &&
    EMAIL_PATTERN.test(submission.email) &&
    submission.property !== "" &&
    submission.location !== "" &&
    submission.propertyType !== "" &&
    submission.services !== "" &&
    submission.message.length >= 20 &&
    source.privacyAccepted === true;
  return isValid ? submission : null;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_SECRET;
  if (!webhookUrl || !secret) {
    return Response.json({ ok: false, error: "unconfigured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot compilato: rispondiamo "ok" senza salvare, così il bot non impara nulla.
  const honeypot = (body as Record<string, unknown> | null)?.website;
  if (typeof honeypot === "string" && honeypot !== "") {
    return Response.json({ ok: true });
  }

  const submission = readSubmission(body);
  if (!submission) {
    return Response.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }

  try {
    // Apps Script risponde con un redirect verso googleusercontent.com: fetch lo segue da solo.
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...submission, secret }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      cache: "no-store",
    });
    const result = (await upstream.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!upstream.ok || !result?.ok) {
      console.error("Google Sheets ha rifiutato la richiesta", upstream.status, result?.error);
      return Response.json({ ok: false, error: "upstream_error" }, { status: 502 });
    }
  } catch (error) {
    console.error("Google Sheets non raggiungibile", error);
    return Response.json({ ok: false, error: "upstream_unreachable" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
