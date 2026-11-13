/**
 * Shared factory for src/data_Resources *Data.js files.
 *
 * Scope: BTech (Sem1/2/3/4-ECE) + Diploma (Sem1/2/5/6, Sem3 x5, Sem4 x5)
 *   + Exam guides (Agri, D2D, Paramedical, Poly, PolyLE, ANM, GNM, BSc Nursing).
 *
 * Replaces per-file copies of:
 *   get*Link(year, sub) + slugifySubject + findSubjectBySlug
 *   + unused `import ... from '@/src/utils/drive'`
 * Data (YEARS / SUBJECTS / DETAILS / PAPERS) stays in each Data file untouched.
 *
 * Diploma Sem1 variant: supports `aliases` map for getLink and extra
 * `branchSubjects` list for findSubjectBySlug fallback.
 */

import {
  extractDriveId,
  getDrivePreviewUrl,
  getDriveDirectDownloadUrl,
} from '@/src/utils/drive';

export { extractDriveId, getDrivePreviewUrl, getDriveDirectDownloadUrl };

/**
 * Single canonical slugifier.
 * Covers all 3 btech variants: strips (), converts & -> and.
 * e.g. "Basic of Electrical & Electronics Engineering" -> "basic-of-electrical-and-electronics-engineering"
 *      "Probability & Statistics" -> "probability-and-statistics"
 */
export function slugifySubject(subject) {
  if (!subject) return '';
  return subject
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generic link lookup. Replaces getSem1Link / getSem2Link / getSem3Link.
 * Returns null when year or subject missing (renders "Uploading Soon" in UI).
 * Optional `aliases`: { "lowercase name": "Canonical Subject" } — used by
 * Diploma Sem1 where branch papers are stored under alias keys.
 */
export function getPaperLink(papers, year, sub, aliases) {
  if (!papers) return null;
  const y = parseInt(year, 10);
  if (!papers[y]) return null;
  if (papers[y][sub]) return papers[y][sub];
  if (aliases && sub) {
    const canonical = aliases[sub.toLowerCase().trim()];
    if (canonical && papers[y][canonical]) return papers[y][canonical];
  }
  return null;
}

/**
 * Builds a findSubjectBySlug bound to a subject list.
 * Matches exact slug first, then case-insensitive fallback
 * (preserves old Sem1/Sem2 fallback behaviour).
 * Optional `extraLists`: additional arrays to search (e.g. Diploma
 * Sem1 BRANCH_SUBJECTS which are not part of ALL_SUBJECTS).
 */
export function makeFindSubjectBySlug(allSubjects, extraLists = []) {
  return function findSubjectBySlug(slug) {
    if (!slug || !Array.isArray(allSubjects)) return null;
    const clean = slug.toLowerCase().trim();
    const lists = [allSubjects, ...extraLists].filter(Array.isArray);
    for (const list of lists) {
      const hit = list.find((s) => slugifySubject(s) === clean);
      if (hit) return hit;
    }
    return (
      allSubjects.find((s) => s.toLowerCase() === clean) ||
      allSubjects.find(
        (s) =>
          s.toLowerCase().replace(/[^a-z0-9]/g, '') ===
          clean.replace(/[^a-z0-9]/g, '')
      ) ||
      null
    );
  };
}

/**
 * Main factory. Pass pure data, get back everything a page needs.
 * Optional passthroughs preserved for Diploma pages:
 *   commonSubjects / branchSubjects (Diploma Sem1/Sem2 split lists),
 *   subjectAliases (Diploma Sem1 alias map).
 */
export function createResourceData(config = {}) {
  const years = config.years || [];
  const allSubjects = config.allSubjects || [];
  const subjectDetails = config.subjectDetails || {};
  const papers = config.papers || {};
  const aliases = config.aliases || config.subjectAliases || null;
  const extraLists = [];
  if (Array.isArray(config.branchSubjects)) extraLists.push(config.branchSubjects);

  const findSubjectBySlug = makeFindSubjectBySlug(allSubjects, extraLists);
  const getLink = (year, sub) => getPaperLink(papers, year, sub, aliases);

  const getPreviewLink = (year, sub) => {
    const url = getLink(year, sub);
    return url ? getDrivePreviewUrl(url) : null;
  };

  const getDownloadLink = (year, sub) => {
    const url = getLink(year, sub);
    return url ? getDriveDirectDownloadUrl(url) : null;
  };

  return {
    YEARS: years,
    ALL_SUBJECTS: allSubjects,
    SUBJECT_DETAILS: subjectDetails,
    PAPERS: papers,
    getLink,
    getPreviewLink,
    getDownloadLink,
    slugifySubject,
    findSubjectBySlug,
    ...(config.commonSubjects ? { COMMON_SUBJECTS: config.commonSubjects } : {}),
    ...(config.branchSubjects ? { BRANCH_SUBJECTS: config.branchSubjects } : {}),
    ...(aliases ? { SUBJECT_ALIASES: aliases } : {}),
  };
}
