import siteConfig from "@/data/siteConfig.json";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "./Icons";

const email = siteConfig.links.email.replace("mailto:", "");

const channels = [
  { href: siteConfig.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: siteConfig.links.github, label: "GitHub", Icon: GitHubIcon },
  ...(siteConfig.links.whatsapp
    ? [{ href: siteConfig.links.whatsapp, label: "WhatsApp", Icon: PhoneIcon }]
    : [])
];

export function Contact() {
  return (
    <section id="contact" className="section border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Hiring for a full-stack role, or need a web app or dashboard built? Email is the fastest way to reach me.
            I respond within 24h for urgent builds.
          </p>
          <a
            href={siteConfig.links.email}
            className="inline-flex items-center gap-2 break-all text-xl font-semibold text-slate-900 underline decoration-slate-300 underline-offset-8 transition-colors hover:decoration-indigoBrand dark:text-white dark:decoration-slate-600 md:text-2xl"
          >
            <MailIcon className="h-6 w-6 shrink-0 text-indigoBrand dark:text-indigo-300" />
            {email}
          </a>
        </div>
        <ul className="flex flex-wrap gap-3">
          {channels.map(({ href, label, Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="me noopener" className="btn-secondary bg-white dark:bg-slate-900">
                <Icon className="h-4 w-4" />
                {label}
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-slate-400" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
