import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';

async function unpackBundle(bundlePath, repoName, version) {
  const targetDir = path.join('incoming', repoName, version);

  await fs.promises.mkdir(targetDir, { recursive: true });

  fs.createReadStream(bundlePath)
    .pipe(unzipper.Extract({ path: targetDir }))
    .on('close', () => {
      console.debug(`Bundle unpacked to ${targetDir}`);
    });
}

const bundlePath = process.env.BUNDLE_PATH;
const repoName = process.env.REPO_NAME;
const version = process.env.VERSION;

if (!bundlePath || !repoName || !version) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

unpackBundle(bundlePath, repoName, version);
