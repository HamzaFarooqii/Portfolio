'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// ============ SNAKE GAME ============
type Pos = { x: number; y: number };
const GRID = 20;
const CELL = 18;

function SnakeGame() {
  const [snake, setSnake] = useState<Pos[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Pos>({ x: 5, y: 5 });
  const [dir, setDir] = useState<Pos>({ x: 1, y: 0 });
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [dead, setDead] = useState(false);
  const dirRef = useRef(dir);
  dirRef.current = dir;

  const reset = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDir({ x: 1, y: 0 });
    setScore(0);
    setDead(false);
    setRunning(true);
  };

  const randomFood = useCallback((s: Pos[]) => {
    let f: Pos;
    do { f = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }; }
    while (s.some(p => p.x === f.x && p.y === f.y));
    return f;
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const d = dirRef.current;
      if (e.key === 'ArrowUp' && d.y !== 1) setDir({ x: 0, y: -1 });
      if (e.key === 'ArrowDown' && d.y !== -1) setDir({ x: 0, y: 1 });
      if (e.key === 'ArrowLeft' && d.x !== 1) setDir({ x: -1, y: 0 });
      if (e.key === 'ArrowRight' && d.x !== -1) setDir({ x: 1, y: 0 });
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const head = { x: prev[0].x + dirRef.current.x, y: prev[0].y + dirRef.current.y };
        if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID || prev.some(p => p.x === head.x && p.y === head.y)) {
          setRunning(false);
          setDead(true);
          return prev;
        }
        const ate = head.x === food.x && head.y === food.y;
        const next = ate ? [head, ...prev] : [head, ...prev.slice(0, -1)];
        if (ate) {
          setScore(s => s + 10);
          setFood(randomFood(next));
        }
        return next;
      });
    }, 130);
    return () => clearInterval(interval);
  }, [running, food, randomFood]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: GRID * CELL, marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', fontSize: '0.85rem', fontWeight: 700 }}>
          🐍 SNAKE
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-yellow)', fontSize: '0.85rem' }}>
          Score: {score}
        </span>
      </div>
      <div style={{
        width: GRID * CELL,
        height: GRID * CELL,
        position: 'relative',
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(16,185,129,0.3)',
        borderRadius: 8,
        overflow: 'hidden',
      }}>
        {/* Grid dots */}
        {Array.from({ length: GRID * GRID }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: (i % GRID) * CELL + CELL / 2 - 1,
            top: Math.floor(i / GRID) * CELL + CELL / 2 - 1,
            width: 2,
            height: 2,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
          }} />
        ))}
        {/* Food */}
        <div style={{
          position: 'absolute',
          left: food.x * CELL + 2,
          top: food.y * CELL + 2,
          width: CELL - 4,
          height: CELL - 4,
          background: '#ef4444',
          borderRadius: '50%',
          boxShadow: '0 0 8px #ef444480',
        }} />
        {/* Snake */}
        {snake.map((p, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: p.x * CELL + 1,
            top: p.y * CELL + 1,
            width: CELL - 2,
            height: CELL - 2,
            background: i === 0 ? '#10b981' : '#059669',
            borderRadius: i === 0 ? 6 : 3,
            boxShadow: i === 0 ? '0 0 8px #10b98160' : 'none',
          }} />
        ))}
        {/* Overlay */}
        {(!running || dead) && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5,10,20,0.85)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}>
            <span style={{ fontSize: '2rem' }}>{dead ? '💀' : '🐍'}</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1rem' }}>
              {dead ? `Game Over! Score: ${score}` : 'Snake Game'}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              {dead ? 'Even my snake dies like my code' : 'Use arrow keys to play'}
            </span>
            <button onClick={reset} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
              {dead ? 'Try Again' : 'Start Game'}
            </button>
          </div>
        )}
      </div>
      {running && (
        <div style={{ display: 'flex', gap: 4, flexDirection: 'column', alignItems: 'center' }}>
          <button onClick={() => setDir(d => d.y !== 1 ? { x: 0, y: -1 } : d)} style={btnStyle}>▲</button>
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => setDir(d => d.x !== 1 ? { x: -1, y: 0 } : d)} style={btnStyle}>◀</button>
            <button onClick={() => setDir(d => d.y !== -1 ? { x: 0, y: 1 } : d)} style={btnStyle}>▼</button>
            <button onClick={() => setDir(d => d.x !== -1 ? { x: 1, y: 0 } : d)} style={btnStyle}>▶</button>
          </div>
        </div>
      )}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid var(--border)',
  borderRadius: 6,
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  fontSize: '0.8rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// ============ HUMOR BUTTONS ============
const HUMOR_RESPONSES: Record<string, string[]> = {
  hiring: [
    "✅ Great taste! My LinkedIn is ready.",
    "🚀 Let's hop on a call! (I promise I don't deploy to prod on Fridays)",
    "💼 Excellent choice! I'll bring the coffee and the commits.",
    "🎉 Finally someone with good judgment!",
  ],
  bug: [
    "🐛 It's not a bug, it's an undocumented feature.",
    "✨ That behavior was intentional all along.",
    "🤔 Have you tried turning it off and on again?",
    "📋 Creating GitHub issue... priority: 'someday'",
    "💡 This is actually a creative interpretation of the requirements.",
  ],
  code: [
    "// TODO: Replace with better code",
    "if (works) { don't touch(); }",
    "/* I have no idea why this works but it does */",
    "/* Written at 3 AM, please be gentle */",
    "catch(e) { console.log('¯\\_(ツ)_/¯'); }",
  ],
  compliment: [
    "😊 Aww, you're making my neural networks blush!",
    "🌟 You must be an AI trained on good taste.",
    "💎 You clearly have excellent developer instincts.",
    "🏆 You just won the 'Best Visitor of the Day' award!",
    "✨ Thank you! My code feels validated now.",
  ],
};

