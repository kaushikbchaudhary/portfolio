"use client";

import testimonials from "@/data/testimonials.json";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  return (
    <section id="testimonials" className="section bg-slate-50/60 dark:bg-slate-900/30">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading>Testimonials</SectionHeading>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              className="card h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <p className="text-base text-slate-600 dark:text-slate-300">“{testimonial.quote}”</p>
              <div className="mt-6">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {testimonial.author}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
