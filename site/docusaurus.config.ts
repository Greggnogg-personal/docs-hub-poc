import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'NetBox Documentation',
  tagline: 'Network and infrastructure management platform documentation',
  favicon: 'img/favicon.ico',

  url: 'http://localhost',
  baseUrl: '/',
  trailingSlash: true,

  organizationName: 'netboxlabs',
  projectName: 'netbox-docs-microsite',

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onDuplicateRoutes: 'warn',

  headTags: [
    // Plus Jakarta Sans — brand font
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
      },
    },
  ],

  markdown: {
    mermaid: true,
  },

  plugins: [
    // Tailwind CSS via PostCSS
    async function tailwindPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions: { plugins: unknown[] }) {
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
    'docusaurus-plugin-sass',
  ],

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/docs',
          sidebarPath: './sidebars.ts',
          include: ['**/*.md', '**/*.mdx'],
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
          breadcrumbs: true,
          // Table of contents: show h2, h3, h4
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/globals.scss'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/docs/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: 'keywords',
        content:
          'netbox, network automation, infrastructure management, DCIM, IPAM, documentation',
      },
    ],

    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },

    image: 'img/netbox-social-card.jpg',

    // Algolia search — same index as production site
    algolia: {
      appId: 'XCF0TW7MCD',
      apiKey: 'a2b488046dfbbbf27aa204269640af66',
      indexName: 'netboxlabs',
      contextualSearch: true,
      searchParameters: {
        facetFilters: [],
        hitsPerPage: 8,
      },
    },

    // Dark-only — brand requirement
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },

    // Navbar is a hollow shim — real header injected via Layout theme override
    navbar: {
      title: '',
      logo: {
        alt: 'NetBox Labs',
        src: 'img/logo.svg',
        href: '/',
      },
      items: [],
      hideOnScroll: false,
    },

    footer: {
      style: 'dark',
      links: [],
      copyright: `© ${new Date().getFullYear()} NetBox Labs`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'json', 'python', 'docker'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
