import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsRoot = path.join(__dirname, 'docs');

interface SidebarDoc {
  type: 'doc';
  id: string;
}

interface SidebarsConfig {
  [sidebarId: string]: SidebarDoc[];
}

function isValidVersionFolder(folder: string): boolean {
  // Accepts 'latest', 'v1.10', '1.0.6', etc. Rejects 'images', 'features', etc.
  return (
    folder === 'latest' ||
    /^v?\d+(\.\d+)*$/i.test(folder)
  );
}

function getVersionFolders(): string[] {
  if (!fs.existsSync(docsRoot)) return [];
  return fs.readdirSync(docsRoot).filter(f => {
    const full = path.join(docsRoot, f);
    return fs.statSync(full).isDirectory() && isValidVersionFolder(f);
  });
}

function getProductsInVersion(version: string): string[] {
  const versionPath = path.join(docsRoot, version);
  if (!fs.existsSync(versionPath)) return [];
  return fs.readdirSync(versionPath).filter(f => {
    const full = path.join(versionPath, f);
    return fs.statSync(full).isDirectory();
  });
}

// Returns { [product]: [versions] }
function getProductsAndVersions(): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  const versions = getVersionFolders();
  for (const version of versions) {
    const products = getProductsInVersion(version);
    for (const product of products) {
      if (!result[product]) result[product] = [];
      result[product].push(version);
    }
  }
  // Sort versions descending for each product
  for (const product in result) {
    result[product].sort((a, b) => {
      const pa = a.split('.').map(Number);
      const pb = b.split('.').map(Number);
      for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const na = pa[i] || 0;
        const nb = pb[i] || 0;
        if (na !== nb) return nb - na;
      }
      return 0;
    });
  }
  return result;
}

function getDocs(product: string, version: string): string[] {
  const docsPath = path.join(docsRoot, version, product);
  if (!fs.existsSync(docsPath)) return [];
  return fs.readdirSync(docsPath)
    .filter(f => f.endsWith('.md'))
    .map(f => `${version}/${product}/${f.replace(/\.md$/, '')}`);
}

function buildSidebarConfig(): SidebarsConfig {
  const products = getProductsAndVersions();
  const sidebars: SidebarsConfig = {};
  for (const product in products) {
    const productSidebar: any[] = [];
    for (const version of products[product]) {
      const docs = getDocs(product, version);
      // Ensure there is always an index doc for the version
      const indexPath = path.join(docsRoot, version, product, 'index.md');
      if (!fs.existsSync(indexPath)) {
        fs.writeFileSync(indexPath, `# ${product} ${version}\n\nWelcome to the documentation for ${product} version ${version}.`);
      }
      if (docs.length > 0) {
        productSidebar.push({
          type: 'category',
          label: version,
          items: docs.map(docId => ({ type: 'doc', id: docId })),
        });
      }
    }
    if (productSidebar.length > 0) {
      sidebars[product] = productSidebar;
    }
  }
  return sidebars;
}

const config = buildSidebarConfig();
const output = `import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';\n\nconst sidebars: SidebarsConfig = ${JSON.stringify(config, null, 2)};\n\nexport default sidebars;\n`;
fs.writeFileSync(path.join(__dirname, 'sidebars.ts'), output);

// Also output productsVersions.json for client use in src/components/ProductVersionBar
const products = getProductsAndVersions();
const productsVersions: { product: string; versions: string[] }[] = [];
for (const product in products) {
  if (products[product].length > 0) {
    productsVersions.push({ product, versions: products[product].slice().sort((a, b) => {
      // Sort descending, semver-aware (basic)
      const pa = a.split('.').map(Number);
      const pb = b.split('.').map(Number);
      for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const na = pa[i] || 0;
        const nb = pb[i] || 0;
        if (na !== nb) return nb - na;
      }
      return 0;
    }) });
  }
}
const pvOutputPath = path.join(__dirname, 'src', 'components', 'ProductVersionBar', 'productsVersions.json');
fs.writeFileSync(pvOutputPath, JSON.stringify(productsVersions, null, 2));

console.log('Sidebar and productsVersions generated for all products/versions.');
