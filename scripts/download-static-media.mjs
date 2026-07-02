/**
 * Download API/CDN images referenced in src/static-data/*.json
 * and rewrite media URLs to /static-media/... for offline deploy.
 *
 * Runs after fetch-data, before vue-cli-service build.
 */
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATIC_DATA_DIR = path.join(__dirname, '../src/static-data');
const MEDIA_ROOT = path.join(__dirname, '../public/static-media');
const JSON_FILES = ['works.json', 'project.json'];
const CONCURRENCY = 8;
const API_AUTH = process.env.CLAB_API_KEY || 'Api-Key 1e801a8fbe21fe2bef15df853e62ec9dc5a1cd08';

const MIME_EXT = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/svg+xml': '.svg',
};

function isMediaObject(obj) {
  return obj && typeof obj === 'object' && typeof obj.url === 'string' && obj.url.trim().length > 0;
}

function isImageMediaUrl(url) {
  const u = String(url).toLowerCase();
  if (!u.startsWith('http://') && !u.startsWith('https://')) return false;
  return (
    u.includes('/cdn/')
    || u.includes('/web/image/')
    || u.includes('work-photo')
    || u.includes('activity-photo')
    || /\.(png|jpe?g|gif|webp|svg)(\?|#|$)/i.test(u)
  );
}

function collectMediaObjects(node, bucket) {
  if (Array.isArray(node)) {
    node.forEach((item) => collectMediaObjects(item, bucket));
    return;
  }
  if (!node || typeof node !== 'object') return;

  if (isMediaObject(node) && isImageMediaUrl(node.url)) {
    bucket.push(node);
  }

  for (const value of Object.values(node)) {
    if (value && typeof value === 'object') collectMediaObjects(value, bucket);
  }
}

function guessExtFromUrl(url) {
  const clean = String(url).split('?')[0].split('#')[0];
  const ext = path.extname(clean).toLowerCase();
  if (ext && ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext)) {
    return ext === '.jpeg' ? '.jpg' : ext;
  }
  return '';
}

