// scripts/generateMissingIndexes.ts
// Scans all product/version folders in site/docs/ and creates index.md if missing

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsRoot = path.join(__dirname, '../docs');

function isDocsDir(dir: string) {
  return fs.statSync(dir).isDirectory();
}

function ensureIndexMd(product: string, version: string, dir: string) {
  const indexPath = path.join(dir, 'index.md');
  if (!fs.existsSync(indexPath)) {
    const content = `# ${product} ${version}\n\nWelcome to the documentation for ${product} version ${version}.`;
    fs.writeFileSync(indexPath, content);
    console.log(`Created: ${indexPath}`);
    return true;
  }
  return false;
}

function scanDocs() {
  if (!fs.existsSync(docsRoot)) {
    console.log('Docs root not found.');
    return;
  }
  let createdCount = 0;
  // Version-rooted: docs/{version}/{product}/
  for (const version of fs.readdirSync(docsRoot)) {
    const versionPath = path.join(docsRoot, version);
    if (!isDocsDir(versionPath)) continue;
    for (const product of fs.readdirSync(versionPath)) {
      const productPath = path.join(versionPath, product);
      if (isDocsDir(productPath)) {
        if (ensureIndexMd(product, version, productPath)) createdCount++;
      }
    }
  }
  // Product-rooted: docs/{product}/{version}/
  for (const product of fs.readdirSync(docsRoot)) {
    const productPath = path.join(docsRoot, product);
    if (!isDocsDir(productPath)) continue;
    for (const version of fs.readdirSync(productPath)) {
      const versionPath = path.join(productPath, version);
      if (isDocsDir(versionPath)) {
        if (ensureIndexMd(product, version, versionPath)) createdCount++;
      }
    }
  }
  if (createdCount === 0) {
    console.log('All index.md files already exist.');
  } else {
    console.log(`Created ${createdCount} missing index.md files.`);
  }
}

scanDocs();
