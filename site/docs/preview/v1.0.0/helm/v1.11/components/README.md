---
source: localdocs
lastUpdatedAt: 1764689862000
canonical: /docs/preview/helm/v1.11/components/README/
---
# Helm Documentation Components

This directory contains reusable React components for the Helm documentation.

## BackToTop

A floating "Back to Top" button that appears when users scroll down the page.

### Usage

```jsx
import BackToTop from './components/BackToTop';

// Simple usage
<BackToTop />
```

### Features

- Automatically shows/hides based on scroll position (appears after 300px scroll)
- Smooth scroll animation to top of page
- Fixed positioning in bottom-right corner
- Professional styling with hover effects
- Accessible with proper ARIA labels

## BetaBanner

A reusable component that displays a beta notice banner across helm documentation pages.

### Usage

```jsx
import BetaBanner from './components/BetaBanner';

// Basic usage with defaults
<BetaBanner />

// With custom props
<BetaBanner 
  show={true}
  title="Alpha Notice:"
  message="These charts are in alpha testing."
  link="https://example.com"
  linkText="updated documentation"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `show` | boolean | `true` | Whether to display the banner |
| `title` | string | `"Beta Notice:"` | The title text (bold) |
| `message` | string | `"These Helm charts are currently in beta..."` | The main message text |
| `link` | string | `"https://docs.netboxlabs.com/enterprise"` | URL for the reference link |
| `linkText` | string | `"main documentation"` | Text for the reference link |

### Features

- Consistent styling across all helm docs
- Configurable content via props
- Can be hidden by setting `show={false}`
- Responsive design
- Accessible with proper rel attributes

### Conditional Display

You can conditionally show/hide the banner based on frontmatter:

```jsx
import BetaBanner from './components/BetaBanner';

export const isBeta = true; // Could come from frontmatter or config

<BetaBanner show={isBeta} />
```

### Styling

The component uses inline styles to ensure consistency and avoid CSS conflicts:
- Background: `#fff3cd` (light yellow)
- Border: `#ffeaa7` (darker yellow)  
- Text color: `#856404` (brown)
- Padding: `15px`
- Margin: `20px 0` 
