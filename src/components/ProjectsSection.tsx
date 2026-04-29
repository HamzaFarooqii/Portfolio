'use client';

import { useState } from 'react';

const PROJECTS = [
  {
    id: 'devops-autopilot',
    icon: '🚀',
    title: 'DevOps AutoPilot',
    subtitle: 'AI-Powered Deployment Platform — FYP',
    status: 'Completed',
    statusColor: '#4ade80',
    desc: 'Full-stack AI platform that automatically analyzes any codebase, generates Docker configs using a local LLM, and deploys to AWS via Terraform. Upload your project ZIP → get production-ready Docker files.',
    tags: [
      { label: 'FastAPI', cls: 'tag-blue' },
      { label: 'React', cls: 'tag-cyan' },
      { label: 'Ollama LLM', cls: 'tag-purple' },
      { label: 'Docker', cls: 'tag-blue' },
      { label: 'MongoDB', cls: 'tag-green' },
      { label: 'Terraform', cls: 'tag-orange' },
      { label: 'scikit-learn', cls: 'tag-yellow' },
    ],
    details: [
      'Hybrid heuristic + ML pipeline auto-detects language, framework, ports, databases, and services',
      'Local LLM (Qwen2.5-Coder via Ollama) generates Dockerfiles and docker-compose.yml with SSE streaming',
      'Multi-service detection for monorepo projects with per-service Dockerfile generation',
      'React/TypeScript frontend with real-time build/deploy progress and Docker management UI',
      'Optional AWS ECS/ECR deployment via AI-generated Terraform configs',
    ],
    github: null,
  },
  {
    id: 'mlops-rps',
    icon: '📊',
    title: 'MLOps Predictive System',
    subtitle: 'End-to-End ML Pipeline',
    status: 'Completed',
    statusColor: '#4ade80',
    desc: 'Production-grade MLOps pipeline with automated data ingestion, model training, versioning, CI/CD, containerized serving, and real-time monitoring.',
    tags: [
      { label: 'Airflow', cls: 'tag-orange' },
      { label: 'MLflow', cls: 'tag-blue' },
      { label: 'DVC', cls: 'tag-purple' },
      { label: 'Docker', cls: 'tag-blue' },
      { label: 'Kubernetes', cls: 'tag-cyan' },
      { label: 'Prometheus', cls: 'tag-orange' },
      { label: 'Grafana', cls: 'tag-yellow' },
      { label: 'GitHub Actions', cls: 'tag-green' },
    ],
    details: [
      'ETL workflows orchestrated with Apache Airflow DAGs pulling from live APIs',
      'Dataset versioning with DVC + experiment tracking via MLflow/Dagshub',
      'CI/CD pipeline with GitHub Actions and CML for automated model comparison',
      'Containerized FastAPI model serving deployed to Kubernetes',
      'Prometheus + Grafana monitoring stack with model drift detection',
    ],
    github: null,
  },
  {
    id: 'standup-agent',
    icon: '🤖',
    title: 'Async Standup Agent',
    subtitle: 'AI-Powered Team Communication',
    status: 'Completed',
    statusColor: '#4ade80',
    desc: 'Multi-stage AI pipeline that transforms voice recordings into structured team digests. Transcribes audio, extracts structured data, detects blockers across teams, and delivers summaries to Slack and Notion.',
    tags: [
      { label: 'Python', cls: 'tag-yellow' },
      { label: 'FastAPI', cls: 'tag-blue' },
      { label: 'Gemini AI', cls: 'tag-purple' },
      { label: 'Whisper', cls: 'tag-orange' },
      { label: 'Slack API', cls: 'tag-pink' },
      { label: 'Notion API', cls: 'tag-cyan' },
    ],
    details: [
      'OpenAI Whisper for local speech-to-text transcription',
      'Google Gemini for structured JSON extraction from transcriptions',
      'Semantic clustering using Gemini embeddings + Agglomerative Clustering',
      'Cross-team blocker detection with automated alert routing',
      'Automated daily delivery to Slack channels and Notion pages via APScheduler',
    ],
    github: 'https://github.com/HamzaFarooqii',
  },
  {
    id: 'pakivation',
    icon: '🗺️',
    title: 'Pakivation',
    subtitle: 'Genetic Algorithm Route Optimizer',
    status: 'Completed',
    statusColor: '#4ade80',
    desc: 'Interactive route planning tool that uses genetic algorithms to calculate optimal delivery sequences. Drop markers on a dark-mode map, hit optimize, watch the magic.',
    tags: [
      { label: 'Python', cls: 'tag-yellow' },
      { label: 'Flask', cls: 'tag-blue' },
      { label: 'Genetic Algorithm', cls: 'tag-purple' },
      { label: 'Leaflet.js', cls: 'tag-green' },
    ],
    details: [
      'Flask REST API with /optimize endpoint running GA solver in real-time',
      'Dark-mode Leaflet.js map UI with animated path visualization',
      'Configurable GA parameters: population size, mutation rate, generations',
    ],
    github: 'https://github.com/HamzaFarooqii/Pakivation',
  },
  {
    id: 'bluepin',
    icon: '📌',
    title: 'BluePin',
    subtitle: 'Mobile Car Booking App',
    status: 'Completed',
    statusColor: '#4ade80',
    desc: 'Cross-platform mobile car booking application built with Flutter. Clean UI with complete booking flow, reservation management, and reusable component library.',
    tags: [
      { label: 'Flutter', cls: 'tag-cyan' },
      { label: 'Dart', cls: 'tag-blue' },
    ],
    details: [
      'Cross-platform mobile app for iOS and Android',
      'Intuitive car rental UI with reusable component library',
      'Complete navigation flow for booking and reservation management',
      'Optimized performance across both platforms',
    ],
    github: null,
  },
  {
    id: 'trip-manager',
    icon: '✈️',
    title: 'Trip Manager',
    subtitle: 'Design → Full Web App',
    status: 'Completed',
    statusColor: '#4ade80',
    desc: 'Designed the complete UI/UX in Figma and then built it out as a fully working web application with trip planning, itinerary management, and booking features.',
    tags: [
      { label: 'React', cls: 'tag-cyan' },
      { label: 'Node.js', cls: 'tag-green' },
      { label: 'Figma', cls: 'tag-pink' },
    ],
    details: [
      'Complete UI/UX design system created in Figma with interactive prototypes',
      'Implemented as a fully working web application — not just mockups',
      'Trip creation, itinerary management, and booking flow',
      'Responsive design with consistent typography and color system',
    ],
    github: null,
  },
  {
    id: 'weather-app',
    icon: '🌦️',
    title: 'MERN Weather App',
    subtitle: 'Full-Stack Weather Dashboard',
    status: 'Completed',
    statusColor: '#4ade80',
    desc: 'Full-stack weather application using the MERN stack with real-time API data integration, responsive React UI, and Express.js REST backend.',
    tags: [
      { label: 'MongoDB', cls: 'tag-green' },
      { label: 'Express.js', cls: 'tag-blue' },
      { label: 'React', cls: 'tag-cyan' },
      { label: 'Node.js', cls: 'tag-green' },
    ],
    details: [
      'Real-time weather data from external APIs for accurate forecasting',
      'RESTful API backend with Express.js and data persistence in MongoDB',
      'Responsive React frontend with clean state management',
    ],
    github: null,
  },
];

