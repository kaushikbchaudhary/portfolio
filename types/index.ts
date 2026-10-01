export type SiteConfig = {
  name: string;
  role: string;
  jobTitle: string;
  value: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  heroImage: string;
  profileImage: string;
  resumeUrl: string;
  siteUrl: string;
  lastUpdated: string;
  googleVerification?: string;
  clarityProjectId?: string;
  location: string;
  education?: {
    degree: string;
    school: string;
  };
  address: {
    locality: string;
    region: string;
    country: string;
  };
  links: {
    linkedin: string;
    github: string;
    email: string;
    whatsapp?: string;
    gitlab?: string;
    portfolio?: string;
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
  updated: string;
  featured?: boolean;
  label?: string;
  demoNote?: string;
  highlights?: string[];
  thumbnail: string;
  heroImage: string;
  description: string;
  platform: string;
  tech: string[];
  links: {
    demo?: string;
    github?: string;
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

export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string[];
};
