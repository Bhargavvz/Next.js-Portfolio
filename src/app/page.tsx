"use client";

import SpaceBackground from '@/components/SpaceBackground';
import CustomCursor from '@/components/ui/CustomCursor';
import Taskbar from '@/components/layout/Taskbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';
import Blog from '@/components/sections/Blog';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <SpaceBackground />
      <CustomCursor />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog />
        <Achievements />
        <Contact />
        <Footer />
      </main>
      <Taskbar />
    </div>
  );
}
