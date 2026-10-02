import projects from "@/data/projects.json";
import siteConfig from "@/data/siteConfig.json";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, DownloadIcon, GitHubIcon, InstagramIcon, LinkedInIcon, MailIcon, MapPinIcon } from "./Icons";

const socials = [
  { href: siteConfig.links.github, label: "GitHub", Icon: GitHubIcon },
  { href: siteConfig.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: siteConfig.links.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.links.email, label: "Email", Icon: MailIcon }
];

const latest = projects.find((project) => project.featured);

export function Hero() {
  return (
    <section id="about" className="border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-[1fr_auto]">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
            <MapPinIcon className="h-4 w-4" />
            {siteConfig.jobTitle} · {siteConfig.location}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl">
            {siteConfig.value}
          </p>
          {latest && (
            <Link
              href={`/projects/${latest.slug}`}
              className="group inline-flex max-w-full items-center gap-3 rounded-lg border border-indigo-200 bg-indigo-50/60 py-2 pl-2 pr-3 text-sm transition-colors hover:border-indigoBrand dark:border-indigo-500/30 dark:bg-indigo-500/10"
            >
              <span className="shrink-0 rounded-md bg-indigoBrand px-2 py-0.5 text-xs font-semibold text-white">Latest</span>
              <span className="min-w-0 text-slate-700 dark:text-slate-200">
                <span className="font-semibold">{latest.title}</span>
                <span className="hidden sm:inline"> · AI document extraction with Google Gemini</span>
              </span>
              <ArrowRightIcon className="h-4 w-4 shrink-0 text-indigoBrand transition-transform group-hover:translate-x-0.5 dark:text-indigo-300" />
            </Link>
          )}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="#projects" className="btn-primary">
              View projects
            </Link>
            <Link href={siteConfig.resumeUrl} download className="btn-secondary">
              <DownloadIcon className="h-4 w-4" />
              Resume (PDF)
            </Link>
            <div className="flex items-center gap-1 sm:ml-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "me noopener" } : {})}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="order-first lg:order-last">
          <Image
            src={siteConfig.heroImage}
            alt={`${siteConfig.name}, ${siteConfig.jobTitle.toLowerCase()} in ${siteConfig.address.locality}`}
            width={288}
            height={288}
            priority
            sizes="(max-width: 1024px) 160px, 288px"
            className="h-40 w-40 rounded-full object-cover lg:h-72 lg:w-72"
          />
        </div>
      </div>
    </section>
  );
}
