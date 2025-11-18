"use client";

import siteConfig from "@/data/siteConfig.json";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="about" className="section bg-hero-gradient">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 text-center lg:flex-row lg:text-left">
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigoBrand/80">
            {siteConfig.role}
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 md:text-xl">
            {siteConfig.value}
          </p>
          <p className="text-sm font-medium uppercase tracking-[0.4em] text-slate-400">
            {siteConfig.location}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-indigoBrand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
            >
              View Projects
            </Link>
            <Link
              href={siteConfig.resumeUrl}
              download
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-indigoBrand hover:text-indigoBrand dark:border-slate-700 dark:text-white"
            >
              Download Resume (PDF)
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="flex flex-1 items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="relative h-64 w-64 rounded-full bg-hero-gradient p-[3px] shadow-2xl shadow-indigoBrand/20">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-slate-900">
              <Image
                src={siteConfig.heroImage}
                alt={siteConfig.name}
                width={200}
                height={200}
                priority
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
