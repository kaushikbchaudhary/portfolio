"use client";

import siteConfig from "@/data/siteConfig.json";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#contact", label: "Contact" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold tracking-tight text-slate-900 dark:text-white">
          {siteConfig.name.split(" ")[0]} <span className="text-indigoBrand">Portfolio</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.resumeUrl}
            download
            className="rounded-full bg-indigoBrand px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
          >
            Resume
          </Link>
          <ThemeToggle />
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-xl text-slate-600 lg:hidden dark:border-slate-700 dark:text-slate-200"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </nav>
      {isOpen && (
        <div className="border-t border-slate-200/70 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={siteConfig.resumeUrl}
              download
              className="rounded-full bg-indigoBrand px-5 py-2 text-center text-sm font-semibold text-white shadow-soft"
              onClick={() => setIsOpen(false)}
            >
              Download Resume
            </Link>
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
