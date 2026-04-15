'use client';

type Skill = {
  name: string;
  level: number;
  icon: string;
  color: string;
};

type Category = {
  title: string;
  emoji: string;
  color: string;
  skills: Skill[];
};

const SKILL_CATEGORIES: Category[] = [
  {
    title: 'Languages',
    emoji: '💬',
    color: '#3b82f6',
    skills: [
      { name: 'Python', level: 90, icon: '🐍', color: '#3b82f6' },
      { name: 'C#', level: 80, icon: '#️⃣', color: '#a78bfa' },
      { name: 'JavaScript', level: 70, icon: '⚡', color: '#f59e0b' },
      { name: 'TypeScript', level: 62, icon: '📘', color: '#3b82f6' },
      { name: 'SQL', level: 75, icon: '🛢️', color: '#06b6d4' },
    ],
  },
  {
    title: 'AI / ML',
    emoji: '🧠',
    color: '#8b5cf6',
    skills: [
      { name: 'Google Gemini API', level: 85, icon: '✨', color: '#8b5cf6' },
      { name: 'OpenAI Whisper', level: 80, icon: '🎤', color: '#ec4899' },
      { name: 'Scikit-learn', level: 72, icon: '📊', color: '#06b6d4' },
      { name: 'LLM Prompting', level: 88, icon: '💬', color: '#a78bfa' },
      { name: 'Embeddings', level: 70, icon: '🔢', color: '#10b981' },
    ],
  },
  {
    title: 'Frameworks',
    emoji: '⚙️',
    color: '#06b6d4',
    skills: [
      { name: 'FastAPI', level: 85, icon: '⚡', color: '#06b6d4' },
      { name: 'Flask', level: 80, icon: '🍶', color: '#10b981' },
      { name: 'Next.js', level: 65, icon: '▲', color: '#f1f5f9' },
      { name: '.NET WinForms', level: 75, icon: '🪟', color: '#a78bfa' },
      { name: 'React', level: 65, icon: '⚛️', color: '#3b82f6' },
    ],
  },
  {
    title: 'Tools & Platforms',
    emoji: '🛠️',
    color: '#f97316',
    skills: [
      { name: 'Git & GitHub', level: 85, icon: '🐙', color: '#f97316' },
      { name: 'Vercel', level: 80, icon: '▲', color: '#f1f5f9' },
      { name: 'SQL Server', level: 78, icon: '🛢️', color: '#06b6d4' },
      { name: 'Slack API', level: 75, icon: '💬', color: '#4ade80' },
      { name: 'Notion API', level: 72, icon: '📝', color: '#f1f5f9' },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <div className="section-label">Skills</div>
          <h2 className="section-title">
            What I Actually <span className="gradient-text">Know</span>
          </h2>
          <p className="section-desc">
            These are real skill levels, not the LinkedIn where everyone is &quot;Expert&quot; at everything.
            The percentages represent my honest self-assessment (and my therapist agrees).
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {SKILL_CATEGORIES.map(category => (
            <SkillCategory key={category.title} category={category} />
          ))}
        </div>

        {/* Additional tech list */}
        <div style={{ marginTop: 60 }}>
          <div style={{
            padding: 32,
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20, fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
              // Also familiar with
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                'Pydantic', 'APScheduler', 'Leaflet.js', 'Telegram Bot API', 'HTML/CSS',
                'CartoDB', 'MSBuild', 'localdb', 'python-multipart', 'Swagger UI',
                'Agglomerative Clustering', 'REST APIs', 'JSON Schema', 'Git Hooks',
                'CSS Glassmorphism', 'MediaRecorder API', 'WebSockets (learning)',
              ].map(tech => (
                <span key={tech} className="tag tag-blue" style={{ cursor: 'default' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCategory({ category }: { category: Category }) {
  return (
    <div style={{
      padding: 28,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      transition: 'all 0.3s',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLElement).style.borderColor = `${category.color}40`;
      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${category.color}10`;
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
    }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <span style={{ fontSize: '1.3rem' }}>{category.emoji}</span>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: category.color }}>
          {category.title}
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {category.skills.map(skill => (
          <SkillBar key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
}

function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
          <span>{skill.icon}</span>
          {skill.name}
        </span>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: skill.color, fontFamily: 'var(--font-mono)' }}>
          {skill.level}%
        </span>
      </div>
      <div style={{
        height: 6,
        borderRadius: 3,
        background: 'rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}>
        <div
          style={{
            height: '100%',
            width: `${skill.level}%`,
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
            borderRadius: 3,
            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: `0 0 8px ${skill.color}60`,
          }}
        />
      </div>
    </div>
  );
}
