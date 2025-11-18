"use client";

import siteConfig from "@/data/siteConfig.json";
import { FormEvent, useState } from "react";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || !email || !message) {
      setStatus("Please fill out every field before sending.");
      return;
    }

    try {
      const response = await fetch("/api/contact");
      if (response.ok) {
        setStatus("Thanks for reaching out! I'll respond shortly.");
        event.currentTarget.reset();
      } else {
        setStatus("There was a problem sending your message. Please try again soon.");
      }
    } catch (error) {
      setStatus("Offline? Try emailing me directly.");
    }
  };

  return (
    <section id="contact" className="section bg-slate-50/60 dark:bg-slate-900/30">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading>Contact</SectionHeading>
        <div className="grid gap-10 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="card space-y-5">
            <div>
              <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-indigoBrand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
            >
              Send Message
            </button>
            {status && <p className="text-sm text-slate-500 dark:text-slate-400">{status}</p>}
          </form>
          <div className="card space-y-5">
            <p className="text-base text-slate-600 dark:text-slate-300">
              Prefer email, or want to move fast? Reach me on any of the channels below. I respond within 24h for urgent builds.
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={siteConfig.links.linkedin} className="font-semibold text-indigoBrand">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={siteConfig.links.github} className="font-semibold text-indigoBrand">
                  GitHub
                </a>
              </li>
              <li>
                <a href={siteConfig.links.email} className="font-semibold text-indigoBrand">
                  Email
                </a>
              </li>
              {siteConfig.links.whatsapp && (
                <li>
                  <a href={siteConfig.links.whatsapp} className="font-semibold text-indigoBrand">
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
