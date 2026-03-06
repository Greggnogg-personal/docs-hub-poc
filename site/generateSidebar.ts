import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsRoot = path.join(__dirname, 'docs');

// ---------------------------------------------------------------------------
// Product overview descriptions — used to generate product-root index.md
// ---------------------------------------------------------------------------

const PRODUCT_DISPLAY_NAMES: Record<string, string> = {
  assurance:        'NetBox Assurance',
  cloud:            'NetBox Cloud',
  community:        'NetBox Community Edition',
  copilot:          'NetBox Copilot',
  developer:        'Developer Documentation',
  diode:            'Diode',
  discovery:        'NetBox Discovery',
  'docs-publisher': 'Docs Publisher',
  enterprise:       'NetBox Enterprise',
  extensions:       'NetBox Extensions',
  integrations:     'NetBox Integrations',
  mcp:              'NetBox MCP Server',
  netbox:           'NetBox',
  'orb-agent':      'Orb Agent',
  preview:          'Preview Features',
  sdks:             'NetBox SDKs',
  shared:           'Shared Documentation',
};

const PRODUCT_DESCRIPTIONS: Record<string, string> = {
  assurance: `NetBox Assurance provides automated network state validation and compliance monitoring, continuously checking your infrastructure against the intended state defined in NetBox. It surfaces configuration drift, policy violations, and misconfigurations before they impact operations, helping teams maintain a reliable source of truth across their entire network estate.`,

  cloud: `NetBox Cloud is the fully managed SaaS offering of NetBox, delivering enterprise-grade network documentation and automation without the overhead of self-hosting. It provides the complete NetBox feature set with the reliability, scalability, and automatic updates of a cloud-native service, backed by NetBox Labs support.`,

  community: `NetBox Community Edition is the open-source network source of truth trusted by thousands of organizations worldwide. It provides a comprehensive platform for documenting and managing network infrastructure, IP address space, and data center resources through an intuitive web interface and REST/GraphQL APIs.`,

  copilot: `NetBox Copilot is an AI-powered assistant embedded directly into your NetBox interface, enabling natural language interaction with your network and infrastructure data. It works seamlessly across Community, Cloud, and Enterprise editions — allowing you to query data, generate reports, and automate documentation workflows without writing scripts or navigating complex menus.`,

  developer: `The NetBox Developer documentation covers APIs, SDKs, plugins, and integration patterns for extending and building on the NetBox platform. Whether you are developing custom plugins, integrating with third-party systems, or contributing to NetBox itself, this is your starting point for all technical development work.`,

  diode: `Diode is a high-performance data ingestion service that dramatically simplifies getting data into NetBox from any source. By abstracting the complexity of direct API integration, Diode provides a streamlined ingestion pipeline that keeps your network source of truth accurate and up to date with minimal operational effort.`,

  discovery: `NetBox Discovery automates the detection and documentation of network devices and infrastructure across your environment. By scanning your network and correlating findings with NetBox, it closes the gap between your intended and actual network state — keeping your source of truth aligned with reality as your infrastructure evolves.`,

  'docs-publisher': `Docs Publisher is the standardized tooling that enables self-service documentation publishing across all NetBox product repositories. It defines the bundle format, CI pipeline, and ingestion process that keeps this documentation hub current, allowing each product team to ship and update documentation independently.`,

  enterprise: `NetBox Enterprise is the self-hosted, commercially supported edition of NetBox designed for organizations that require on-premises deployment, advanced RBAC, SSO integration, and enterprise support SLAs. It delivers the full power of the NetBox platform with the control, compliance, and reliability that large organizations demand.`,

  extensions: `NetBox Extensions covers the ecosystem of official plugins, apps, and add-ons that expand NetBox's core functionality. From custom data models to workflow automation hooks, extensions allow teams to tailor NetBox precisely to their operational and organizational requirements.`,

  integrations: `NetBox Integrations documents the officially supported connections between NetBox and third-party platforms such as Ansible, Terraform, and more. These integrations position NetBox as the authoritative source of truth across your entire automation stack, enabling consistent, data-driven network operations.`,

  mcp: `The NetBox MCP Server implements the Model Context Protocol (MCP), enabling AI agents and large language models to query and interact with NetBox infrastructure data in a standardized, composable way. It bridges your network source of truth with modern AI tooling, powering intelligent automation and natural language infrastructure workflows.`,

  netbox: `NetBox is the leading open-source network source of truth for documenting and managing IP address space, data center infrastructure, and network topology. Its rich data model, flexible REST and GraphQL APIs, and vibrant community make it the foundation for modern network automation and infrastructure-as-code practices.`,

  'orb-agent': `Orb Agent is the lightweight discovery component of the NetBox Discovery solution, deployed at the network edge to collect device telemetry and topology data. Running as a Docker container, it continuously streams discovery results to the NetBox Discovery pipeline for automated correlation and documentation in NetBox.`,

  preview: `The Preview section contains documentation for NetBox Labs features and products currently in public or private preview. Preview features are fully functional but may evolve before general availability — feedback is encouraged and actively reviewed by the product team to shape the final release.`,

  sdks: `The NetBox SDKs provide client libraries for interacting with the NetBox API in popular programming languages. They abstract authentication, pagination, and error handling so you can focus on building integrations, automations, and tooling on top of the NetBox platform with minimal boilerplate.`,

  shared: `Shared documentation covers concepts, glossaries, and reference material that applies across multiple NetBox products. Topics include common architectural patterns, cross-product terminology, and platform-wide configuration guidance relevant to users of any NetBox edition.`,
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SidebarDoc {
  type: 'doc';
  id: string;
}

interface SidebarCategory {
  type: 'category';
  label: string;
  collapsed: boolean;
  items: SidebarItem[];
}

type SidebarItem = SidebarDoc | SidebarCategory;

interface SidebarsConfig {
  [sidebarId: string]: SidebarItem[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Directories to exclude from sidebar generation (non-doc content). */
const EXCLUDE_DIRS = new Set(['images', 'media', 'screenshots', 'assets', 'img', '_theme', 'samples']);

/** Slugs that don't look like version strings — i.e. plain product subdirectories. */
function isVersionFolder(name: string): boolean {
  return name === 'latest' || /^v?\d+(\.\d+)*/i.test(name);
}

/** Sort version strings descending (latest first). */
function sortVersionsDesc(versions: string[]): string[] {
  return versions.slice().sort((a, b) => {
    if (a === 'latest') return -1;
    if (b === 'latest') return 1;
    const pa = a.replace(/^v/, '').split('.').map(Number);
    const pb = b.replace(/^v/, '').split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const na = pa[i] ?? 0;
      const nb = pb[i] ?? 0;
      if (na !== nb) return nb - na;
    }
    return 0;
  });
}

/** Convert a directory slug to a human-readable label. */
function toLabel(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ---------------------------------------------------------------------------
// Filesystem scanning — expects docs/{product}/{version}/ structure
// ---------------------------------------------------------------------------

function getProductFolders(): string[] {
  if (!fs.existsSync(docsRoot)) return [];
  return fs.readdirSync(docsRoot).filter((name: string) => {
    const full = path.join(docsRoot, name);
    return fs.statSync(full).isDirectory();
  });
}

function getVersionFolders(product: string): string[] {
  const productPath = path.join(docsRoot, product);
  if (!fs.existsSync(productPath)) return [];
  return fs.readdirSync(productPath).filter((name: string) => {
    const full = path.join(productPath, name);
    return fs.statSync(full).isDirectory() && isVersionFolder(name);
  });
}

/**
 * Returns { product: string[] } where each string[] is a descending-sorted
 * list of version folders that actually exist on disk.
 * Only products that have at least one version folder are included.
 */
function getProductsAndVersions(): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const product of getProductFolders()) {
    const versions = getVersionFolders(product);
    if (versions.length > 0) {
      result[product] = sortVersionsDesc(versions);
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Recursive sidebar builder
// ---------------------------------------------------------------------------

/**
 * Recursively build SidebarItems for a directory.
 *
 * - index.md always comes first as a doc item
 * - Other .md files follow, alphabetically
 * - Subdirectories become collapsed categories (unless in EXCLUDE_DIRS)
 */
function buildItemsForDir(dirPath: string, idPrefix: string): SidebarItem[] {
  if (!fs.existsSync(dirPath)) return [];

  const entries = fs.readdirSync(dirPath);
  const items: SidebarItem[] = [];

  // index.md first
  if (entries.includes('index.md')) {
    items.push({ type: 'doc', id: `${idPrefix}/index` });
  }

  // Non-index markdown files
  const mdFiles = entries
    .filter((e: string) => e.endsWith('.md') && e !== 'index.md')
    .sort();

  for (const file of mdFiles) {
    // Docusaurus strips leading numeric prefixes (e.g. "1-postgresql.md" → id "postgresql")
    const docId = file.replace(/\.md$/, '').replace(/^\d+[-_]/, '');
    items.push({ type: 'doc', id: `${idPrefix}/${docId}` });
  }

  // Subdirectories as categories
  const subdirs = entries
    .filter((e: string) => {
      const full = path.join(dirPath, e);
      return fs.statSync(full).isDirectory() && !EXCLUDE_DIRS.has(e);
    })
    .sort();

  for (const subdir of subdirs) {
    const subdirPath = path.join(dirPath, subdir);
    const subdirPrefix = `${idPrefix}/${subdir}`;
    const subdirItems = buildItemsForDir(subdirPath, subdirPrefix);
    if (subdirItems.length > 0) {
      items.push({
        type: 'category',
        label: toLabel(subdir),
        collapsed: true,
        items: subdirItems,
      });
    }
  }

  return items;
}

// ---------------------------------------------------------------------------
// Sidebar config builder
// ---------------------------------------------------------------------------

/** Generate (or skip) the product-root index.md at docs/{product}/index.md */
function ensureProductIndex(product: string): boolean {
  const productPath = path.join(docsRoot, product);
  const indexPath = path.join(productPath, 'index.md');
  if (fs.existsSync(indexPath)) return true;

  const displayName = PRODUCT_DISPLAY_NAMES[product] ?? toLabel(product);
  const description = PRODUCT_DESCRIPTIONS[product]
    ?? `Welcome to the ${displayName} documentation.`;

  const content = [
    `---`,
    `title: "${displayName}"`,
    `description: "Overview of ${displayName}"`,
    `---`,
    ``,
    `# ${displayName}`,
    ``,
    description,
    ``,
  ].join('\n');

  fs.writeFileSync(indexPath, content);
  console.log(`Created product overview: ${indexPath}`);
  return true;
}

function buildSidebarConfig(): SidebarsConfig {
  const products = getProductsAndVersions();
  const sidebars: SidebarsConfig = {};

  for (const product of Object.keys(products)) {
    const productSidebar: SidebarItem[] = [];

    // Product-root overview page — prepend as first sidebar item
    ensureProductIndex(product);
    const productIndexPath = path.join(docsRoot, product, 'index.md');
    if (fs.existsSync(productIndexPath)) {
      productSidebar.push({ type: 'doc', id: `${product}/index` });
    }

    for (const [i, version] of products[product].entries()) {
      const versionPath = path.join(docsRoot, product, version);
      const versionIdPrefix = `${product}/${version}`;

      // Ensure version index.md exists — required for ProductVersionBar navigation target
      const indexPath = path.join(versionPath, 'index.md');
      if (!fs.existsSync(indexPath)) {
        fs.writeFileSync(
          indexPath,
          `# ${toLabel(product)} ${version}\n\nWelcome to the documentation for ${toLabel(product)} ${version}.\n`,
        );
        console.log(`Created missing version index: ${indexPath}`);
      }

      const versionItems = buildItemsForDir(versionPath, versionIdPrefix);

      if (versionItems.length > 0) {
        productSidebar.push({
          type: 'category',
          // Collapse all versions except the first (newest) one
          collapsed: i > 0,
          label: version,
          items: versionItems,
        });
      }
    }

    if (productSidebar.length > 0) {
      sidebars[product] = productSidebar;
    }
  }

  return sidebars;
}

// ---------------------------------------------------------------------------
// Write outputs
// ---------------------------------------------------------------------------

const sidebarsConfig = buildSidebarConfig();

// Write sidebars.ts
const sidebarsOutput =
  `import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';\n\n` +
  `const sidebars: SidebarsConfig = ${JSON.stringify(sidebarsConfig, null, 2)};\n\n` +
  `export default sidebars;\n`;

fs.writeFileSync(path.join(__dirname, 'sidebars.ts'), sidebarsOutput);
console.log('sidebars.ts written.');

// Write productsVersions.json for ProductVersionBar component
const productsAndVersions = getProductsAndVersions();
const productsVersions = Object.entries(productsAndVersions).map(([product, versions]) => ({
  product,
  versions,
}));

const pvOutputPath = path.join(
  __dirname,
  'src',
  'components',
  'ProductVersionBar',
  'productsVersions.json',
);
fs.writeFileSync(pvOutputPath, JSON.stringify(productsVersions, null, 2));
console.log(`productsVersions.json written (${productsVersions.length} products).`);

console.log('Done — sidebar and navigation generated from docs filesystem.');
