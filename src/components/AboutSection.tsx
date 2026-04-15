'use client';

const TIMELINE = [
  {
    period: '2022 — 2026',
    title: 'BS Software Engineering',
    org: 'FAST NUCES',
    desc: 'Studying software engineering — learning to build systems, not just write code. Picking up everything from databases to AI pipelines along the way.',
    icon: '🎓',
    accent: '#d4ff57',
  },
  {
    period: '2024',
    title: 'AI Standup Agent',
    org: 'Personal Project',
    desc: 'Voice-driven AI pipeline that handles daily team standups. Transcribes audio, extracts structure, detects blockers, and delivers summaries to Slack and Notion.',
    icon: '🤖',
    accent: '#60a5fa',
  },
  {
    period: '2024',
    title: 'Pakivation',
    org: 'Academic Project',
    desc: 'Route optimizer using genetic algorithms. Drop markers on a map, click optimize, watch it find the best path. Flask backend + Leaflet.js interactive map.',
    icon: '🗺️',
    accent: '#22d3ee',
  },
  {
    period: '2024',
    title: 'Cafe Management System',
    org: 'DB Course Project',
    desc: 'Full desktop application for cafe operations — orders, employees, customers, feedback. Built in C# WinForms with a SQL Server backend.',
    icon: '☕',
    accent: '#fb923c',
  },
];

const FACTS = [
  { emoji: '📍', label: 'Based in', value: 'Pakistan' },
  { emoji: '🎓', label: 'Degree', value: 'BS Software Engineering' },
  { emoji: '🏫', label: 'University', value: 'FAST NUCES' },
  { emoji: '📅', label: 'Batch', value: '2022 – 2026' },
  { emoji: '💻', label: 'Writes in', value: 'Python, C#, JS' },
  { emoji: '🧠', label: 'Interested in', value: 'AI & Backend' },
  { emoji: '🌙', label: 'Productive at', value: '2 AM (it\'s a problem)' },
  { emoji: '☕', label: 'Powered by', value: 'Coffee, consistently' },
];

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <div className="section-label">About</div>
          <h2 className="section-title">
            I write code.<br />
            <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>Sometimes it even works.</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 60,
          alignItems: 'start',
        }}>
          {/* Left col */}
          <div>
            {/* Bio */}
            <div style={{ marginBottom: 32 }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.975rem', marginBottom: 16 }}>
                I&apos;m <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Hamza Farooqi</strong> — a software engineering student at FAST NUCES
                who builds things for the web and beyond.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.975rem', marginBottom: 16 }}>
                My focus is on making software that&apos;s actually useful to someone other than me. That means
                clean backends, sensible APIs, and AI tools that do real work rather than just look impressive in demos.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.975rem' }}>
                Currently in my final years — spending most of that time either building something new,
                debugging something old, or pretending I&apos;ll fix that TODO comment later.
              </p>
            </div>

            {/* Facts grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
            }}>
              {FACTS.map(fact => (
                <div
                  key={fact.label}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{fact.emoji}</span>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {fact.label}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: 1 }}>
                      {fact.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right col — timeline */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 28, fontFamily: 'var(--font-mono)' }}>
              Timeline
            </div>
            <div style={{ position: 'relative' }}>
              {/* Vertical line */}
              <div style={{
                position: 'absolute',
                left: 15,
                top: 8,
                bottom: 0,
                width: 1,
                background: 'linear-gradient(to bottom, var(--accent), var(--border) 80%)',
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {TIMELINE.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 20 }}>
                    {/* Dot */}
                    <div style={{
                      width: 31,
                      height: 31,
                      borderRadius: '50%',
                      background: '#161616',
                      border: `1.5px solid ${item.accent}50`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      flexShrink: 0,
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      {item.icon}
                    </div>

                    <div style={{ paddingBottom: 4 }}>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 3 }}>
                        {item.period}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                        {item.title}
                        <span style={{ fontSize: '0.72rem', color: item.accent, fontWeight: 500, marginLeft: 8 }}>
                          {item.org}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.835rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginTop: 4 }}>
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
