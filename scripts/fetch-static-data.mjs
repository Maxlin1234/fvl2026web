/**
 * Optional: fetch CLAB API and overwrite src/static-data/*.json
 * Runs automatically before `npm run build`; manual: npm run fetch-data
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '../src/static-data');

const API_BASE = 'https://unzip.clab.org.tw/api/v1';
const API_AUTH = process.env.CLAB_API_KEY || 'Api-Key 1e801a8fbe21fe2bef15df853e62ec9dc5a1cd08';
const EXTRA_PROPOSAL_WORK_IDS = ['193', '194'];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      { headers: { Authorization: API_AUTH, Accept: 'application/json' } },
      (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            reject(new Error(`HTTP ${res.statusCode} for ${url}: ${body.slice(0, 200)}`));
            return;
          }
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(new Error(`Invalid JSON from ${url}: ${e.message}`));
          }
        });
      },
    );
    req.on('error', reject);
    req.setTimeout(60000, () => {
      req.destroy(new Error(`Timeout: ${url}`));
    });
  });
}

function normalizeWorks(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

function writeJson(filename, data) {
  const filePath = path.join(OUT_DIR, filename);
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${filePath}`);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log('Fetching project info...');
  const projectRaw = await fetchJson(`${API_BASE}/projects/21`);

  console.log('Fetching works (detail)...');
  const worksRaw = await fetchJson(`${API_BASE}/projects/21/works?level=detail&limit=500`);
  const works = normalizeWorks(worksRaw);

  console.log('Fetching extra proposals...');
  const proposals = {};
  for (const workId of EXTRA_PROPOSAL_WORK_IDS) {
    try {
      const detail = await fetchJson(`${API_BASE}/works/${workId}`);
      const entity = detail?.data && typeof detail.data === 'object' ? detail.data : detail;
      proposals[workId] = {
        proposal_zh_tw: entity?.proposal_zh_tw ?? entity?.proposalZhTw ?? '',
        proposal: entity?.proposal ?? '',
      };
    } catch (e) {
      console.warn(`Warning: could not fetch proposal for work ${workId}:`, e.message);
      proposals[workId] = { proposal_zh_tw: '', proposal: '' };
    }
  }

  const meta = { fetchedAt: new Date().toISOString() };

  writeJson('project.json', { ...meta, raw: projectRaw });
  writeJson('works.json', { ...meta, works });
  writeJson('work-proposals.json', { ...meta, proposals });

  console.log(`Done. ${works.length} works saved.`);
}

main().catch((err) => {
  console.error('fetch-static-data failed:', err);
  process.exit(1);
});
