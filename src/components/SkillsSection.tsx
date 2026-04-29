'use client';

const CATEGORIES = [
  {
    title: 'Languages',
    icon: '⌨️',
    skills: [
      { name: 'JavaScript / TypeScript', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'Dart', level: 70 },
      { name: 'C++', level: 65 },
      { name: 'Java', level: 60 },
      { name: 'SQL', level: 75 },
    ],
  },
  {
    title: 'Web / Backend',
    icon: '🌐',
    skills: [
      { name: 'React / Next.js', level: 85 },
      { name: 'Node.js / Express.js', level: 82 },
      { name: 'FastAPI / Flask', level: 80 },
      { name: 'MongoDB', level: 78 },
      { name: 'SQL Server', level: 68 },
    ],
  },
  {
    title: 'AI / ML / DevOps',
    icon: '🤖',
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'Gemini / Ollama LLMs', level: 78 },
      { name: 'MLflow / Airflow', level: 72 },
      { name: 'Kubernetes', level: 65 },
      { name: 'CI/CD Pipelines', level: 70 },
      { name: 'Terraform', level: 58 },
    ],
  },
  {
    title: 'Mobile / Tools',
    icon: '📱',
    skills: [
      { name: 'Flutter', level: 72 },
      { name: 'React Native', level: 65 },
      { name: 'Git', level: 85 },
      { name: 'Figma', level: 70 },
      { name: 'Vercel', level: 80 },
    ],
  },
];

const ALSO_KNOW = [
  'Prometheus', 'Grafana', 'DVC', 'Dagshub', 'GitHub Actions', 'CML',
  'Whisper', 'scikit-learn', 'Swagger', 'Notion API', 'Slack API',
  'Leaflet.js', 'Framer Motion', 'Three.js', 'Vite', 'Tailwind CSS',
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <div className="section-label">Skills</div>
          <h2 className="section-title">
            What I actually know.
          </h2>
          <p className="section-desc">
            Honest self-assessment. No fake 100% bars.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
          marginBottom: 48,
        }}>
          {CATEGORIES.map(cat => (
            <div
              key={cat.title}
              className="card"
              style={{ padding: '24px 22px' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 20,
              }}>
                <span style={{ fontSize: '1.2rem' }}>{cat.icon}</span>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{cat.title}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {cat.skills.map(skill => (
                  <div key={skill.name}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                    }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                        {skill.name}
                      </span>
                      <span style={{
                        fontSize: '0.68rem',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                      }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div style={{
                      height: 4,
                      borderRadius: 2,
                      background: 'rgba(255,255,255,0.04)',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${skill.level}%`,
                        borderRadius: 2,
                        background: skill.level > 80
                          ? 'var(--accent)'
                          : skill.level > 65
                            ? 'rgba(212,255,87,0.6)'
                            : 'rgba(212,255,87,0.35)',
                        transition: 'width 1s ease',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Also know */}
        <div>
          <div style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: 16,
            fontFamily: 'var(--font-mono)',
          }}>
            Also familiar with
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {ALSO_KNOW.map(tech => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
