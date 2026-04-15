'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#fun', label: 'Fun Zone' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (const s of sections.reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(s);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '0 24px',
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(10,10,10,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}>
          {/* Logo */}
          <a href="#hero" style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '1rem',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{
              display: 'inline-flex',
              width: 32,
              height: 32,
              background: 'var(--accent)',
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              fontWeight: 900,
              color: '#0a0a0a',
            }}>H</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Hamza<span style={{ color: 'var(--accent)' }}>.</span></span>
          </a>

          {/* Desktop links */}
          <ul style={{
            display: 'flex',
            gap: 4,
            listStyle: 'none',
            alignItems: 'center',
          }} className="desktop-nav">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: active === link.href.replace('#', '') ? 'var(--accent)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    background: active === link.href.replace('#', '') ? 'rgba(212,255,87,0.06)' : 'transparent',
                    display: 'block',
                  }}
                  onMouseEnter={e => {
                    const t = e.target as HTMLElement;
                    t.style.color = 'var(--text-primary)';
                    t.style.background = 'rgba(255,255,255,0.04)';
                  }}
                  onMouseLeave={e => {
                    const t = e.target as HTMLElement;
                    t.style.color = active === link.href.replace('#', '') ? 'var(--accent)' : 'var(--text-secondary)';
                    t.style.background = active === link.href.replace('#', '') ? 'rgba(212,255,87,0.06)' : 'transparent';
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.85rem' }}
              >
                Hire me
              </a>
            </li>
          </ul>

          {/* Mobile menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              padding: '8px',
              borderRadius: 8,
              cursor: 'pointer',
              display: 'none',
              flexDirection: 'column',
              gap: 5,
              width: 40,
              alignItems: 'center',
            }}
            aria-label="Toggle menu"
          >
            <span style={{ display: 'block', width: 20, height: 2, background: 'currentColor', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: 20, height: 2, background: 'currentColor', borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
            <span style={{ display: 'block', width: 20, height: 2, background: 'currentColor', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 64,
          left: 0,
          right: 0,
          background: 'rgba(5, 10, 20, 0.97)',
          backdropFilter: 'blur(20px)',
          zIndex: 49,
          borderBottom: '1px solid var(--border)',
          padding: '16px 24px',
          animation: 'fade-up 0.2s ease',
        }}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '12px 0',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
                fontWeight: 500,
                fontSize: '1rem',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
