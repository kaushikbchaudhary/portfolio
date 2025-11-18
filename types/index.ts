export type SiteConfig = {
  name: string;
  role: string;
  value: string;
  heroImage: string;
  resumeUrl: string;
  location: string;
  links: {
    linkedin: string;
    github: string;
    email: string;
    whatsapp?: string;
  };
};

export type Achievement = {
  title: string;
  description: string;
  icon: string;
};

export type Project = {
  title: string;
  slug: string;
  thumbnail: string;
  heroImage: string;
  description: string;
  tech: string[];
  links: {
    demo: string;
    github: string;
  };
  about: string;
  responsibilities: string[];
  screenshots: string[];
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type BlogPost = {
  title: string;
  date: string;
  excerpt: string;
  link: string;
};
