import React, { useState } from 'react';

const FOOTER_NAV = [
  {
    heading: 'Products',
    items: [
      { label: 'NetBox Community', href: '/docs/netbox/latest/' },
      { label: 'NetBox Cloud',     href: '/docs/cloud/latest/' },
      { label: 'NetBox Enterprise',href: '/docs/enterprise/latest/' },
      { label: 'Discovery',        href: '/docs/discovery/latest/' },
      { label: 'Assurance',        href: '/docs/assurance/latest/' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { label: 'Documentation', href: '/' },
      { label: 'GitHub',        href: 'https://github.com/netbox-community/netbox' },
      { label: 'Community Slack', href: 'https://netdev.chat/' },
      { label: 'Blog',          href: 'https://netboxlabs.com/blog/' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About',    href: 'https://netboxlabs.com/about/' },
      { label: 'Careers',  href: 'https://netboxlabs.com/careers/' },
      { label: 'Contact',  href: 'https://netboxlabs.com/contact/' },
      { label: 'Privacy',  href: 'https://netboxlabs.com/privacy/' },
    ],
  },
];

export default function Footer(): React.ReactElement {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <footer
      style={{
        background: '#02060a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '4rem 1.5rem 2.5rem',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: '#b3b6b7',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Blurred background pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 40% at 80% 100%, rgba(0,242,212,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '76rem', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-between', marginBottom: '3rem' }}>

          {/* Left — newsletter + community */}
          <div style={{ minWidth: '14rem', maxWidth: '18rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#6e7578', marginBottom: '1rem', lineHeight: 1.5 }}>
              Join the <span style={{ color: '#fff' }}>NetBox Labs community.</span>
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem',
                              borderBottom: '1px solid #3f4243', paddingBottom: '0.5rem' }}>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{
                      flex: 1, background: 'transparent', border: 'none', outline: 'none',
                      color: '#fff', fontSize: '0.8125rem',
                    }}
                  />
                  <button type="submit" aria-label="Subscribe"
                          style={{ background: 'none', border: 'none', cursor: 'pointer',
                                   color: '#6e7578', fontSize: '1rem' }}>
                    →
                  </button>
                </div>
              </form>
            ) : (
              <p style={{ fontSize: '0.8125rem', color: '#00f2d4' }}>Thanks for subscribing!</p>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: 'Slack', sub: 'NetDev Slack', href: 'https://netdev.chat/' },
                { label: 'GitHub', sub: 'netbox-community', href: 'https://github.com/netbox-community/netbox' },
              ].map(link => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                   style={{
                     display: 'flex', alignItems: 'center', gap: '0.6rem',
                     padding: '0.5rem 0.75rem', borderRadius: '6px',
                     border: '1px solid rgba(255,255,255,0.1)',
                     background: '#090b0b', color: '#b3b6b7',
                     textDecoration: 'none', fontSize: '0.8125rem',
                     transition: 'box-shadow 0.2s',
                   }}
                   onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px rgba(0,242,212,0.2)')}
                   onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = 'none')}
                >
                  <strong style={{ color: '#fff' }}>{link.label}</strong>
                  <span style={{ color: '#6e7578' }}>{link.sub}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — nav columns */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', flex: 1, justifyContent: 'flex-end' }}>
            {FOOTER_NAV.map(section => (
              <div key={section.heading} style={{ minWidth: '8rem' }}>
                <p style={{ fontWeight: 600, color: '#fff', fontSize: '0.8125rem',
                             marginBottom: '0.75rem', textTransform: 'uppercase',
                             letterSpacing: '0.06em' }}>
                  {section.heading}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {section.items.map(item => (
                    <li key={item.href}>
                      <a href={item.href}
                         style={{ color: '#b3b6b7', fontSize: '0.8125rem', textDecoration: 'none',
                                  transition: 'color 0.15s' }}
                         onMouseEnter={e => ((e.target as HTMLElement).style.color = '#fff')}
                         onMouseLeave={e => ((e.target as HTMLElement).style.color = '#b3b6b7')}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '1.5rem',
          display: 'flex', flexWrap: 'wrap', gap: '1rem',
          alignItems: 'center', justifyContent: 'space-between',
          fontSize: '0.75rem', color: '#525759',
        }}>
          <span>© {new Date().getFullYear()} NetBox Labs, Inc.</span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://netboxlabs.com/privacy/" style={{ color: '#525759', textDecoration: 'none' }}>Privacy</a>
            <a href="https://netboxlabs.com/terms/"   style={{ color: '#525759', textDecoration: 'none' }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
