import { Link } from "react-router";
import { Meta } from "@/components/Meta";
import { PageHero } from "@/components/ui";
import { site } from "@/lib/site";

const sections = [
  {
    h: "Who we are",
    body: <p>This website is operated by {site.name}, a photography and videography studio at {site.address.full}. This page explains what information the website collects and how it is used.</p>,
  },
  {
    h: "Information you give us",
    body: (
      <>
        <p>When you use the inquiry form we collect the details you choose to enter:</p>
        <ul>
          <li>Name and email address (required)</li>
          <li>Project type and your message (required)</li>
          <li>Phone number and event date (optional)</li>
          <li>Your agreement that we may use these details to reply</li>
        </ul>
        <p>If you contact us on Instagram, that conversation is also governed by Instagram’s own terms and privacy policy.</p>
      </>
    ),
  },
  {
    h: "How we use it",
    body: <p>We use your inquiry only to respond to you, discuss your project and, if you decide to go ahead, prepare a proposal or booking. We do not use it for advertising and we do not sell it.</p>,
  },
  {
    h: "Who processes it",
    body: <p>Inquiries are delivered to the studio by email through a transactional email provider (Resend) that transmits the message on our behalf. This website is hosted as a static site with one serverless function that handles the form. We do not otherwise share your details with third parties unless required by law.</p>,
  },
  {
    h: "How long we keep it",
    body: <p>We keep inquiry emails for as long as needed to respond to you and manage any resulting work, and delete them on request unless we are required to retain them. [TODO: studio to confirm a specific retention period.]</p>,
  },
  {
    h: "Cookies, fonts and tracking",
    body: <p>This website sets no cookies and uses no analytics, advertising or other tracking technologies, so no cookie banner is shown. Fonts are served from our own domain rather than a font provider, so your visit does not send your address to one. If we add analytics or marketing tools in future, we will update this page and ask for your consent first.</p>,
  },
  {
    h: "External links",
    body: <p>Links to Instagram and Google Maps lead to services run by other companies with their own privacy practices.</p>,
  },
  {
    h: "Your choices and contact",
    body: (
      <p>
        You can ask us to access, correct or delete the information you sent us. Contact us by{" "}
        <a href={site.instagram.dm} target="_blank" rel="noopener noreferrer">Instagram message</a>
        {site.contact.email && (<> or at <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></>)}
        , or through the <Link to="/contact">contact form</Link>.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <>
      <Meta title="Privacy Policy" description="How STUDIO_X collects, uses and protects the information you send through this website." path="/privacy" />
      <PageHero n="05" label="Legal" title={["Privacy", <span key="a" className="acc">policy.</span>]} intro="Last updated 11 October 2026." />
      <section className="sec-paper pb-20 md:pb-32">
        <div className="container-x">
          <div className="max-w-2xl space-y-12 [&_a]:text-vermilion [&_a]:underline [&_a]:underline-offset-4 [&_li]:mt-2 [&_li]:text-mute [&_p]:mt-4 [&_p]:text-mute [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="display text-3xl">{s.h}</h2>
                {s.body}
              </section>
            ))}
            <p className="!mt-14 border-t border-line pt-6 text-xs">
              This policy describes this website’s current practices and has not been reviewed as legal advice. It does not claim compliance with any specific law; the studio should have it checked before relying on it.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
