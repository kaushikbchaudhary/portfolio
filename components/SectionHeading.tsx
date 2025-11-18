import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

const variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};

export function SectionHeading({ children }: PropsWithChildren) {
  return (
    <motion.h2
      className="mb-6 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      variants={variants}
    >
      {children}
    </motion.h2>
  );
}
