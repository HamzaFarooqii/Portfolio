'use client';

import { useState } from 'react';

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDesc: string;
  emoji: string;
  gradient: string;
  accent: string;
  tags: string[];
  tagType: string;
  github: string;
  live?: string;
  features: string[];
  year: string;
  status: string;
  statusColor: string;
};

const PROJECTS: Project[] = [
  {
    id: 'standup',
    title: 'Async Standup Agent',
    subtitle: 'AI-powered team standups, autonomously',
    description: 'A multi-stage AI pipeline that transforms voice recordings into structured team digests — with cross-team blocker detection that no existing tool does.',
    longDesc: 'Voice goes in, intelligence comes out. The agent transcribes speech via OpenAI Whisper, extracts done/today/blockers via Gemini Flash, clusters updates semantically with embeddings, detects cross-team dependencies, and delivers a professional digest to Slack & Notion — all automatically.',
    emoji: '🤖',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
    accent: '#3b82f6',
    tags: ['Python', 'FastAPI', 'Gemini AI', 'Whisper', 'Slack API', 'Notion API', 'Scikit-learn', 'APScheduler'],
    tagType: 'tag-blue',
    github: 'https://github.com/HamzaFarooqii',
    features: [
      '🎤 Voice submission via Web UI + Telegram Bot',
      '🔊 OpenAI Whisper speech-to-text (runs locally, free)',
      '🧠 Gemini Flash structured JSON extraction',
      '🔗 Cross-team blocker detection (novel feature!)',
      '📊 Semantic clustering with Gemini embeddings',
      '📝 AI-synthesized professional digest',
      '📬 Auto-delivery to Slack & Notion',
      '⏰ APScheduler cron job at 10 AM daily',
    ],
    year: '2024',
    status: 'Live',
    statusColor: '#10b981',
  },
  {
    id: 'pakivation',
    title: 'Pakivation',
    subtitle: 'Genetic Algorithm Route Optimizer',
    description: 'An interactive map-based delivery route planner that uses genetic algorithms to find the optimal path between multiple drop points in real-time.',
    longDesc: 'Drop origin and delivery markers on a live dark-mode map, hit Optimize — and watch the genetic algorithm work its magic. A glowing cyan path traces the optimal sequence. Built with Flask backend + Leaflet.js frontend with premium glassmorphism UI.',
    emoji: '🗺️',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
    accent: '#06b6d4',
    tags: ['Python', 'Flask', 'Genetic Algorithm', 'Leaflet.js', 'Glassmorphism', 'REST API'],
    tagType: 'tag-cyan',
    github: 'https://github.com/HamzaFarooqii/Pakivation',
    features: [
      '🗺️ Full-screen dark mode Leaflet.js map',
      '🧬 Genetic algorithm route optimization',
      '📍 Custom markers (origin 🚗 + deliveries 📦)',
      '✨ Animated glowing path visualization',
      '💎 Glassmorphism floating side panel',
      '🏎️ Real-time logging in UI',
      '🔁 /optimize REST API endpoint',
      '📐 Auto-zoom to fit optimized route',
    ],
    year: '2024',
    status: 'Complete',
    statusColor: '#3b82f6',
  },
  {
    id: 'cafe',
    title: 'Cafe Management System',
    subtitle: 'Full-stack desktop application',
    description: 'A C# WinForms cafe management app with SQL Server backend — complete order tracking, multi-role auth, customer portal, and employee workflows.',
    longDesc: 'A complete point-of-sale and management system for cafe operations. Features admin dashboard, customer ordering, employee management, feedback system, and SQL trigger-based business logic. Built with .NET Framework 4.7.2 and SQL Server LocalDB.',
    emoji: '☕',
    gradient: 'linear-gradient(135deg, #f97316 0%, #f59e0b 50%, #10b981 100%)',
    accent: '#f97316',
    tags: ['C#', 'WinForms', 'SQL Server', '.NET 4.7.2', 'MSBuild', 'MSSQL Triggers'],
    tagType: 'tag-orange',
    github: 'https://github.com/HamzaFarooqii/CafeManagmentSystem',
    features: [
      '👑 Admin dashboard with full CRUD',
      '🛍️ Customer ordering portal',
      '👷 Employee management workflows',
      '💬 Feedback & rating system',
      '🔐 Multi-role authentication',
      '⚡ SQL trigger-based business logic',
      '🏗️ Deployed via MSBuild 0 warnings',
      '📊 LocalDB schema with foreign keys',
    ],
    year: '2024',
    status: 'Complete',
    statusColor: '#f97316',
  },
];