function relPathForMedia(media) {
  const remoteUrl = String(media.url);
  const mediaPath = typeof media.path === 'string' ? media.path.trim() : '';

  if (mediaPath.startsWith('/cdn/')) {
    return mediaPath.replace(/^\/cdn\//, '');
  }
  if (mediaPath.startsWith('/cf/') || /^\/[0-9a-f]{2}\//i.test(mediaPath)) {
    return mediaPath.replace(/^\//, '');
  }
  if (mediaPath.startsWith('/web/image/')) {
    return mediaPath.replace(/^\//, '');
  }
  if (mediaPath.startsWith('/')) {
    return mediaPath.replace(/^\//, '');
  }

  const fromUrl = remoteUrl.replace(/^https?:\/\/[^/]+\/cdn\//i, '');
  if (fromUrl !== remoteUrl) return fromUrl;

  const hash = crypto.createHash('sha1').update(remoteUrl).digest('hex').slice(0, 16);
  const ext = guessExtFromUrl(remoteUrl) || '.jpg';
  return `by-url/${hash}${ext}`;
}

function authHeadersFor(url) {
  try {
    const host = new URL(url).hostname;
    if (host.endsWith('clab.org.tw')) {
      return { Authorization: API_AUTH, Accept: 'image/*,*/*' };
    }
  } catch {
    // ignore
  }
  return { Accept: 'image/*,*/*' };
}

function withExtension(relPath, contentType) {
  if (path.extname(relPath)) return relPath;
  const ext = MIME_EXT[String(contentType || '').split(';')[0].trim().toLowerCase()] || '.jpg';
  return `${relPath}${ext}`;
}

async function downloadImage(remoteUrl, relPath) {
  const headers = authHeadersFor(remoteUrl);
  let targetRel = relPath;
  let diskPath = path.join(MEDIA_ROOT, targetRel);

  if (fs.existsSync(diskPath) && fs.statSync(diskPath).size > 0) {
    return `/static-media/${targetRel.replace(/\\/g, '/')}`;
  }

  const res = await fetch(remoteUrl, { headers, redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${remoteUrl}`);
  }

  const contentType = res.headers.get('content-type') || '';
  targetRel = withExtension(targetRel, contentType);
  diskPath = path.join(MEDIA_ROOT, targetRel);

  if (fs.existsSync(diskPath) && fs.statSync(diskPath).size > 0) {
    return `/static-media/${targetRel.replace(/\\/g, '/')}`;
  }

  const buf = Buffer.from(await res.arrayBuffer());
  if (!buf.length) {
    throw new Error(`Empty response for ${remoteUrl}`);
  }

  fs.mkdirSync(path.dirname(diskPath), { recursive: true });
  fs.writeFileSync(diskPath, buf);
  return `/static-media/${targetRel.replace(/\\/g, '/')}`;
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let index = 0;

  async function run() {
    while (index < items.length) {
      const i = index;
      index += 1;
      results[i] = await worker(items[i], i);
    }
  }

  const runners = Array.from({ length: Math.min(limit, items.length) }, () => run());
  await Promise.all(runners);
  return results;
}

async function processJsonFile(filename) {
  const filePath = path.join(STATIC_DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`Skip missing ${filePath}`);
    return { downloaded: 0, skipped: 0, failed: 0 };
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const mediaObjects = [];
  collectMediaObjects(data, mediaObjects);

  const uniqueByUrl = new Map();
  for (const media of mediaObjects) {
    const remoteUrl = String(media.url).trim();
    if (!uniqueByUrl.has(remoteUrl)) {
      uniqueByUrl.set(remoteUrl, {
        remoteUrl,
        relPath: relPathForMedia(media),
        refs: [],
      });
    }
    uniqueByUrl.get(remoteUrl).refs.push(media);
  }

  const jobs = [...uniqueByUrl.values()];
  console.log(`[${filename}] ${mediaObjects.length} media refs, ${jobs.length} unique URLs`);

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;
  const failures = [];

  await mapWithConcurrency(jobs, CONCURRENCY, async (job) => {
    const diskPath = path.join(MEDIA_ROOT, job.relPath);
    const alreadyExists = fs.existsSync(diskPath) && fs.statSync(diskPath).size > 0;

    try {
      const localUrl = await downloadImage(job.remoteUrl, job.relPath);
      for (const media of job.refs) {
        media.url = localUrl;
      }
      if (alreadyExists) skipped += 1;
      else downloaded += 1;
    } catch (err) {
      failed += 1;
      failures.push({ url: job.remoteUrl, error: err.message });
      console.warn(`Failed: ${job.remoteUrl} — ${err.message}`);
    }
  });

  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${filePath}`);

  if (failures.length) {
    const manifestPath = path.join(STATIC_DATA_DIR, 'media-download-errors.json');
    fs.writeFileSync(manifestPath, `${JSON.stringify({ filename, failures, at: new Date().toISOString() }, null, 2)}\n`);
  }

  return { downloaded, skipped, failed, failures };
}

async function main() {
  fs.mkdirSync(MEDIA_ROOT, { recursive: true });

  let totalDownloaded = 0;
  let totalSkipped = 0;
  let totalFailed = 0;
  const allFailures = [];

  for (const filename of JSON_FILES) {
    const result = await processJsonFile(filename);
    totalDownloaded += result.downloaded;
    totalSkipped += result.skipped;
    totalFailed += result.failed;
    if (result.failures?.length) allFailures.push(...result.failures);
  }

  console.log(
    `Media download done. downloaded=${totalDownloaded}, skipped=${totalSkipped}, failed=${totalFailed}`,
  );

  if (totalFailed > 0) {
    console.error('Some images failed to download. See media-download-errors.json');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('download-static-media failed:', err);
  process.exit(1);
});
