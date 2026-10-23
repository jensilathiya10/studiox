import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { inquiryTypes } from "@/lib/content";
import { validateInquiry, type InquiryErrors, type InquiryInput } from "@/lib/inquiry";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const empty: InquiryInput = { name: "", email: "", phone: "", type: "", date: "", message: "", consent: false };

export function ContactForm({ defaultType = "" }: { defaultType?: string }) {
  const [values, setValues] = useState<InquiryInput>({ ...empty, type: defaultType });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);
  const openedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const set = (k: keyof InquiryInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const v = e.target instanceof HTMLInputElement && e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((cur) => ({ ...cur, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    const found = validateInquiry(values, inquiryTypes);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerError("");
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: ctrl.signal,
        body: JSON.stringify({ ...values, website: honeypot.current?.value ?? "", elapsed: Date.now() - openedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: InquiryErrors };
      if (res.ok && data.ok) {
        setStatus("success");
        setValues({ ...empty });
        return;
      }
      if (data.fields) setErrors(data.fields);
      setServerError(
        res.status === 429
          ? "You’ve sent a few messages in a short time. Please wait a moment and try again."
          : res.status === 503
            ? "Our inquiry form isn’t connected yet, so your message was not sent. Please message us on Instagram instead."
            : data.error || "Something went wrong and your message was not sent. Please try again.",
      );
      setStatus("error");
    } catch (err) {
      setServerError(
        err instanceof DOMException && err.name === "AbortError"
          ? "The request took too long, so your message may not have been sent. Please try again."
          : "We couldn’t reach the server, so your message was not sent. Check your connection and try again.",
      );
      setStatus("error");
    } finally {
      clearTimeout(timer);
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-line p-2 sm:p-4">
        <h3 ref={successRef} tabIndex={-1} className="display text-5xl outline-none sm:text-6xl">
          Thank you. <span className="acc">We’ve got it.</span>
        </h3>
        <p className="mt-5 max-w-md text-mute">Your inquiry has been sent to the studio. We’ll reply to the email address you gave us.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn mt-8">
          Send another inquiry
        </button>
      </div>
    );
  }

  const err = (k: keyof InquiryInput) =>
    errors[k] ? (
      <p id={`e-${k}`} className="mt-2 text-sm err">
        {errors[k]}
      </p>
    ) : null;
  const inv = (k: keyof InquiryInput) => ({ "aria-invalid": errors[k] ? (true as const) : undefined, "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={status === "submitting"} className="space-y-9">
      <div className="grid gap-9 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="mb-1 block text-sm text-mute">Your name <span className="text-vermilion">*</span></label>
          <input id="f-name" name="name" type="text" autoComplete="name" required value={values.name} onChange={set("name")} className="field" {...inv("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="f-email" className="mb-1 block text-sm text-mute">Email <span className="text-vermilion">*</span></label>
          <input id="f-email" name="email" type="email" autoComplete="email" required value={values.email} onChange={set("email")} className="field" {...inv("email")} />
          {err("email")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-type" className="mb-1 block text-sm text-mute">Project type <span className="text-vermilion">*</span></label>
          <select id="f-type" name="type" required value={values.type} onChange={set("type")} className="field" {...inv("type")}>
            <option value="">Select a service</option>
            {inquiryTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {err("type")}
        </div>
        <div>
          <label htmlFor="f-phone" className="mb-1 block text-sm text-mute">Phone <span>(optional)</span></label>
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91" value={values.phone} onChange={set("phone")} className="field" {...inv("phone")} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="f-date" className="mb-1 block text-sm text-mute">Event date <span>(optional)</span></label>
          <input id="f-date" name="date" type="date" value={values.date} onChange={set("date")} className="field" {...inv("date")} />
          {err("date")}
        </div>
      </div>

      <div>
        <label htmlFor="f-message" className="mb-1 block text-sm text-mute">Tell us what you’re imagining <span className="text-vermilion">*</span></label>
        <textarea id="f-message" name="message" rows={5} required value={values.message} onChange={set("message")} className="field resize-y" {...inv("message")} />
        {err("message")}
      </div>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-mute">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={set("consent")}
            className="mt-1 h-5 w-5 shrink-0 accent-[#c8ad7f]"
            {...inv("consent")}
          />
          <span>
            I agree that STUDIO_X may use these details to reply to my inquiry, as described in the{" "}
            <Link to="/privacy" className="link-underline text-fg">privacy policy</Link>. <span className="text-vermilion">*</span>
          </span>
        </label>
        {err("consent")}
      </div>

      {status === "error" && (
        <div role="alert" className="border border-vermilion p-5 text-sm">
          <p>{serverError}</p>
          <a href={site.instagram.dm} target="_blank" rel="noopener noreferrer" className="link-underline mt-3 inline-block text-vermilion">
            Message us on Instagram
          </a>
        </div>
      )}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "submitting"} className="btn btn-solid">
          {status === "submitting" ? "Sending…" : "Send inquiry"}
        </button>
        <p className="text-xs text-mute">
          Fields marked <span className="text-vermilion">*</span> are required.
        </p>
      </div>
    </form>
  );
}
