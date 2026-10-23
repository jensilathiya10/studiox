import { inquiryTypes } from "../src/lib/content";
import { validateInquiry, type InquiryInput } from "../src/lib/inquiry";

/**
 * POST /api/contact  (Vercel Function, Web-standard handler)
 *
 * Validates the inquiry, applies spam protection, and sends it with Resend's
 * HTTP API. Required environment variables (server-side only, never VITE_*):
 *
 *   RESEND_API_KEY        https://resend.com
 *   CONTACT_TO_EMAIL      studio inbox (comma separate for several)
 *   CONTACT_FROM_EMAIL    verified sender, e.g. "STUDIO_X <hello@your-domain.com>"
 *
 * Missing config returns 503 so the form shows an honest "not connected"
 * message. It never pretends a message was sent. Swap `deliver()` to change provider.
 */
const MAX_BODY = 12_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

/** Best-effort per-instance limiter. Add a shared store or WAF rule for stricter limits. */
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return false;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

async function deliver(i: InquiryInput) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) return "not_configured" as const;

  const text = [
    `Name: ${oneLine(i.name)}`,
    `Email: ${oneLine(i.email)}`,
    `Phone: ${oneLine(i.phone) || "-"}`,
    `Interested in: ${i.type}`,
    `Date: ${i.date || "-"}`,
    "",
    i.message.trim(),
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: oneLine(i.email),
      subject: `New inquiry: ${i.type} (${oneLine(i.name).slice(0, 60)})`,
      text,
    }),
    signal: AbortSignal.timeout(12000),
  });
  return res.ok ? ("sent" as const) : ("failed" as const);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return json({ ok: false, error: "Too many requests." }, 429);

  const raw = await req.text();
  if (raw.length > MAX_BODY) return json({ ok: false, error: "Message is too large." }, 413);

  let b: Record<string, unknown>;
  try {
    b = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const str = (k: string) => (typeof b[k] === "string" ? (b[k] as string) : "");
  const input: InquiryInput = {
    name: str("name"),
    email: str("email"),
    phone: str("phone"),
    type: str("type"),
    date: str("date"),
    message: str("message"),
    consent: b.consent === true,
  };

  // Spam traps: filled honeypot or an implausibly fast submit. Silently dropped.
  const elapsed = typeof b.elapsed === "number" ? b.elapsed : 0;
  if (str("website") || elapsed < 1500) return json({ ok: true });

  const fields = validateInquiry(input, inquiryTypes);
  if (Object.keys(fields).length) return json({ ok: false, error: "Please check the highlighted fields.", fields }, 422);

  try {
    const result = await deliver(input);
    if (result === "not_configured") {
      console.error("[contact] Email delivery is not configured (RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL).");
      return json({ ok: false, error: "not_configured" }, 503);
    }
    if (result === "failed") {
      console.error("[contact] Email provider rejected the message.");
      return json({ ok: false, error: "We couldn’t send your message right now. Please try again shortly." }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error("[contact] Delivery error:", err instanceof Error ? err.message : err);
    return json({ ok: false, error: "We couldn’t send your message right now. Please try again shortly." }, 502);
  }
}
