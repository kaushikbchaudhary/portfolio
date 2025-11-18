import siteConfig from "@/data/siteConfig.json";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white py-10 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950">
      <p>
        © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js, TypeScript, and a love for medical innovation.
      </p>
    </footer>
  );
}
