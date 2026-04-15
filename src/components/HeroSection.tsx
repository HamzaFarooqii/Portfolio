'use client';

import { useEffect, useRef, useState } from 'react';

const ROLES = [
  'AI/ML Developer',
  'CS Student',
  'Python Enthusiast',
  'Bug Manufacturer',
  'Coffee-to-Code Converter',
  'Debugger of Life',
  'Open Source Giga-Chad',
];

function TypeWriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((idx + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, texts]);

  return (
    <span>
      <span className="gradient-text">{displayed}</span>
      <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--accent-blue)' }}>|</span>
    </span>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }[] = [];
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - d / 100) * 0.15;
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}

export default function HeroSection() {
  const [clicked, setClicked] = useState(false);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 64,
      }}
    >
      <ParticleCanvas />

      {/* Decorative rings */}
      <div style={{
        position: 'absolute',
        right: '5%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 500,
        height: 500,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            position: 'absolute',
            width: i * 160,
            height: i * 160,
            borderRadius: '50%',
            border: `1px solid rgba(59,130,246,${0.1 / i})`,
            animation: `spin-slow ${20 + i * 10}s linear infinite ${i % 2 === 0 ? 'reverse' : ''}`,
          }} />
        ))}
        {/* Center avatar placeholder */}
        <div style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          position: 'relative',
          zIndex: 1,
          boxShadow: 'var(--glow-blue)',
        }}>
          👨‍💻
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 720 }}>
          {/* Status indicator */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 100,
            marginBottom: 32,
            fontSize: '0.8rem',
            color: '#34d399',
            fontFamily: 'var(--font-mono)',
          }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#10b981',
              display: 'inline-block',
              position: 'relative',
            }}>
              <span style={{
                position: 'absolute',
                inset: -2,
                borderRadius: '50%',
                background: '#10b981',
                animation: 'pulse-ring 2s ease-out infinite',
              }} />
            </span>
            Available for opportunities | Based in Pakistan 🇵🇰
          </div>

          {/* Greeting */}
          <p style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-cyan)',
            fontSize: '1rem',
            marginBottom: 12,
            animation: 'fade-up 0.6s ease',
          }}>
            Hey there, I&apos;m —
          </p>

          {/* Name */}
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: 16,
            animation: 'fade-up 0.6s ease 0.1s both',
          }}>
            Hamza
            <br />
            <span className="gradient-text">Farooqi</span>
          </h1>

          {/* Dynamic role */}
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            color: 'var(--text-secondary)',
            fontWeight: 500,
            marginBottom: 24,
            minHeight: '2.5rem',
            animation: 'fade-up 0.6s ease 0.2s both',
          }}>
            <TypeWriter texts={ROLES} />
          </p>

          {/* Description */}
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            maxWidth: 560,
            marginBottom: 40,
            animation: 'fade-up 0.6s ease 0.3s both',
          }}>
            CS student who turns caffeine into code and bugs into &quot;features&quot;. I build AI-powered tools,
            optimize routes with genetic algorithms, and occasionally wonder why my code works even when I&apos;m not sure it should.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 60,
            animation: 'fade-up 0.6s ease 0.4s both',
          }}>
            <a href="#projects" className="btn-primary">
              View My Work 🚀
            </a>
            <a
              href="https://github.com/HamzaFarooqii"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              GitHub Profile
            </a>
            <button
              className="btn-ghost"
              onClick={() => {
                setClicked(true);
                setTimeout(() => setClicked(false), 3000);
              }}
              style={{ cursor: 'pointer' }}
            >
              {clicked ? '✅ Noted!' : '📄 Download CV'}
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: 40,
            flexWrap: 'wrap',
            animation: 'fade-up 0.6s ease 0.5s both',
          }}>
            {[
              { value: '3+', label: 'Projects on GitHub' },
              { value: '∞', label: 'Bugs Created' },
              { value: '99%', label: 'Stack Overflow Visits' },
              { value: '4★', label: 'Coffee Dependency' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: 'var(--accent-blue)',
                  lineHeight: 1,
                  fontFamily: 'var(--font-mono)',
                }}>{stat.value}</div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginTop: 4,
                  fontWeight: 500,
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        color: 'var(--text-muted)',
        fontSize: '0.75rem',
        animation: 'bounce-soft 2s ease-in-out infinite',
      }}>
        <span>Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 4v16M4 16l4 4 4-4" />
        </svg>
      </div>
    </section>
  );
}
