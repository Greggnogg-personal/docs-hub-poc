# Microsite & Pipeline UX — Consolidated Reference

**Version:** 1.0  
**Date:** February 19, 2026  
**Audience:** Engineering, Product, Stakeholders  
**Purpose:** Single reference document consolidating SOW requirements, existing-site analysis, and UX/pipeline recommendations for the new docs microsite. Intended to expand as pipeline integration work progresses.

---

## Table of Contents

1. [SOW — Goals & Scope](#sow--goals--scope)
2. [SOW — Specific Guidance (Grafana Alignment)](#sow--specific-guidance-grafana-alignment)
3. [Existing Site Analysis — netboxlabs-website-dochub](#existing-site-analysis--netboxlabs-website-dochub)
   - [Tech Stack](#tech-stack)
   - [Infrastructure & Build/Deploy](#infrastructure--builddeploy)
   - [UI/UX Layout & Visual Style](#uiux-layout--visual-style)
   - [Custom Theme Overrides](#custom-theme-overrides)
   - [Docs Markup & Content Conventions](#docs-markup--content-conventions)
   - [Search Architecture](#search-architecture)
   - [What Works — Keep](#what-works--keep)
   - [What Is Brittle — Replace](#what-is-brittle--replace)
4. [New Microsite Recommendations](#new-microsite-recommendations)
   - [IA & URL Structure](#ia--url-structure)
   - [Visual Style Replication Checklist](#visual-style-replication-checklist)
   - [Component Map](#component-map)
5. [Pipeline Integration Notes](#pipeline-integration-notes)

---

## SOW — Goals & Scope

> *Extracted verbatim from "Statement of Work - Documentation Site Improvements - unsigned.pdf"*

The goal is to **reduce build complexity, eliminate custom document rewriting and tagging scripts, and standardize documentation rendering** through the same frontend framework, routing, and styling system already used by the UI microsite.

Documentation content will be sourced directly from a clearly defined set of repositories or directories, with minimal preprocessing, and rendered using a consistent markdown/MDX pipeline that supports versioning, navigation, and basic metadata **without requiring bespoke transformation logic**.

The contractor will deliver a working implementation that includes:
- A clear content ingestion model
- A simplified build and local development workflow
- Documented guidelines for product teams/PMs/CS to add or update documentation

The solution must preserve essential capabilities such as:
- Hierarchical navigation
- Product/edition and version separation
- SEO-friendly URLs
- Last-updated metadata

While **removing** non-essential automation and brittle content rewrites.

Success is measured by:
- Reduced build time
- Fewer custom scripts
- Ability for internal teams to maintain and extend documentation using the existing UI microsite frontend with **minimal specialized knowledge**

---

## SOW — Specific Guidance (Grafana Alignment)

> *Extracted verbatim from SOW — "Specific Guidance" section*

**Simplify the existing approach.** It works but is brittle, flawed and overly complex. However it is integrated into our marketing site as we need it to be — to ensure the docs experience is cohesive with the main site's nav.

**Grafana's docs ([https://grafana.com/docs/](https://grafana.com/docs/)) are a very good inspiration. What they get right:**

- Tightly integrated with main marketing site — no change in nav, design, etc
- Strong front page / index and search make initial docs discovery easy
- Embeds related resources at bottom of docs pages, supporting demandgen efforts without interfering with the core docs experience
- Does not try to intermingle all docs into a single nav hierarchy — instead, leverages **two filters (product, version)** to determine appropriate docs and displays the nav for those docs
  - As a result, easy to discover docs for each product, and choose to view docs for historical versions where appropriate
  - **This is probably the most important problem we will need to solve** to support many products, with historical versions of docs for each product — we can follow Grafana's approach (which will require us to back off of the recent nav hierarchy work we've been doing)
- Consistent, clean URL hierarchy: `/docs/{product}/{version}/{section/page}` or similar

**Most important:**
- Stable/settled with scalability to more products and versions of docs without need for constant iteration on docs platform
- Processes for consistent management of docs and automated build/deploy of docs site

---

## Existing Site Analysis — netboxlabs-website-dochub

### Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Docs framework | Docusaurus 3.8 (classic preset) | TypeScript config; MDX + MD both enabled |
| Language | TypeScript + React 19 | Full TSX component model |
| Styling | Sass (SCSS) + Tailwind CSS 3 | Tailwind preflight disabled; SCSS for brand tokens |
| Font | Plus Jakarta Sans (body/UI) + OpenSauceTwo (nav) | Google Fonts; brand-required |
| Diagrams | Mermaid (via `@docusaurus/theme-mermaid`) | Enabled in markdown |
| Search | Algolia DocSearch | App ID: `XCF0TW7MCD`, Index: `netboxlabs` |
| Search (landing) | Custom Algolia lite client component | Separate from DocSearch modal |
| Node runtime | Node ≥ 24, Yarn 1.x | `.nvmrc` and `engines` enforced |
| Python | Python 3 | Used in transform/autodoc scripts |
| Package tooling | Lefthook, lint-staged, ESLint, Stylelint, Prettier | Pre-commit hooks |
| Quality | Vale (prose linting) | `.vale.ini` config; separate targets per product |

### Infrastructure & Build/Deploy

| Concern | Detail |
|---|---|
| Deployment | Vercel; production at `netboxlabs.com/docs/` |
| Base URL | Switches on `VERCEL_ENV`: production = `/docs/`, otherwise `/` |
| Preview/staging | Vercel preview deploys; `X-Robots-Tag: noindex` injected for non-production hosts |
| Redirects | `vercel.json` — extensive list of legacy URL redirects (600+ lines) |
| Docker | Multi-stage Dockerfile (deps → build → serve); mirrors CI; Node 24 + Python + Git + submodules |
| CI | GitHub Actions — submodule sync, auto-merge docs PRs, stale PR cleanup, Vale quality checks |
| Submodule sync | `update-submodules.yml` — scheduled hourly (business hours), every 6 hours off-hours |
| Auto-merge | `auto-merge-docs.yml` — Linear integration, quality checks, conflict detection |
| Cleanup | `cleanup-automated-prs.yml` — removes stale automated PRs |

**Build pipeline (current, runs on `yarn build`):**
```
git submodule update → fetch-options (API) → transform-docs (TS/Python scripts) → docusaurus build
```

Transform-docs includes: cleanup-duplicate-dirs, transform-and-tag-content, process-python-autodoc, tag-netbox-semantics, tag-console-semantics, transform-helm-docs, transform-copilot-docs, transform-mcp-docs, validate-all-tags — **this is the brittle step the SOW targets for replacement**.

### UI/UX Layout & Visual Style

#### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--ifm-color-primary` | `#00f2d4` | Bright teal — links, focus rings, pills, active states |
| `--ifm-background-color` | `#001423` | Rich black — page background |
| `darkTeal` | `#012229` | Secondary dark |
| `richBlack` | `#001423` | Body background |
| `grey-16` | `#02060a` | Header background |
| `grey-15` | `#090b0b` | Footer card backgrounds |
| `teal` | `#00f2d4` | Primary action color |

#### Typography

| Role | Font | Details |
|---|---|---|
| Body / docs | Plus Jakarta Sans | 400, 500, 600, 700, 800 weights |
| Nav / UI | OpenSauceTwo | Custom font family |
| Code | System monospace | `--ifm-code-font-size: 95%` |
| H1 base | 2.25rem | `--ifm-h1-font-size` |

Type scale is fully tokenized using `clamp()` responsive sizing (see `_typography.scss`). Never hardcodes px sizes in components.

#### Page Layout

```
┌────────────────────────────────────────────────────────┐
│  Sticky header (height: 4.0625rem)                     │
│  Logo | Nav links | CTA buttons | Burger (mobile)      │
├────────────────────┬────────────────────┬──────────────┤
│  Left sidebar      │  Doc content area  │  Right TOC   │
│  Sticky, indep.    │  max-width: 76rem  │  Sticky;     │
│  scroll            │  padding-x: 1rem   │  hidden mob  │
│  bg: #001423       │                    │  collapsible │
├────────────────────┴────────────────────┴──────────────┤
│  Footer (dark, blurred pattern bg, newsletter + links) │
└────────────────────────────────────────────────────────┘
```

- Dark mode only — `disableSwitch: true`, `defaultMode: dark`, no light-mode variables used in practice
- Sidebar scrolls independently via sticky + `overflow: hidden auto`; custom 6px scrollbar
- TOC is collapsible/pinnable (state persisted in `localStorage`); mobile renders as floating drawer
- TOC tracks active heading via `IntersectionObserver`; h2–h4 shown
- Breadcrumbs enabled; last-updated dates shown; author hidden

#### Edition & Version Context UI

- **Product pills** (`pill-enterprise` / `pill-cloud` / `pill-community` / `pill-airgap`) shown at top of doc pages
- **Legacy / Previous / Future banners** conditionally rendered per page path
- **Version indicator** component renders near doc title
- Sidebar has **focus-context logic** — collapses Community/Enterprise/Cloud sections to keep non-relevant items out of view; context tracked in `sessionStorage`

#### Header & Footer (custom components, not Docusaurus defaults)

- `src/theme/Navbar/index.tsx` renders an empty Docusaurus navbar wrapper; the actual header is a custom React component (`src/components/global/header/Header.tsx`) injected via `src/theme/Layout/index.tsx`
- Header: sticky, full-width, `bg-grey-16`, responsive — desktop dropdowns via `HeaderSubmenu`, mobile via `HeaderBurgerButton`
- Footer: blurred dark background pattern, newsletter signup (HubSpot), community links (Slack, GitHub), multi-column nav
- Both are fed from `options.data.ts` (static CMS data)

### Custom Theme Overrides

| Swizzled component | File | Purpose |
|---|---|---|
| `Layout` | `src/theme/Layout/index.tsx` | Injects custom header/footer, skip navigation |
| `Navbar` | `src/theme/Navbar/index.tsx` | Renders empty; real nav is in header |
| `Footer` | `src/theme/Footer/index.tsx` | Delegates to custom Footer component |
| `DocItem/Layout` | `src/theme/DocItem/Layout/index.tsx` | Adds pills, banners, version indicators, sidebar focus logic |
| `DocSidebar` | `src/theme/DocSidebar/index.tsx` | Passes through desktop/mobile switching |
| `TOC` | `src/theme/TOC/index.tsx` | Full custom TOC: collapsible, pinnable, active heading tracking, mobile drawer |

### Docs Markup & Content Conventions

**Frontmatter (required on every page):**
```yaml
---
title: 'Clear, Descriptive Title'
description: 'Brief description for SEO and navigation'
tags:
  - cloud          # edition: cloud, enterprise, community
  - configuration  # category: installation, configuration, troubleshooting
---
```

**Content structure:**
- `localdocs/` — all authored content (cloud, enterprise, discovery, assurance, integrations, developer, copilot, shared)
- `external-repos/` — auto-synced via git submodules; **do not edit**
- `docs/` — generated content; **do not edit**
- Sidebars are **explicitly curated** in `sidebars.ts` — not auto-generated from filesystem
- Versioned sidebars are imported from `sidebars/*.json` (per product per version)
- MDX is supported; Mermaid diagrams directly in markdown

**Frontmatter tag convention drives:**
- Which product pills appear on the page
- How Algolia search facets resolve
- Which sidebar section "owns" the page

### Search Architecture

**Algolia configuration:**
```
App ID: XCF0TW7MCD
Index: netboxlabs
Contextual search: true
Hits per page: 8
Facet filters: [] (empty — relies on build-time content exclusion)
```

Two search surfaces:
1. **DocSearch modal** — standard Docusaurus `@docusaurus/theme-search-algolia` keyboard-shortcut search in the docs UI
2. **`LandingPageSearch` component** — custom Algolia lite client, Google-style pill UI, debounced 300ms, deduplicates by base URL, renders results inline; dark-mode aware

### What Works — Keep

- Dark-only theme with teal/rich-black palette
- Plus Jakarta Sans + OpenSauceTwo typography
- Sticky three-column layout (sidebar | content | TOC)
- Custom collapsible TOC with active heading tracking
- Product pills and version/edition banners
- Algolia search with DocSearch modal
- Vercel deployment with environment-based base URL switching
- Explicit curated sidebars (not auto-generated)
- Breadcrumbs + last-updated metadata
- Vale prose linting in CI

### What Is Brittle — Replace

- **`transform-docs` pipeline** — 8+ chained TS/Python scripts rewriting and tagging content; fragile, slow, hard to test
- **Git submodule sync** — `update-submodules.yml`; scheduled, race-prone, all-or-nothing
- **Sidebar focus/context logic in DocItem** — complex `sessionStorage` + DOM manipulation to manage nav collapse; should be replaced with clean IA (two filters: product + version, per Grafana model)
- **Stale PR cleanup workflow** — symptom of pull-based architecture
- **Intermingled nav hierarchy** — single `sidebars.ts` managing all products/editions/versions simultaneously; SOW specifically calls this out as what needs to change

---

## New Microsite Recommendations

### IA & URL Structure

Following the Grafana model mandated by the SOW:

```
/docs/{product}/{version}/{section}/{page}
```

Examples:
```
/docs/netbox/stable/installation/
/docs/netbox/v4.2/features/ipam/
/docs/cloud/latest/getting-started/
/docs/enterprise/v3.1/administration/
/docs/discovery/latest/agent/
```

**Two-filter navigation (product → version → nav):**

```
Product selector: [ NetBox Community | Cloud | Enterprise | Discovery | Assurance | ... ]
Version selector: [ latest | v4.2 | v4.1 | v3.7 | ... ]
                        ↓
Nav sidebar for selected product + version combination
```

This eliminates the intermingled sidebar and the context-tracking sessionStorage hacks.

### Visual Style Replication Checklist

#### Foundations
- [ ] Install Plus Jakarta Sans (Google Fonts) and OpenSauceTwo
- [ ] Set `--ifm-color-primary: #00f2d4` (teal) and all shade variants
- [ ] Set `--ifm-background-color: #001423` (rich black)
- [ ] Set `html[data-theme="dark"]` as default, disable switch
- [ ] Apply `bg-richBlack` and `font-plusJakartaSans` on `html`

#### Layout
- [ ] Sticky header at `height: 4.0625rem`, `bg: #02060a`
- [ ] Content container `max-width: 76rem`, `padding-x` responsive
- [ ] Left sidebar sticky with independent scroll; `bg: #001423`; 6px custom scrollbar
- [ ] Right TOC column — desktop only; hidden ≤996px; collapsible; active heading tracking via IntersectionObserver
- [ ] Skip navigation link for accessibility

#### Components
- [ ] Product/edition pills (teal, yellow, magenta, blue by edition)
- [ ] Version indicator near page title
- [ ] Legacy / Previous / Future banners (conditional on frontmatter or path)
- [ ] `BackToTop` button
- [ ] Custom header with desktop submenus and mobile burger
- [ ] Custom footer with newsletter, community links, nav columns, blurred background pattern

#### Search
- [ ] Algolia DocSearch modal (`@docusaurus/theme-search-algolia`)
- [ ] `LandingPageSearch` component on entry/index page (lite client, debounced, deduped by base URL)
- [ ] Both surfaces wired to `netboxlabs` Algolia index

#### Docs Content
- [ ] Frontmatter enforced: `title`, `description`, `tags`
- [ ] Breadcrumbs enabled; last-updated dates shown
- [ ] Mermaid enabled
- [ ] TOC shows h2–h4
- [ ] Explict curated sidebars per product/version (imported from JSON files)

#### Quality
- [ ] Vale linting in CI
- [ ] ESLint + Stylelint + Prettier pre-commit hooks
- [ ] Broken link checks set to `warn` (not `error`) to avoid blocking builds

#### Infrastructure
- [ ] Vercel deployment; `baseUrl` driven by `VERCEL_ENV`
- [ ] `X-Robots-Tag: noindex` on non-production preview hosts
- [ ] Legacy URL redirects in `vercel.json`
- [ ] Dockerfile for local dev parity with CI

### Component Map

```
src/
├── theme/
│   ├── Layout/          ← Injects Header, Footer, SkipNav
│   ├── Navbar/          ← Empty shim (real nav in Header)
│   ├── Footer/          ← Delegates to Footer component
│   ├── DocItem/Layout/  ← Pills, banners, version indicator
│   └── TOC/             ← Custom collapsible TOC
├── components/
│   ├── global/
│   │   ├── header/      ← Header, submenus, burger, nav links
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   └── Logo.tsx
│   ├── LandingPageSearch/   ← Algolia lite landing search
│   ├── ProductPills/        ← Edition pills
│   ├── VersionIndicator/
│   ├── BackToTop/
│   └── LegacyBanner/ PreviousBanner/ FutureBanner/
├── css/
│   ├── globals.scss     ← Tailwind directives, focus styles, sidebar, container
│   ├── custom.scss      ← Responsive layout fixes, brand-colors import
│   ├── brand-colors.scss
│   ├── _typography.scss ← Full type scale with clamp() tokens
│   ├── _navbar.scss
│   ├── _mixins.scss
│   └── _fonts.scss
└── pages/
    └── index.tsx        ← Redirect to /docs/welcome/ (or new landing)
```

---

## Pipeline Integration Notes

> This section will expand as pipeline integration work progresses.

### Current State (POC — Phase 1 Complete)

The `docs-hub-poc` repo establishes a **push-based ingestion** model:

```
Source repo commits docs →
  publish-docs.yml creates zip bundle →
    PR opened in docs-hub-poc →
      process-incoming.yml unpacks bundle to incoming/<repo>/<version>/ →
        (future) transform → Docusaurus build → Vercel deploy
```

### Target State (Aligned with SOW + Grafana Model)

```
Source repo commits docs →
  publish-docs.yml pushes bundle (with docs.config.json metadata) →
    Hub validates + unpacks to docs/{product}/{version}/ →
      Docusaurus builds with product+version-aware sidebar config →
        Vercel deploys to /docs/{product}/{version}/
```

Key design decisions to resolve:

| Decision | Options | SOW Guidance |
|---|---|---|
| Sidebar generation | Explicit curated JSON vs auto-generated from filesystem | Keep explicit (existing model); auto-gen per product+version supported |
| Transform step | Keep TS/Python transforms vs strip to minimal MDX pre-processing | SOW: eliminate bespoke transformation logic |
| Version handling | Docusaurus versioned docs plugin vs directory-per-version | Directory-per-version aligns with Grafana model; avoids Docusaurus version complexity |
| Product selector | URL-based navigation vs sidebar collapse | URL-based (`/docs/{product}/`) is the clean model; sidebar shows only current product |
| Search filtering | Facet filters per product+version vs build-time exclusion | Algolia facets on product+version preferred; cleaner than build-time exclusion |
| Auth/access for preview | None needed for public docs | Vercel preview deploy + `noindex` header is sufficient |

### Ingestion Contract (per source repo)

Each source repo must provide a `docs.config.json`:

```json
{
  "product": "netbox",
  "edition": "community",
  "version": "4.2.0",
  "repo": "netbox-community/netbox"
}
```

Bundle is unpacked to: `docs/{product}/{version}/`

Sidebar config auto-located at: `sidebars/{product}-{version}.json` (generated or manually maintained).

### Workflow Files to Create/Replace

| File | Status | Notes |
|---|---|---|
| `publish-docs.yml` (source repo) | POC exists | Add `push` trigger on `docs/**` changes |
| `process-incoming.yml` (hub) | POC exists | Add validation, unpack to product/version path |
| `update-submodules.yml` | Existing (to deprecate) | Parallel-run during migration; disable after cutover |
| `auto-merge-docs.yml` | Existing (to simplify) | Keep quality checks; remove Linear integration overhead |
| `cleanup-automated-prs.yml` | Existing (to deprecate) | Not needed once push-model is stable |

---

*This document is a living reference — update as pipeline integration progresses through Phases 2–5.*
