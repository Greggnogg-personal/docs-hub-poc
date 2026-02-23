import React from 'react';
import Layout from '@theme/Layout';
import LandingPageSearch from '../components/LandingPageSearch';
import styles from './index.module.css';

const PRODUCTS = [
  {
    title: 'NetBox Community',
    description: "The world's leading network source of truth. Model, document, and automate your infrastructure with the open-source edition.",
    href: '/docs/netbox/latest/',
    badge: 'community',
    badgeLabel: 'Community',
    color: '#00f2d4',
  },
  {
    title: 'NetBox Cloud',
    description: 'Fully managed SaaS. Zero infrastructure overhead — always up-to-date, globally available, enterprise-grade.',
    href: '/docs/cloud/latest/',
    badge: 'cloud',
    badgeLabel: 'Cloud',
    color: '#7ab8ff',
  },
  {
    title: 'NetBox Enterprise',
    description: 'Self-hosted, production-hardened distribution with SSO, HA clustering, audit logging, and dedicated support.',
    href: '/docs/enterprise/latest/',
    badge: 'enterprise',
    badgeLabel: 'Enterprise',
    color: '#b09dff',
  },
  {
    title: 'Discovery',
    description: 'Automatically map and import your network infrastructure into NetBox via multi-vendor agent-based scanning.',
    href: '/docs/discovery/latest/',
    badge: 'community',
    badgeLabel: 'Community · Enterprise · Cloud',
    color: '#00f2d4',
  },
];

const QUICK_LINKS = [
  { label: 'Installation Guide',     href: '/docs/netbox/latest/getting-started/installation/' },
  { label: 'Docker Setup',           href: '/docs/netbox/latest/getting-started/docker/' },
  { label: 'Create a Cloud Instance',href: '/docs/cloud/latest/instance-management/create/' },
  { label: 'Discovery Quick Start',  href: '/docs/discovery/latest/getting-started/quick-start/' },
  { label: 'REST API Reference',     href: '/docs/netbox/latest/features/ipam/' },
  { label: 'Configure SSO',          href: '/docs/enterprise/latest/features/sso/' },
];

export default function Home(): React.ReactElement {
  return (
    <Layout
      title="NetBox Labs Documentation"
      description="Documentation for NetBox, NetBox Cloud, NetBox Enterprise, and Discovery"
    >
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>NetBox Labs Docs</p>
          <h1 className={styles.heroTitle}>
            The network source of truth.<br />
            <span className={styles.heroAccent}>Now fully documented.</span>
          </h1>
          <p className={styles.heroSub}>
            Find guides, API references, and tutorials for every product in the NetBox ecosystem.
          </p>
          <LandingPageSearch />
        </div>

        {/* Decorative gradient blob */}
        <div className={styles.heroBlob} aria-hidden="true" />
      </section>

      {/* Product grid */}
      <section className={styles.products}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeading}>Product Documentation</h2>

          <div className={styles.productGrid}>
            {PRODUCTS.map(p => (
              <a key={p.href} href={p.href} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles[`pill-${p.badge}`]}>{p.badgeLabel}</span>
                </div>
                <h3 className={styles.cardTitle} style={{ color: p.color }}>
                  {p.title}
                </h3>
                <p className={styles.cardDesc}>{p.description}</p>
                <span className={styles.cardCta} style={{ color: p.color }}>
                  View docs →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className={styles.quickLinks}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeading}>Popular Pages</h2>
          <ul className={styles.quickList}>
            {QUICK_LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href} className={styles.quickLink}>
                  {l.label}
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Community CTA */}
      <section className={styles.community}>
        <div className={styles.sectionInner}>
          <h2 className={styles.communityTitle}>Join the Community</h2>
          <p className={styles.communitySub}>
            Thousands of network engineers use NetBox every day. Get help, share ideas, and contribute.
          </p>
          <div className={styles.communityLinks}>
            <a href="https://netdev.chat/" target="_blank" rel="noopener noreferrer"
               className={styles.communityBtn}>
              Slack — NetDev Chat
            </a>
            <a href="https://github.com/netbox-community/netbox" target="_blank" rel="noopener noreferrer"
               className={styles.communityBtnOutline}>
              GitHub
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
