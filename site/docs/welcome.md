---
title: NetBox Labs Documentation
description: Complete documentation for NetBox - the leading network management platform
hide_table_of_contents: true
sidebar_class_name: hidden
displayed_sidebar: null
source: localdocs
lastUpdatedAt: 1756904693000
canonical: /docs/welcome/
---

<div className="landing-page">

<div className="main-title">
  <h1>NetBox Labs Documentation</h1>
</div>

<div className="products-header">
  <h2>Product Documentation</h2>
</div>

<div className="products-grid">
  <div className="product-card" role="article" aria-labelledby="netbox-title">
    <h3 id="netbox-title" style={{color: '#00f2d4'}}>NetBox</h3>
    <p>The world's leading network source of truth. Model, document, and automate your infrastructure.</p>
    <nav className="platform-links" aria-label="NetBox platform options">
      <a href="../netbox/?focus=community" aria-label="Access NetBox Community documentation" style={{color: '#00f2d4'}}>Community →</a>
      <a href="../enterprise/enterprise-features/nbe-overview?focus=enterprise" aria-label="Access NetBox Enterprise documentation" style={{color: '#00f2d4'}}>Enterprise →</a>
      <a href="../cloud/?focus=cloud" aria-label="Access NetBox Cloud documentation" style={{color: '#00f2d4'}}>Cloud →</a>
    </nav>
  </div>

  <div className="product-card" role="article" aria-labelledby="discovery-title">
    <h3 id="discovery-title" style={{color: '#00f2d4'}}>Discovery</h3>
    <p>Automatically map your networks and infrastructure. Accelerate documentation and streamline operations.</p>
    <nav className="platform-links" aria-label="Discovery platform options">
      <a href="../diode/?focus=community" aria-label="Access Discovery Community documentation" style={{color: '#00f2d4'}}>Community →</a>
      <a href="../discovery/?focus=enterprise" aria-label="Access Discovery Enterprise documentation" style={{color: '#00f2d4'}}>Enterprise →</a>
      <a href="../discovery/?focus=cloud" aria-label="Access Discovery Cloud documentation" style={{color: '#00f2d4'}}>Cloud →</a>
    </nav>
  </div>

  <div className="product-card" role="article" aria-labelledby="assurance-title">
    <h3 id="assurance-title" style={{color: '#00f2d4'}}>Assurance</h3>
    <p>Find and fix operational drift. Continuously monitor and detect deviations in your infrastructure.</p>
    <nav className="platform-links" aria-label="Assurance platform options">
      <a href="../diode/?focus=community" aria-label="Access Assurance Community documentation" style={{color: '#00f2d4'}}>Community →</a>
      <a href="../assurance/?focus=enterprise" aria-label="Access Assurance Enterprise documentation" style={{color: '#00f2d4'}}>Enterprise →</a>
      <a href="../assurance/?focus=cloud" aria-label="Access Assurance Cloud documentation" style={{color: '#00f2d4'}}>Cloud →</a>
    </nav>
  </div>

</div>

<div className="platform-overview-header extra-top-margin">
  <h2>The Premier Network and Infrastructure Management Platform</h2>
  <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">NetBox is the world's most popular platform for understanding, operating, automating, and securing networks. More than a documentation tool, NetBox is the central nervous system of your entire infrastructure. Run your network as intended with full visibility, streamlined documentation, and automation workflows.</p>
</div>

<div className="dashboard-preview">
        <img src="../img/home-dark.png" alt="NetBox Dashboard" className="dashboard-image" />
</div>

<div className="features-grid">
  <div className="feature-card">
    <h3 style={{color: '#00f2d4'}}>Network Source of Truth</h3>
    <p>Model your entire network infrastructure with precision. Track devices, connections, IP addresses, and more in a single, authoritative database.</p>
  </div>
  
  <div className="feature-card">
    <h3 style={{color: '#ffac00'}}>Automation Ready</h3>
    <p>REST API and GraphQL endpoints enable seamless integration with your automation tools. Generate configurations, provision services, and maintain compliance.</p>
  </div>
  
  <div className="feature-card">
    <h3 style={{color: '#00bee0'}}>Enterprise Scale</h3>
    <p>From startups to Fortune 500 companies, NetBox scales with your organization. Cloud, on-premises, or hybrid deployments available.</p>
  </div>
  
  <div className="feature-card">
    <h3 style={{color: '#00f2d4'}}>Open & Extensible</h3>
    <p>Built on open standards with a thriving plugin ecosystem. Customize and extend NetBox to meet your unique requirements.</p>
  </div>
</div>

</div>

