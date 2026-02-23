import React, { useState } from 'react';

const NAV_ITEMS = [
  { label: 'Products', href: 'https://netboxlabs.com/products/' },
  { label: 'Solutions', href: 'https://netboxlabs.com/solutions/' },
  { label: 'Pricing', href: 'https://netboxlabs.com/pricing/' },
  { label: 'Community', href: 'https://netboxlabs.com/community/' },
  { label: 'Blog', href: 'https://netboxlabs.com/blog/' },
];

export default function Header(): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="custom-header"
      style={{
        position: 'sticky', top: 0, zIndex: 101,
        height: 'var(--ifm-navbar-height)',
        background: '#02060a',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center',
        width: '100%',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          maxWidth: '76rem', margin: '0 auto', padding: '0 1.5rem',
          width: '100%',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          aria-label="NetBox Labs Documentation Home"
          style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}
        >
          {/* Inline SVG wordmark placeholder — swap for actual logo asset */}
          <svg width="130" height="21" viewBox="0 0 130 21" fill="none" aria-hidden="true">
            <text x="0" y="16" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="14"
                  fontWeight="700" fill="#00f2d4">
              NetBox Labs
            </text>
            <text x="85" y="16" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11"
                  fontWeight="500" fill="#6e7578">
              Docs
            </text>
          </svg>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
             className="desktop-nav">
          {NAV_ITEMS.map(item => (
            <a
              key={item.label}
              href={item.href}
              style={{
                color: '#b3b6b7', fontSize: '0.875rem', fontWeight: '500',
                padding: '0.375rem 0.75rem', borderRadius: '6px',
                textDecoration: 'none', transition: 'color 0.15s',
              }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = '#fff')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = '#b3b6b7')}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href="https://netboxlabs.com/free-netbox-cloud/"
            style={{
              background: '#00f2d4', color: '#001423',
              fontSize: '0.8125rem', fontWeight: '700',
              padding: '0.4rem 1rem', borderRadius: '6px',
              textDecoration: 'none', whiteSpace: 'nowrap',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={e => ((e.target as HTMLElement).style.opacity = '1')}
          >
            Free Cloud
          </a>

          {/* Mobile burger */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#b3b6b7', display: 'none', padding: '0.4rem',
            }}
            className="burger-btn"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              {menuOpen ? (
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: '#02060a', borderBottom: '1px solid rgba(255,255,255,0.08)',
            padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem',
            zIndex: 200,
          }}
        >
          {NAV_ITEMS.map(item => (
            <a key={item.label} href={item.href}
               style={{ color: '#b3b6b7', fontSize: '0.9rem', fontWeight: '500',
                        padding: '0.5rem 0', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {item.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .burger-btn  { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