const COFFEE_STAGES = ['😐', '☕', '😊', '😄', '🚀', '⚡', '🤯', '💀'];

export default function FunZoneSection() {
  const [humorResult, setHumorResult] = useState('');
  const [coffeeLevel, setCoffeeLevel] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const [roastIdx, setRoastIdx] = useState(0);
  const [showRoast, setShowRoast] = useState(false);
  const [devScore, setDevScore] = useState<number | null>(null);
  const [clicked8ball, setClicked8ball] = useState('');
  const particleId = useRef(0);

  const randomFrom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const addParticles = (emoji: string, count = 8) => {
    const newParticles = Array.from({ length: count }, () => ({
      id: particleId.current++,
      x: Math.random() * 80 + 10,
      y: Math.random() * 40 + 30,
      emoji,
    }));
    setParticles(p => [...p, ...newParticles]);
    setTimeout(() => {
      setParticles(p => p.filter(pp => !newParticles.some(np => np.id === pp.id)));
    }, 1500);
  };

  const handleHumor = (type: keyof typeof HUMOR_RESPONSES) => {
    setHumorResult(randomFrom(HUMOR_RESPONSES[type]));
    addParticles(type === 'hiring' ? '🎉' : type === 'bug' ? '🐛' : type === 'code' ? '💻' : '⭐');
  };

  const addCoffee = () => {
    setCoffeeLevel(l => Math.min(l + 1, COFFEE_STAGES.length - 1));
    addParticles('☕', 5);
  };

  const DEV_ROASTS = [
    "Your code is so clean... said nobody ever.",
    "I debugged your code — it's just ASMR for the CPU.",
    "You commit directly to main. Bold. Stupid. Bold.",
    "Your variable names are so descriptive: x, xx, xxx...",
    "console.log everywhere — I respect the hustle.",
    "Your README says 'works on my machine'. Classic.",
    "You commented out old code instead of deleting it. Smart.",
    "Your function is 400 lines. God help us.",
  ];

  const EIGHT_BALL_ANSWERS = [
    "It is certain. 🎱", "Ask again later. 🤔", "My sources say no. ❌",
    "Yes, definitely! ✅", "Cannot predict now. 🔮", "Don't count on it. 😬",
    "Very doubtful. 😐", "Signs point to yes. 👍", "Better not tell you now. 🤫",
    "Outlook not so good. 😭", "It is decidedly so. 🎉", "Without a doubt. 💯",
  ];

  const DEV_QUIZ_Q = "Which of these is the correct way to exit Vim?";
  const DEV_QUIZ_A = [
    { text: ':q!', correct: true },
    { text: 'Alt + F4', correct: false },
    { text: 'Just close the terminal', correct: false },
    { text: 'Call someone who knows', correct: false },
  ];

  const [quizAns, setQuizAns] = useState<boolean | null>(null);

  return (
    <section id="fun" className="section">
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <div className="section-label">Fun Zone</div>
          <h2 className="section-title">
            Serious Dev, <span className="gradient-text-warm">Unserious Mode</span>
          </h2>
          <p className="section-desc">
            Because every portfolio needs a section that proves you&apos;re human and not an AI writing about another AI. Interact at your own risk. 🎮
          </p>
        </div>

        {/* Particles overlay */}
        <div style={{ position: 'relative' }}>
          {particles.map(p => (
            <div key={p.id} style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: '1.5rem',
              animation: 'particle-float 1.5s ease-out forwards',
              pointerEvents: 'none',
              zIndex: 10,
            }}>
              {p.emoji}
            </div>
          ))}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {/* Humor Buttons */}
            <div style={{
              padding: 28,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: '1.1rem' }}>
                🎭 Humor Buttons
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 20 }}>
                Press a button. I have a response for everything.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                {[
                  { label: '💼 "You\'re hired!"', type: 'hiring' as const, color: '#10b981' },
                  { label: '🐛 "Found a bug"', type: 'bug' as const, color: '#ef4444' },
                  { label: '👀 "Show me your code"', type: 'code' as const, color: '#3b82f6' },
                  { label: '😍 "You\'re amazing"', type: 'compliment' as const, color: '#f59e0b' },
                ].map(btn => (
                  <button
                    key={btn.type}
                    onClick={() => handleHumor(btn.type)}
                    style={{
                      padding: '10px 16px',
                      borderRadius: 8,
                      border: `1px solid ${btn.color}40`,
                      background: `${btn.color}10`,
                      color: btn.color,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                    }}
                    onMouseEnter={e => {
                      (e.target as HTMLElement).style.background = `${btn.color}20`;
                      (e.target as HTMLElement).style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={e => {
                      (e.target as HTMLElement).style.background = `${btn.color}10`;
                      (e.target as HTMLElement).style.transform = 'none';
                    }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
              {humorResult && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 8,
                  background: 'rgba(59,130,246,0.08)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  animation: 'fade-up 0.3s ease',
                }}>
                  {humorResult}
                </div>
              )}
            </div>

            {/* Coffee Level */}
            <div style={{
              padding: 28,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: '1.1rem' }}>
                ☕ Coffee Meter
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 24, lineHeight: 1.5 }}>
                See how Hamza&apos;s productivity scales with caffeine intake. Based on real data.*
                <br />
                <span style={{ fontSize: '0.7rem' }}>*not real data</span>
              </p>
              <div style={{ fontSize: '5rem', marginBottom: 16, transition: 'all 0.4s', animation: coffeeLevel > 5 ? 'bounce-soft 0.5s infinite' : 'none' }}>
                {COFFEE_STAGES[coffeeLevel]}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                  Caffeine Level: {coffeeLevel}/{COFFEE_STAGES.length - 1}
                </div>
                <div style={{ height: 8, width: 200, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${(coffeeLevel / (COFFEE_STAGES.length - 1)) * 100}%`,
                    background: `linear-gradient(90deg, #f59e0b, ${coffeeLevel > 5 ? '#ef4444' : '#fb923c'})`,
                    borderRadius: 4,
                    transition: 'all 0.4s',
                  }} />
                </div>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 20, minHeight: 32 }}>
                {coffeeLevel === 0 && "Just woke up. Do not disturb."}
                {coffeeLevel === 1 && "First sip. Starting to feel human."}
                {coffeeLevel === 2 && "Okay, I can see the keyboard now."}
                {coffeeLevel === 3 && "Writing clean code. Magic!"}
                {coffeeLevel === 4 && "Git commits are on fire 🔥"}
                {coffeeLevel === 5 && "Building entire apps in one hour."}
                {coffeeLevel === 6 && "I AM THE CODE."}
                {coffeeLevel === 7 && "PLEASE SEND HELP I CANNOT STOP TYPING"}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={addCoffee} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                  ☕ Add Coffee
                </button>
                <button onClick={() => setCoffeeLevel(0)} className="btn-ghost" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  Reset
                </button>
              </div>
            </div>

            {/* 8 Ball */}
            <div style={{
              padding: 28,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: '1.1rem' }}>
                🎱 Developer 8-Ball
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 20 }}>
                Ask a dev question. Receive wisdom. (Results may vary.)
              </p>
              <div style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #374151, #111827)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: clicked8ball ? '0 0 30px rgba(139,92,246,0.4)' : '0 8px 30px rgba(0,0,0,0.5)',
                border: '3px solid rgba(139,92,246,0.3)',
              }}
              onClick={() => {
                setClicked8ball(randomFrom(EIGHT_BALL_ANSWERS));
                addParticles('🎱', 4);
              }}
              >
                {clicked8ball ? (
                  <div style={{ padding: 8, textAlign: 'center', color: 'white', fontWeight: 700, fontSize: '0.7rem', lineHeight: 1.4 }}>
                    {clicked8ball}
                  </div>
                ) : (
                  <span style={{ fontSize: '3rem' }}>8</span>
                )}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                {clicked8ball ? 'Tap again for another prophecy' : 'Tap the ball ↑'}
              </p>
            </div>

            {/* Dev Quiz */}
            <div style={{
              padding: 28,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: '1.1rem' }}>
                🧠 Dev IQ Test
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 20 }}>
                One question. This determines your worth as a developer.
              </p>
              <div style={{
                padding: '14px 16px',
                borderRadius: 8,
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.2)',
                marginBottom: 16,
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                fontWeight: 500,
              }}>
                Q: {DEV_QUIZ_Q}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {DEV_QUIZ_A.map((a) => (
                  <button
                    key={a.text}
                    onClick={() => { setQuizAns(a.correct); setDevScore(a.correct ? 100 : 0); addParticles(a.correct ? '✅' : '❌', 6); }}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: `1px solid ${quizAns === null ? 'var(--border)' : a.correct ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.3)'}`,
                      background: quizAns === null ? 'transparent' : a.correct ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.05)',
                      color: quizAns === null ? 'var(--text-secondary)' : a.correct ? '#10b981' : 'var(--text-muted)',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      fontFamily: a.text.startsWith(':') ? 'var(--font-mono)' : 'inherit',
                    }}
                  >
                    {a.text}
                  </button>
                ))}
              </div>
              {devScore !== null && (
                <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 8, background: devScore > 0 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${devScore > 0 ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}` }}>
                  <span style={{ color: devScore > 0 ? '#10b981' : '#ef4444', fontSize: '0.875rem', fontWeight: 700 }}>
                    {devScore > 0 ? "🎉 Correct! You may use Vim. Welcome to the club." : "😬 Wrong. Google it. We'll wait."}
                  </span>
                </div>
              )}
            </div>

            {/* Dev Roast */}
            <div style={{
              padding: 28,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: '1.1rem' }}>
                🔥 Roast My Code
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 20 }}>
                Honest feedback, delivered with love. Mostly love.
              </p>
              <div style={{
                padding: '20px',
                borderRadius: 8,
                background: 'rgba(249,115,22,0.06)',
                border: '1px solid rgba(249,115,22,0.2)',
                marginBottom: 20,
                minHeight: 70,
                display: 'flex',
                alignItems: 'center',
              }}>
                {showRoast ? (
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.6, animation: 'fade-up 0.3s ease' }}>
                    🔥 {DEV_ROASTS[roastIdx]}
                  </p>
                ) : (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                    Click the button. I dare you.
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  setShowRoast(true);
                  setRoastIdx(Math.floor(Math.random() * DEV_ROASTS.length));
                  addParticles('🔥', 6);
                }}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: '1px solid rgba(249,115,22,0.4)',
                  background: 'rgba(249,115,22,0.1)',
                  color: '#fb923c',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.target as HTMLElement).style.background = 'rgba(249,115,22,0.2)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.background = 'rgba(249,115,22,0.1)'; }}
              >
                🔥 Roast Me
              </button>
            </div>

            {/* Snake Game */}
            <div style={{
              padding: 28,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <h3 style={{ fontWeight: 700, marginBottom: 4, fontSize: '1.1rem', textAlign: 'center' }}>
                🐍 Snake Game
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: 20, textAlign: 'center' }}>
                The only snake that&apos;s more reliable than my Python scripts.
              </p>
              <SnakeGame />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
