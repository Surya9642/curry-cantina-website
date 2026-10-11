
import { useState, type FormEvent } from "react";
import { z } from "zod";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "../components/ui/button";
import {
  Eyebrow,
  Ornament,
  OrderButton,
} from "../components/restaurant";

const contactInfo = {
  phone: "+1 (848) 233-9105",
  phoneLink: "+18482339105",
  email: "currycantina1@gmail.com",
  address:
    "520 NJ-33, Millstone Township, NJ 08535, United States",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=520+NJ-33%2C+Millstone+Township%2C+NJ+08535%2C+United+States",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3044.6455722545766!2d-74.41276022375007!3d40.26140747146503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3d98b96830483%3A0xbef327bd178b836a!2sCurry%20Cantina!5e0!3m2!1sen!2sin!4v1791692776868!5m2!1sen!2sin",
};

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(255),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine(
      (value) => !value || /^[+\d\s().-]{6,30}$/.test(value),
      "Please enter a valid phone number.",
    ),
  message: z
    .string()
    .trim()
    .min(1, "Please enter your message.")
    .max(2000),
});

const openingHours = [
  { day: "Monday – Thursday", time: "To be confirmed" },
  { day: "Friday – Saturday", time: "To be confirmed" },
  { day: "Sunday", time: "To be confirmed" },
];

export default function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const result = schema.safeParse(
      Object.fromEntries(new FormData(form)),
    );

    if (!result.success) {
      setErrors(
        Object.fromEntries(
          result.error.issues.map((issue) => [
            String(issue.path[0]),
            issue.message,
          ]),
        ),
      );
      setStatus("Please check the highlighted fields.");
      return;
    }

    setErrors({});
    setStatus(
      "Your details are valid, but online enquiries are not connected yet. Please contact us by phone or email.",
    );
  }

  const fields = [
    {
      name: "name",
      label: "Your name",
      type: "text",
      max: 100,
      autoComplete: "name",
    },
    {
      name: "email",
      label: "Email address",
      type: "email",
      max: 255,
      autoComplete: "email",
    },
    {
      name: "phone",
      label: "Phone number (optional)",
      type: "tel",
      max: 30,
      autoComplete: "tel",
    },
  ] as const;

  return (
    <main className="inner-page">
      <section className="page-intro container">
        <Eyebrow>GOOD CONVERSATIONS START HERE</Eyebrow>

        <h1>
          Let’s <em>Connect.</em>
        </h1>

        <Ornament />

        <p>Your next memorable evening starts at the cantina.</p>
      </section>

      <section className="container grid grid-cols-1 gap-12 py-12 md:grid-cols-2 md:gap-16">
        {/* Contact information */}
        <div className="min-w-0">
          <Eyebrow>FIND YOUR CANTINA</Eyebrow>

          <h2 className="mt-4">
            We’d love to
            <br />
            <em>hear from you.</em>
          </h2>

          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
              <MapPin
                size={22}
                className="mt-1 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <h3>Visit us</h3>
                <a
                  href={contactInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block break-words text-muted-foreground transition-colors hover:text-primary"
                >
                  {contactInfo.address}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone
                size={22}
                className="mt-1 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div>
                <h3>Call us</h3>
                <a
                  href={`tel:${contactInfo.phoneLink}`}
                  className="mt-1 block text-muted-foreground transition-colors hover:text-primary"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail
                size={22}
                className="mt-1 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <h3>Write to us</h3>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="mt-1 block break-all text-muted-foreground transition-colors hover:text-primary"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock
                size={22}
                className="mt-1 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <h3>Opening hours</h3>

                <div className="mt-3 space-y-3">
                  {openingHours.map(({ day, time }) => (
                    <div
                      key={day}
                      className="flex items-start justify-between gap-4 text-sm"
                    >
                      <span>{day}</span>
                      <span className="text-right text-muted-foreground">
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Instagram and Facebook icons */}
          <div className="mt-8 flex items-center gap-3">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                width="21"
                height="21"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="0.8"
                  fill="currentColor"
                />
              </svg>
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                width="21"
                height="21"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" />
              </svg>
            </a>
          </div>

          <div className="mt-6">
            <OrderButton />
          </div>
        </div>

        {/* Enquiry form */}
        <form
          className="enquiry-form min-w-0"
          onSubmit={submit}
          noValidate
        >
          <Eyebrow>MAKE AN ENQUIRY</Eyebrow>

          <h3 className="mt-3">A note to the cantina</h3>

          <p className="sample-note mt-3">
            For immediate assistance, please call or email us directly.
            Online enquiries are not connected yet.
          </p>

          {fields.map((field) => (
            <div className="form-field mt-5" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>

              <input
                id={field.name}
                name={field.name}
                type={field.type}
                maxLength={field.max}
                autoComplete={field.autoComplete}
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={
                  errors[field.name]
                    ? `${field.name}-error`
                    : undefined
                }
              />

              {errors[field.name] && (
                <span
                  className="field-error"
                  id={`${field.name}-error`}
                >
                  {errors[field.name]}
                </span>
              )}
            </div>
          ))}

          <div className="form-field mt-5">
            <label htmlFor="message">Your message</label>

            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={2000}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? "message-error" : undefined
              }
            />

            {errors.message && (
              <span id="message-error" className="field-error">
                {errors.message}
              </span>
            )}
          </div>

          <div className="mt-6">
            <Button className="gold-button" type="submit">
              Send Enquiry
              <ArrowUpRight size={18} />
            </Button>
          </div>

          {status && (
            <p role="alert" className="form-status mt-4">
              {status}
            </p>
          )}
        </form>
      </section>

      {/* Compact Google Maps embed */}
      <section className="container pb-12">
        <div className="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Eyebrow>FIND US</Eyebrow>
            <h2 className="mt-2">Visit the Cantina</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {contactInfo.address}
            </p>
          </div>

          <Button asChild variant="outline">
            <a
              href={contactInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
              <ArrowUpRight size={18} />
            </a>
          </Button>
        </div>

        <iframe
          title="Curry Cantina location on Google Maps"
          src={contactInfo.mapsEmbedUrl}
          width="100%"
          height="280"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full overflow-hidden rounded-lg border border-border"
        />
      </section>
    </main>
  );
}
