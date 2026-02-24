

import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';

async function getProductSlugFromManifest(bundlePath) {
  // Unzip just the manifest.json to a temp location and read product.slug
  const directory = await unzipper.Open.file(bundlePath);
  const manifestEntry = directory.files.find(f => f.path === 'manifest.json');
  if (!manifestEntry) throw new Error('manifest.json not found in bundle');
  const content = await manifestEntry.buffer();
  const manifest = JSON.parse(content.toString());
  return manifest.product && manifest.product.slug ? manifest.product.slug : 'publisher';
}

async function unpackBundle(bundlePath, outputDir) {
  let targetDir = outputDir;
  if (!targetDir) {
    // Read product.slug from manifest.json in the zip
    const slug = await getProductSlugFromManifest(bundlePath);
    targetDir = path.join('site', 'docs', slug);
  }
  await fs.promises.mkdir(targetDir, { recursive: true });

  fs.createReadStream(bundlePath)
    .pipe(unzipper.Extract({ path: targetDir }))
    .on('close', () => {
      console.debug(`Bundle unpacked to ${targetDir}`);
    });
}

const bundlePath = process.env.BUNDLE_PATH;
const outputDir = process.env.OUTPUT_DIR; // Optional

if (!bundlePath) {
  console.error("Missing required environment variable: BUNDLE_PATH.");
  process.exit(1);
}

unpackBundle(bundlePath, outputDir);
