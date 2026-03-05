import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsRoot = path.join(__dirname, 'docs');

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

function buildSidebarConfig(): SidebarsConfig {
  const products = getProductsAndVersions();
  const sidebars: SidebarsConfig = {};

  for (const product of Object.keys(products)) {
    const productSidebar: SidebarItem[] = [];

    for (const [i, version] of products[product].entries()) {
      const versionPath = path.join(docsRoot, product, version);
      const versionIdPrefix = `${product}/${version}`;

      // Ensure index.md exists — required for ProductVersionBar navigation target
      const indexPath = path.join(versionPath, 'index.md');
      if (!fs.existsSync(indexPath)) {
        fs.writeFileSync(
          indexPath,
          `# ${toLabel(product)} ${version}\n\nWelcome to the documentation for ${toLabel(product)} ${version}.\n`,
        );
        console.log(`Created missing index: ${indexPath}`);
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
