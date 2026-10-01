import siteConfig from "@/data/siteConfig.json";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.jobTitle}, {siteConfig.address.locality}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/#projects" className="hover:text-slate-900 dark:hover:text-white">Projects</Link>
          <a href={siteConfig.links.github} target="_blank" rel="me noopener" className="hover:text-slate-900 dark:hover:text-white">GitHub</a>
          <a href={siteConfig.links.linkedin} target="_blank" rel="me noopener" className="hover:text-slate-900 dark:hover:text-white">LinkedIn</a>
          <a href={siteConfig.resumeUrl} className="hover:text-slate-900 dark:hover:text-white">Resume</a>
        </nav>
      </div>
    </footer>
  );
}
