import type { Metadata } from "next";
import { Achievements } from "@/components/Achievements";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Playground } from "@/components/Playground";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Testimonials } from "@/components/Testimonials";
import { authorRef, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" }
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: siteUrl,
  mainEntity: authorRef
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <Hero />
      <Achievements />
      <Projects />
      <Skills />
      <Experience />
      <Testimonials />
      <Playground />
      <Blog />
      <Contact />
    </>
  );
}
