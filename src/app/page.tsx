'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import VideoSection from '@/components/VideoSection';
import Certificates from '@/components/Certificates';
import Education from '@/components/Education';
import Training from '@/components/Training';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { usePortfolioStore } from '@/lib/store';

export default function Home() {
  const { data } = usePortfolioStore();
  const sections = data.site.sections;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      {sections.about !== false && <About />}
      {sections.experience !== false && <Experience />}
      {sections.skills !== false && <Skills />}
      {sections.projects !== false && <Projects />}
      {sections.videos !== false && <VideoSection />}
      {sections.certificates !== false && <Certificates />}
      {sections.education !== false && <Education />}
      {sections.training !== false && <Training />}
      {sections.contact !== false && <Contact />}
      <Footer />
      <ThemeToggle />
    </div>
  );
}