<style>{`
/* Brand compliance: Plus Jakarta Sans font and Rich Black background */
:root {
  --ifm-font-family-base: 'Plus Jakarta Sans', sans-serif;
  --ifm-font-family-monospace: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  --ifm-background-color: #001423;
  --ifm-font-color-base: #ffffff;
}

html, body {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  background-color: #001423 !important;
  color: #ffffff !important;
}

/* Brand-compliant gradient using Bright Teal */
.bg-netbox-brand {
  background: linear-gradient(to right, #00f2d4, #00d9be);
}

/* Aggressively hide all possible page title variations, except our main title */
.theme-doc-markdown h1:first-child:not(.main-title h1),
.theme-doc-markdown > h1:first-child:not(.main-title h1),
article h1:first-child:not(.main-title h1),
article > h1:first-child:not(.main-title h1),
article header h1:not(.main-title h1),
article > header h1:not(.main-title h1),
.markdown h1:first-child:not(.main-title h1),
.markdown > h1:first-child:not(.main-title h1),
h1[class*="title"]:not(.main-title h1) {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* Ensure our main title is always visible */
.main-title h1 {
  display: block !important;
  visibility: visible !important;
  height: auto !important;
}

.landing-page {
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .landing-page {
    padding: 0 0.5rem;
  }
}

.main-title {
  text-align: center;
  margin: 2rem 0 3rem 0;
  padding: 0;
}

.main-title h1 {
  font-size: 3rem;
  font-weight: 800;
  margin: 0;
  color: #ffffff;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.products-header {
  text-align: center;
  margin: 2rem 0 2rem 0;
  padding: 0;
}

.products-header h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 300px);
  gap: 1.25rem;
  margin: 2rem 0;
  padding: 0;
  min-width: 0;
  justify-content: center;
  max-width: 100%;
  width: 100%;
}

/* Ensure tiles never overflow on any screen size */
@media (max-width: 1000px) {
  .products-grid {
    grid-template-columns: repeat(3, 280px);
    gap: 1rem;
  }
}

@media (max-width: 900px) {
  .products-grid {
    grid-template-columns: repeat(2, 280px);
    gap: 1rem;
  }
}

@media (max-width: 600px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 100%;
    margin: 2rem 0;
  }
  
  .landing-page {
    padding: 0 1rem;
  }
  
  .products-header,
  .products-grid,
  .search-section,
  .platform-header,
  .platform-description,
  .features-grid,
  .resources-header,
  .resources-grid {
    padding: 0;
  }
}

.product-card {
  background: #001423;
  border: 1px solid #ffffff;
  border-radius: 12px;
  padding: 1.25rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 300px;
  max-width: 100%;
}

@media (max-width: 600px) {
  .product-card {
    max-width: 100%;
    width: 100%;
  }
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
  background: #001423;
  border-color: #ffffff;
}

.product-card h3 {
  margin: 0 0 0.75rem 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.product-card p {
  margin: 0 0 1rem 0;
  color: #ffffff;
  line-height: 1.4;
  font-size: 1rem;
  flex-grow: 1;
  font-weight: 500;
}

.platform-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: auto;
}

.platform-links a {
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.125rem 0;
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.platform-links a:hover {
  text-decoration: underline;
}

.platform-link {
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.125rem 0;
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.platform-link:hover {
  text-decoration: underline;
}

.platform-link.community {
  color: #10b981;
}

.platform-link.enterprise {
  color: #f59e0b;
}

.platform-link.cloud {
  color: #3b82f6;
}

.platform-link.coming-soon {
  color: #f59e0b;
}

.platform-tag {
  font-size: 1rem;
  font-weight: 500;
  padding: 0.125rem 0;
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.platform-tag.unavailable {
  color: #94a3b8;
}

.platform-tag.coming-soon {
  color: #f59e0b;
}

.search-section {
  text-align: center;
  margin: 1rem 0 3rem 0;
  padding: 0;
  background: transparent;
}

.search-container {
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.platform-header {
  text-align: left;
  margin: 4rem 0 2rem 0;
  padding: 0;
}

.platform-header h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Platform Documentation Grid */
.platform-grid {
  display: grid;
  grid-template-columns: repeat(3, 260px);
  gap: 1.25rem;
  margin: 2rem 0;
  padding: 0;
  min-width: 0;
  justify-content: center;
  max-width: none;
}

@media (max-width: 850px) {
  .platform-grid {
    grid-template-columns: repeat(2, 260px);
    max-width: calc(260px * 2 + 1.25rem);
  }
}

@media (max-width: 600px) {
  .platform-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 100%;
    margin: 2rem 0;
  }
}

.platform-card {
  background: #001423;
  border: 1px solid #ffffff;
  border-radius: 12px;
  padding: 1.25rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 260px;
  text-decoration: none;
  color: inherit;
}

.platform-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
  background: #001423;
  text-decoration: none;
  color: inherit;
  border-color: #ffffff;
}

.platform-card.community-card:hover {
  border-color: #ffffff;
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
}

.platform-card.enterprise-card:hover {
  border-color: #ffffff;
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
}

.platform-card.cloud-card:hover {
  border-color: #ffffff;
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
}

.platform-card h3 {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  text-align: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.platform-card p {
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.4;
  margin: 0;
  text-align: center;
  font-weight: 500;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

@media (max-width: 600px) {
  .platform-card {
    max-width: 100%;
    min-width: auto;
  }
}

/* Platform Header and Description */
.platform-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem auto;
}

/* Platform Overview Section with Tailwind-style classes */
.text-center {
  text-align: center;
}

.mb-1 {
  margin-bottom: 0.25rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}

.font-bold {
  font-weight: 800;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.text-white {
  color: #ffffff;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-gray-300 {
  color: #ffffff;
  font-weight: 500;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.max-w-4xl {
  max-width: 56rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.leading-relaxed {
  line-height: 1.625;
}

.w-16 {
  width: 4rem;
}

.h-1 {
  height: 0.25rem;
}

.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.from-teal-400 {
  --tw-gradient-from: #00f2d4;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(0, 242, 212, 0));
}

.to-blue-500 {
  --tw-gradient-to: #00d9be;
}

.rounded-full {
  border-radius: 9999px;
}

/* Platform Overview Container */
.platform-overview {
  text-align: center;
  margin: 3rem 0 2rem 0;
  padding: 0;
}

.platform-overview-header {
  text-align: center;
  margin: 3rem 0 2rem 0;
  padding: 0;
}

.platform-overview-header h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #ffffff;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.platform-overview-header p {
  color: #ffffff;
  font-size: 1.125rem;
  line-height: 1.625;
  margin: 0 auto;
  font-weight: 500;
  font-family: 'Plus Jakarta Sans', sans-serif;
  max-width: 56rem;
  text-align: center;
}

/* Search Input Utility Classes */
.block {
  display: block;
}

.w-full {
  width: 100%;
}

.pl-10 {
  padding-left: 2.5rem;
}

.pr-12 {
  padding-right: 3rem;
}

.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.bg-gray-800 {
  background-color: #1f2937;
}

.border {
  border-width: 1px;
  border-style: solid;
}

.border-gray-600 {
  border-color: #4b5563;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.placeholder-gray-400::placeholder {
  color: #9ca3af;
}

.focus\\:outline-none:focus {
  outline: none;
}

.focus\\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.focus\\:ring-blue-500:focus {
  --tw-ring-color: #3b82f6;
}

.focus\\:border-transparent:focus {
  border-color: transparent;
}

.transition-all {
  transition-property: all;
}

.duration-200 {
  transition-duration: 200ms;
}

.pt-8 {
  padding-top: 2rem;
}

.mt-4 {
  margin-top: 1rem;
}

.reduced-top-margin {
  margin-top: 1.5rem !important;
}

.extra-top-margin {
  margin-top: 4rem !important;
}

.dashboard-preview {
  margin: 2rem 0 4rem 0;
  text-align: center;
}

.dashboard-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Features Grid - Updated for square proportions and responsiveness */
.features-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(250px, 280px));
  gap: 1.25rem;
  margin: 2rem 0;
  padding: 0 1rem;
  min-width: 0;
  justify-content: center;
  max-width: 100%;
  box-sizing: border-box;
}

@media (max-width: 1200px) {
  .features-grid {
    grid-template-columns: repeat(4, minmax(220px, 260px));
    gap: 1rem;
    padding: 0 0.5rem;
  }
}

@media (max-width: 1000px) {
  .features-grid {
    grid-template-columns: repeat(2, minmax(250px, 280px));
    gap: 1.25rem;
    padding: 0 1rem;
  }
}

@media (max-width: 650px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 1rem;
    margin: 2rem 0;
  }
  
  .feature-card {
    width: 100%;
    max-width: 100%;
  }
}

.feature-card {
  background: #001423;
  border: 1px solid #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  min-height: 240px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  justify-content: flex-start;
  text-align: center;
  box-sizing: border-box;
}

.feature-card h3 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
}

.feature-card p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
  border-color: #ffffff;
}

/* Duplicate styling removed - using consolidated version above */

@media (max-width: 650px) {
  .feature-card {
    max-width: 100%;
    min-width: auto;
    min-height: 200px;
  }
  
  .feature-card h3 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }
  
  .feature-card p {
    font-size: 0.9rem;
    line-height: 1.4;
  }
}

.feature-link {
  color: var(--ifm-color-primary);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
}

.feature-link:hover {
  text-decoration: underline;
}

.resources-header {
  text-align: center;
  margin: 4rem 0 2rem 0;
  padding: 0 0.25rem;
}

.resources-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--ifm-font-color-base);
}

.resources-header p {
  font-size: 1.1rem;
  color: var(--ifm-color-content-secondary);
  margin: 0;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
  padding: 0 0.25rem;
}

.resource-card {
  background: #334155;
  border: 1px solid #475569;
  border-radius: 12px;
  padding: 2rem;
  transition: background-color 0.2s ease;
}

.resource-card:hover {
  background: #3f4a5e;
}

.resource-card h4 {
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  color: #ffffff;
  font-size: 1.25rem;
}

.resource-card p {
  margin: 0 0 1rem 0;
  color: #cbd5e1;
  font-size: 1rem;
}

.resource-link {
  color: var(--ifm-color-primary);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
}

.resource-link:hover {
  text-decoration: underline;
}

.community-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.community-link {
  color: var(--ifm-color-primary);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
}

.community-link:hover {
  text-decoration: underline;
}

.github-link {
  color: #94a3b8;
  font-size: 1rem;
  font-weight: 500;
}
`}</style>
