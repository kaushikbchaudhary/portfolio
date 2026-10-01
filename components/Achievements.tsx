import achievements from "@/data/achievements.json";
import type { ComponentType, SVGProps } from "react";
import { BoltIcon, PulseIcon, ShieldIcon, StoreIcon } from "./Icons";

const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  speed: BoltIcon,
  store: StoreIcon,
  pulse: PulseIcon,
  shield: ShieldIcon
};

export function Achievements() {
  return (
    <section id="achievements" aria-label="Highlights" className="border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto grid max-w-6xl gap-px px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((achievement) => {
          const Icon = icons[achievement.icon];
          return (
            <div key={achievement.title} className="space-y-2 py-4 sm:pr-8">
              {Icon && <Icon className="h-6 w-6 text-indigoBrand dark:text-indigo-300" />}
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                {achievement.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {achievement.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
