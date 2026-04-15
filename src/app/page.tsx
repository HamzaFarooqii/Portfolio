'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import FunZoneSection from '@/components/FunZoneSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';

export default function Home() {
  return (
    <>
      <ProgressBar />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <div className="divider" />
        <AboutSection />
        <div className="divider" />
        <ProjectsSection />
        <div className="divider" />
        <SkillsSection />
        <div className="divider" />
        <FunZoneSection />
        <div className="divider" />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
