import { Achievements } from "@/components/Achievements";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Playground } from "@/components/Playground";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Testimonials } from "@/components/Testimonials";

export default function HomePage() {
  return (
    <>
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
