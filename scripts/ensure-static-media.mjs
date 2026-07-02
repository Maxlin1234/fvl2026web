/**
 * Fail fast when API images have not been downloaded yet.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MEDIA_DIR = path.join(__dirname, '../public/static-media');
const WORKS_JSON = path.join(__dirname, '../src/static-data/works.json');

function countFiles(dir) {
  if (!fs.existsSync(dir)) return 0;
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    total += entry.isDirectory() ? countFiles(full) : 1;
  }
  return total;
}

const fileCount = countFiles(MEDIA_DIR);
const worksJson = fs.existsSync(WORKS_JSON)
  ? fs.readFileSync(WORKS_JSON, 'utf8')
  : '';
const expectsLocalMedia = worksJson.includes('"/static-media/');

if (expectsLocalMedia && fileCount === 0) {
  console.error(
    '\n[ensure-static-media] Missing public/static-media files.\n'
    + 'Run: npm run download-media\n'
    + 'Or full build: npm run build\n',
  );
  process.exit(1);
}

if (fileCount > 0) {
  console.log(`[ensure-static-media] OK (${fileCount} files in public/static-media)`);
}