export default function ProjectsSection() {
  const [active, setActive] = useState<Project>(PROJECTS[0]);
  const [showing, setShowing] = useState(false);

  const selectProject = (p: Project) => {
    setActive(p);
    setShowing(true);
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div className="section-label">Projects</div>
          <h2 className="section-title">
            Things I&apos;ve <span className="gradient-text">Actually Built</span>
          </h2>
          <p className="section-desc">
            Not just tutorial clones. Real projects with real complexity — and real bugs that took real hours to fix.
          </p>
        </div>

        {/* Project cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24, marginBottom: 40 }}>
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={active.id === project.id && showing}
              onClick={() => selectProject(project)}
            />
          ))}
        </div>

        {/* Detail panel */}
        {showing && (
          <ProjectDetail
            project={active}
            onClose={() => setShowing(false)}
          />
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, isActive, onClick }: { project: Project; isActive: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'var(--bg-card)',
        border: `1px solid ${isActive ? project.accent + '60' : 'var(--border)'}`,
        cursor: 'pointer',
        transition: 'all 0.3s',
        transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isActive ? `0 20px 60px ${project.accent}20` : 'none',
        position: 'relative',
      }}
    >
      {/* Header gradient */}
      <div style={{
        height: 6,
        background: project.gradient,
      }} />

      <div style={{ padding: 28 }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 'var(--radius-md)',
            background: `${project.accent}15`,
            border: `1px solid ${project.accent}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
          }}>
            {project.emoji}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 12px',
            borderRadius: 100,
            fontSize: '0.7rem',
            fontWeight: 700,
            background: `${project.statusColor}15`,
            border: `1px solid ${project.statusColor}40`,
            color: project.statusColor,
            fontFamily: 'var(--font-mono)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: project.statusColor, display: 'inline-block' }} />
            {project.status}
          </div>
        </div>

        <div style={{ marginBottom: 4, fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {project.year}
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 6, color: 'var(--text-primary)' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.8rem', color: project.accent, fontWeight: 600, marginBottom: 12 }}>
          {project.subtitle}
        </p>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {project.tags.slice(0, 4).map(tag => (
            <span key={tag} className={`tag ${project.tagType}`}>{tag}</span>
          ))}
          {project.tags.length > 4 && (
            <span className="tag tag-blue">+{project.tags.length - 4}</span>
          )}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 12 }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: '0.8rem',
              fontWeight: 600,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            <GitHubIcon /> GitHub
          </a>
          <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: '0.8rem',
              fontWeight: 600,
              background: isActive ? project.accent : 'transparent',
              border: `1px solid ${project.accent}60`,
              color: isActive ? '#fff' : project.accent,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {isActive ? '▼ Hide Details' : '▶ Details'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      style={{
        borderRadius: 'var(--radius-xl)',
        background: 'var(--bg-card)',
        border: `1px solid ${project.accent}40`,
        overflow: 'hidden',
        animation: 'fade-up 0.3s ease',
        boxShadow: `0 30px 80px ${project.accent}15`,
      }}
    >
      {/* Top bar */}
      <div style={{
        height: 4,
        background: project.gradient,
      }} />

      <div style={{ padding: '40px 40px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: '2.5rem' }}>{project.emoji}</span>
            <div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                {project.title}
              </h3>
              <p style={{ color: project.accent, fontWeight: 600 }}>{project.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              padding: '8px 16px',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            ✕ Close
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>
          {/* Description */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', color: project.accent, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              // Description
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24, fontSize: '0.95rem' }}>
              {project.longDesc}
            </p>

            {/* All tags */}
            <h4 style={{ fontFamily: 'var(--font-mono)', color: project.accent, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              // Tech Stack
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {project.tags.map(tag => (
                <span key={tag} className={`tag ${project.tagType}`}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', color: project.accent, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              // Key Features
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {project.features.map((f, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  padding: '8px 12px',
                  borderRadius: 8,
                  background: `${project.accent}06`,
                  border: `1px solid ${project.accent}15`,
                }}>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <GitHubIcon /> View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
