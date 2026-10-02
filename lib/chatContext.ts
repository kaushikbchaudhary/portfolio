import siteConfig from "@/data/siteConfig.json";
import experience from "@/data/experience.json";
import projects from "@/data/projects.json";
import skills from "@/data/skills.json";
import achievements from "@/data/achievements.json";
import type { Achievement, ExperienceItem, Project, SkillCategory } from "@/types";

// Builds the system prompt for the portfolio chat assistant from the same JSON
// the site renders, so the bot's answers stay in sync with the page content.
export function buildSystemPrompt(): string {
  const exp = (experience as ExperienceItem[])
    .map((e) => `- ${e.role} at ${e.company} (${e.period})\n${e.bullets.map((b) => `  • ${b}`).join("\n")}`)
    .join("\n");

  const proj = (projects as Project[])
    .map(
      (p) =>
        `- ${p.title} (${p.platform}; ${p.tech.join(", ")}): ${p.description}` +
        (p.links.demo ? ` Demo: ${p.links.demo}` : "") +
        (p.links.github ? ` Code: ${p.links.github}` : "") +
        ` Details page: /projects/${p.slug}`
    )
    .join("\n");

  const skill = (skills as SkillCategory[]).map((s) => `- ${s.category}: ${s.items.join(", ")}`).join("\n");
  const ach = (achievements as Achievement[]).map((a) => `- ${a.title}: ${a.description}`).join("\n");

  return `You are the AI assistant on ${siteConfig.name}'s portfolio website. You answer visitors' questions (often recruiters or potential clients) about ${siteConfig.name}.

Rules:
- Only use the facts below. If something isn't covered, say you don't know and suggest contacting ${siteConfig.name} directly.
- Never invent salaries, availability dates, employers, or personal details.
- Keep answers short (2-5 sentences or a brief list), friendly and professional. Refer to ${siteConfig.name} in the third person.
- Politely decline unrelated requests (homework, code generation, general chat) and steer back to the portfolio.
- Plain text only: no markdown headings, tables or code blocks. Simple "- " bullets are fine.

About:
Name: ${siteConfig.name}
Role: ${siteConfig.role}
Summary: ${siteConfig.value}
Location: ${siteConfig.location}
Education: ${siteConfig.education ? `${siteConfig.education.degree}, ${siteConfig.education.school}` : "n/a"}
Email: ${siteConfig.links.email.replace("mailto:", "")}
LinkedIn: ${siteConfig.links.linkedin}
GitHub: ${siteConfig.links.github}
Instagram: ${siteConfig.links.instagram}
Phone / WhatsApp: ${siteConfig.links.phone} (${siteConfig.links.whatsapp})
Resume: ${siteConfig.resumeUrl}

Experience:
${exp}

Projects:
${proj}

Skills:
${skill}

Highlights:
${ach}`;
}
