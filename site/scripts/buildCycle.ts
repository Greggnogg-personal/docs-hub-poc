// scripts/buildCycle.ts
// Orchestrates: clean, generate sidebars, generate missing indexes, build, and serve

import { execSync, spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


function runStep(cmd: string, desc: string) {
  try {
    console.log(`\n=== ${desc} ===`);
    execSync(cmd, { stdio: 'inherit', cwd: path.resolve(__dirname) });
  } catch (e: any) {
    console.error(`\n[ERROR] Failed: ${desc}`);
    if (e.stdout) console.error('STDOUT:', e.stdout.toString());
    if (e.stderr) console.error('STDERR:', e.stderr.toString());
    if (e.message) console.error('MESSAGE:', e.message);
    process.exit(1);
  }
}

function main() {
  // Clean build output
  runStep('npm run clear', 'Clean build output');

  // Generate missing index.md files
  runStep('npx ts-node generateMissingIndexes.ts', 'Generate missing index.md files');

  // Generate sidebar and navigation
  runStep('npx ts-node ../generateSidebar.ts', 'Generate sidebar and navigation');

  // Build the site
  runStep('npm run build', 'Build Docusaurus site');

  // Serve the site (non-blocking, so user can Ctrl+C to stop)
  console.log('\n=== Serve Docusaurus site ===');
  const serve = spawn('npm', ['run', 'serve', '--', '--port', '3001'], {
    stdio: 'inherit',
    cwd: path.resolve(__dirname),
    shell: true
  });
  serve.on('close', code => {
    process.exit(code || 0);
  });
}

main();