export default function ProjectsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <div className="section-label">Projects</div>
          <h2 className="section-title">
            Things I&apos;ve built.
          </h2>
          <p className="section-desc">
            From AI deployment platforms to route optimizers — here&apos;s a selection of
            projects I&apos;ve actually shipped.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
          {PROJECTS.map(project => {
            const isOpen = expanded === project.id;
            return (
              <div
                key={project.id}
                className="card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: isOpen ? '1px solid var(--accent-border)' : undefined,
                }}
                onClick={() => setExpanded(isOpen ? null : project.id)}
              >
                {/* Header bar */}
                <div style={{
                  padding: '20px 22px 16px',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: '1.4rem' }}>{project.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                          {project.title}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {project.subtitle}
                        </div>
                      </div>
                    </div>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 4,
                      background: `${project.statusColor}15`,
                      color: project.statusColor,
                      border: `1px solid ${project.statusColor}30`,
                      flexShrink: 0,
                    }}>
                      {project.status}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.835rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {project.desc}
                  </p>
                </div>

                {/* Tags */}
                <div style={{ padding: '12px 22px', display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {project.tags.map(t => (
                    <span key={t.label} className={`tag ${t.cls}`}>{t.label}</span>
                  ))}
                </div>

                {/* Expandable details */}
                <div style={{
                  maxHeight: isOpen ? 400 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.35s ease',
                }}>
                  <div style={{
                    padding: '0 22px 18px',
                    borderTop: '1px solid var(--border)',
                    paddingTop: 14,
                  }}>
                    <div style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      marginBottom: 10,
                      fontFamily: 'var(--font-mono)',
                    }}>
                      Key Features
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {project.details.map((d, i) => (
                        <li key={i} style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.55,
                          paddingLeft: 14,
                          position: 'relative',
                          marginBottom: 5,
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: 0,
                            color: 'var(--accent)',
                            fontSize: '0.5rem',
                            top: 5,
                          }}>▸</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          marginTop: 10,
                          fontSize: '0.78rem',
                          color: 'var(--accent)',
                          textDecoration: 'none',
                          fontWeight: 600,
                        }}
                      >
                        View on GitHub →
                      </a>
                    )}
                  </div>
                </div>

                {/* Click hint */}
                <div style={{
                  padding: '8px 22px',
                  borderTop: '1px solid var(--border)',
                  textAlign: 'center',
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {isOpen ? '▲ collapse' : '▼ details'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
