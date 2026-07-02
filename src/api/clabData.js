/**
 * Site content from src/static-data/*.json (written at build time).
 * No runtime API calls in the browser.
 */
import projectBundle from '../static-data/project.json';
import worksBundle from '../static-data/works.json';
import proposalsBundle from '../static-data/work-proposals.json';

export function sortWorksById(works) {
  if (!Array.isArray(works)) return [];
  return [...works].sort((a, b) => {
    const idA = a?.id;
    const idB = b?.id;
    const nA = Number(idA);
    const nB = Number(idB);
    if (Number.isFinite(nA) && Number.isFinite(nB)) return nA - nB;
    return String(idA ?? '').localeCompare(String(idB ?? ''), undefined, { numeric: true });
  });
}

export function getWorks() {
  return sortWorksById(worksBundle?.works || []);
}

export function getWorkById(id) {
  const sid = String(id ?? '');
  return getWorks().find((w) => String(w?.id) === sid) || null;
}

export function getProjectRaw() {
  return projectBundle?.raw ?? null;
}

export function getProjectEntity() {
  const data = getProjectRaw();
  if (!data || typeof data !== 'object') return null;
  if ('error' in data && !data.data) return null;
  return data?.data && typeof data.data === 'object' ? data.data : data;
}

export function getWorkProposal(workId) {
  const sid = String(workId ?? '');
  return proposalsBundle?.proposals?.[sid] || null;
}

/** Resolve media URL: local /static-media, absolute remote, or legacy API path. */
export function resolveMediaUrl(url) {
  if (!url) return '';
  const s = String(url);
  if (s.startsWith('/')) return s;
  if (/^https?:\/\//i.test(s)) return s;
  return `https://unzip-clab-api.clab.org.tw/${s.replace(/^\/+/, '')}`;
}

/** Resolve featured photo URL (absolute or unzip-clab-api relative path). */
export function resolveWorkFeaturedPhotoUrl(w) {
  const directUrl = w?.featured_photo_media?.url || w?.featuredPhotoMedia?.url;
  return resolveMediaUrl(directUrl);
}

export function getStaticDataFetchedAt() {
  return worksBundle?.fetchedAt || projectBundle?.fetchedAt || null;
}
