/** Shared by the contact form (browser) and api/contact.ts (server). */
export type InquiryInput = {
  name: string;
  email: string;
  phone: string;
  type: string;
  date: string;
  message: string;
  consent: boolean;
};

export type InquiryErrors = Partial<Record<keyof InquiryInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d][\d\s().-]{6,19}$/;

export function validateInquiry(v: InquiryInput, validTypes: string[]): InquiryErrors {
  const e: InquiryErrors = {};
  const name = v.name.trim();
  if (name.length < 2) e.name = "Please tell us your name.";
  else if (name.length > 100) e.name = "That name is a little long, please shorten it.";

  if (!v.email.trim()) e.email = "We need an email address to reply to you.";
  else if (!EMAIL.test(v.email.trim()) || v.email.length > 200) e.email = "That email doesn’t look right. Check it and try again.";

  if (v.phone.trim() && !PHONE.test(v.phone.trim())) e.phone = "Use digits, spaces, + or - only (7 to 20 characters).";

  if (!v.type) e.type = "Choose what you’d like to create with us.";
  else if (!validTypes.includes(v.type)) e.type = "Please pick one of the listed options.";

  if (v.date && !/^\d{4}-\d{2}-\d{2}$/.test(v.date)) e.date = "Use a valid date.";

  const msg = v.message.trim();
  if (msg.length < 10) e.message = "A few more words please, at least 10 characters.";
  else if (msg.length > 4000) e.message = "Please keep your message under 4000 characters.";

  if (!v.consent) e.consent = "Please tick the box so we know you’re happy for us to use your details to reply.";
  return e;
}
