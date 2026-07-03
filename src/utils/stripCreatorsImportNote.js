/** Internal data marker left when merging creator bios into introduction fields. */
export const CREATORS_IMPORT_MARKER = '--- import from creators data (revise pls.) ---';

/** Keep only the curated intro; drop marker and legacy imported text after it. */
export function stripCreatorsImportNote(text) {
  if (typeof text !== 'string') return text;
  const idx = text.indexOf(CREATORS_IMPORT_MARKER);
  if (idx === -1) return text;
  return text.slice(0, idx).trimEnd();
}

export function walkAndStripIntroFields(obj) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    obj.forEach(walkAndStripIntroFields);
    return;
  }
  for (const key of ['introduction', 'introduction_zh_tw']) {
    if (typeof obj[key] === 'string') {
      obj[key] = stripCreatorsImportNote(obj[key]);
    }
  }
  Object.values(obj).forEach(walkAndStripIntroFields);
}
