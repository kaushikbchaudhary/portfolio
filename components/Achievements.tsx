"use client";

import achievements from "@/data/achievements.json";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const icons: Record<string, string> = {
  stethoscope: "🩺",
  heartbeat: "❤️",
  workflow: "🗂️",
  signal: "📡"
};

export function Achievements() {
  return (
    <section id="achievements" className="section bg-slate-50/60 dark:bg-slate-900/30">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading>Achievements</SectionHeading>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className="card text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigoBrand/10 text-2xl">
                {icons[achievement.icon]}
              </div>
              <p className="text-base font-semibold text-slate-900 dark:text-white">
                {achievement.title}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
