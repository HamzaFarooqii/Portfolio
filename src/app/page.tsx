'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import FunZoneSection from '@/components/FunZoneSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import ProgressBar from '@/components/ProgressBar';

export default function Home() {
  return (
    <>
      {/* Background effects */}
      <div className="bg-grid" />
      <div className="bg-gradient-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="noise" />

      {/* Cursor glow */}
      <CursorGlow />

      {/* Scroll progress */}
      <ProgressBar />

      {/* Nav */}
      <Navbar />

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />

        <div className="divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

        <AboutSection />

        <div className="divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

        <ProjectsSection />

        <div className="divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

        <SkillsSection />

        <div className="divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

        <FunZoneSection />

        <div className="divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
