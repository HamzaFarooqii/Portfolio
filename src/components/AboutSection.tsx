'use client';

import { useState } from 'react';

const TIMELINE = [
  {
    year: '2024 — Present',
    title: 'CS Student',
    org: 'University',
    desc: 'Studying Computer Science. Learning to think like a computer (no feelings, all logic). Fighting bugs one Stack Overflow answer at a time.',
    icon: '🎓',
    color: 'var(--accent-blue)',
  },
  {
    year: '2024',
    title: 'AI Standup Agent',
    org: 'Personal Project',
    desc: 'Built a multi-agent AI pipeline that transcribes voice updates, detects cross-team blockers, and delivers digest to Slack & Notion. Gemini + Whisper + FastAPI.',
    icon: '🤖',
    color: 'var(--accent-purple)',
  },
  {
    year: '2024',
    title: 'Route Optimizer (Pakivation)',
    org: 'Academic Project',
    desc: 'Genetic algorithm-powered route planner with an interactive Leaflet.js map UI. Optimizes delivery sequences in real-time. Built with Flask + Python.',
    icon: '🗺️',
    color: 'var(--accent-cyan)',
  },
  {
    year: '2024',
    title: 'Cafe Management System',
    org: 'DB Course Project',
    desc: 'Full-stack C# WinForms application with SQL Server backend. Features order management, customer portal, and employee workflows. Pushed to GitHub against all odds.',
    icon: '☕',
    color: 'var(--accent-orange)',
  },
];

const FACTS = [
  { emoji: '🌍', label: 'Location', value: 'Pakistan' },
  { emoji: '🎓', label: 'Degree', value: 'B.Sc. Computer Science' },
  { emoji: '💻', label: 'Primary Lang', value: 'Python & C#' },
  { emoji: '🧠', label: 'Focus', value: 'AI / ML / Backend' },
  { emoji: '🌙', label: 'Codes best', value: 'At 2 AM' },
  { emoji: '☕', label: 'Fuel', value: 'Coffee (obviously)' },
  { emoji: '🐛', label: 'Bugs fixed today', value: '3 (made 7)' },
  { emoji: '📚', label: 'Currently reading', value: 'Stack traces' },
];

export default function AboutSection() {
  const [revealFact, setRevealFact] = useState<number | null>(null);

  return (
    <section id="about" className="section">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 80 }}>
          <div className="section-label">About Me</div>
          <h2 className="section-title">
            The Human Behind The <span className="gradient-text">Code</span>
          </h2>
          <p className="section-desc">
            I&apos;m not just a developer — I&apos;m a story. A story of late-night debugging sessions,
            accidental production deployments, and that one time my genetic algorithm evolved to hate me.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 60 }}>
          {/* Left — about text */}
          <div>
            <div style={{
              padding: 32,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              marginBottom: 24,
            }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 16 }}>
                Hey! 👋 I&apos;m <strong style={{ color: 'var(--text-primary)' }}>Hamza Farooqi</strong>, a Computer Science student
                from Pakistan who decided that writing code is way more fun than sleeping.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 16 }}>
                My passion lies at the intersection of <strong style={{ color: 'var(--accent-blue)' }}>AI/ML</strong>,
                <strong style={{ color: 'var(--accent-purple)' }}> backend engineering</strong>, and
                <strong style={{ color: 'var(--accent-cyan)' }}> building things that actually work</strong> (most of the time).
                I&apos;ve built AI pipelines, optimized delivery routes with genetic algorithms, and survived database course projects.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem' }}>
                When I&apos;m not arguing with my IDE or blaming the compiler, I&apos;m exploring new technologies,
                contributing to projects on GitHub, and questioning all my life choices — standard CS student activities. 🎓
              </p>
            </div>

            {/* Fun facts grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
            }}>
              {FACTS.map((fact, i) => (
                <div
                  key={fact.label}
                  onClick={() => setRevealFact(revealFact === i ? null : i)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: revealFact === i ? 'rgba(59,130,246,0.1)' : 'var(--bg-card)',
                    border: `1px solid ${revealFact === i ? 'rgba(59,130,246,0.3)' : 'var(--border)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>{fact.emoji}</span>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {fact.label}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: 2 }}>
                      {fact.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — timeline */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 24, fontFamily: 'var(--font-mono)' }}>
              // my journey.log
            </div>
            <div style={{ position: 'relative' }}>
              {/* Line */}
              <div style={{
                position: 'absolute',
                left: 19,
                top: 0,
                bottom: 0,
                width: 2,
                background: 'linear-gradient(to bottom, var(--accent-blue), var(--accent-purple), transparent)',
                borderRadius: 2,
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {TIMELINE.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 24 }}>
                    {/* Icon bubble */}
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: `${item.color}20`,
                      border: `2px solid ${item.color}60`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      flexShrink: 0,
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      {item.icon}
                    </div>

                    <div style={{ flex: 1, paddingBottom: 8 }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                        {item.year}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: 2 }}>
                        {item.title}
                        <span style={{ fontSize: '0.75rem', color: item.color, fontWeight: 600, marginLeft: 8 }}>
                          @ {item.org}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
