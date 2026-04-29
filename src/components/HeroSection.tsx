'use client';

import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

const ROLES = [
  'Software Engineer',
  'Full-Stack Developer',
  'AI Tools Builder',
  'DevOps Enthusiast',
  'Problem Solver',
  'Backend Developer',
  'Flutter Dev',
];

function TypeWriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((idx + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, texts]);

  return (
    <span>
      <span style={{ color: 'var(--accent)' }}>{displayed}</span>
      <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--accent)', opacity: 0.7 }}>|</span>
    </span>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 64,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 3D Background */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 680 }}>

          {/* Availability pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            background: 'rgba(212,255,87,0.08)',
            border: '1px solid rgba(212,255,87,0.2)',
            borderRadius: 100,
            marginBottom: 40,
            fontSize: '0.75rem',
            color: 'var(--accent)',
            fontFamily: 'var(--font-mono)',
          }}>
            <span style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'inline-block',
              position: 'relative',
            }}>
              <span style={{
                position: 'absolute',
                inset: -2,
                borderRadius: '50%',
                background: 'var(--accent)',
                animation: 'pulse-ring 2s ease-out infinite',
              }} />
            </span>
            Open to work · Pakistan 🇵🇰
          </div>

          {/* Name */}
          <p style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            marginBottom: 10,
            letterSpacing: '0.02em',
          }}>
            Hi, I&apos;m
          </p>

          <h1 style={{
            fontSize: 'clamp(3.5rem, 9vw, 6.5rem)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: 24,
            animation: 'fade-up 0.5s ease both',
          }}>
            Hamza<br />
            <span style={{ color: 'var(--accent)' }}>Farooqi.</span>
          </h1>

          {/* Dynamic role */}
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: 'var(--text-secondary)',
            fontWeight: 400,
            marginBottom: 28,
            minHeight: '2rem',
            animation: 'fade-up 0.5s ease 0.08s both',
          }}>
            <TypeWriter texts={ROLES} />
          </p>

          {/* One-liner */}
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            maxWidth: 500,
            marginBottom: 44,
            animation: 'fade-up 0.5s ease 0.16s both',
          }}>
            I write code that does useful things — from AI-powered DevOps platforms to route
            optimization engines. Software Engineering graduate from <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>FAST NUCES</strong>.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            animation: 'fade-up 0.5s ease 0.24s both',
          }}>
            <a href="#projects" className="btn-primary">
              See my work
            </a>
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              📄 Resume
            </a>
            <a
              href="https://github.com/HamzaFarooqii"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              GitHub
            </a>
            <a href="#contact" className="btn-ghost">
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute',
        bottom: 36,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        color: 'var(--text-muted)',
        fontSize: '0.7rem',
        fontFamily: 'var(--font-mono)',
        animation: 'bounce-soft 2.5s ease-in-out infinite',
        letterSpacing: '0.05em',
        zIndex: 2,
      }}>
        scroll
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 4v12M3 12l4 4 4-4" />
        </svg>
      </div>
    </section>
  );
}
