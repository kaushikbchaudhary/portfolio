"use client";

import siteConfig from "@/data/siteConfig.json";
import Link from "next/link";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/80">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight text-slate-900 dark:text-white">
          {siteConfig.name}
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link href={siteConfig.resumeUrl} download className="btn-primary ml-2 px-4 py-2">
            Resume
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={siteConfig.resumeUrl}
              download
              className="btn-primary mt-2"
              onClick={() => setIsOpen(false)}
            >
              Download resume
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
