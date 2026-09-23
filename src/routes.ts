import { PageId } from './types';

export const ROUTES: Record<PageId, string> = {
  accueil: '/',
  universite: '/universite',
  facultes: '/facultes',
  faculte_detail: '/facultes/:facultyId',
  admissions: '/admissions',
  formations: '/formations',
  formation_detail: '/formations/:programId',
  campus_virtuel: '/campus-virtuel',
  bibliotheque: '/bibliotheque',
  cabinet: '/cabinet',
  mere_nature: '/mere-nature',
  recherches: '/recherches',
  actualites: '/actualites',
  actualite_detail: '/actualites/:articleId',
  carrieres: '/carrieres',
  contacts: '/contacts',
};

const PAGE_BY_PATH: Record<string, PageId> = Object.fromEntries(
  Object.entries(ROUTES).map(([page, path]) => [path, page as PageId]),
);

export const STATIC_ROUTES: Record<string, PageId> = {
  '/': 'accueil',
  '/universite': 'universite',
  '/facultes': 'facultes',
  '/admissions': 'admissions',
  '/formations': 'formations',
  '/campus-virtuel': 'campus_virtuel',
  '/bibliotheque': 'bibliotheque',
  '/cabinet': 'cabinet',
  '/mere-nature': 'mere_nature',
  '/recherches': 'recherches',
  '/actualites': 'actualites',
  '/carrieres': 'carrieres',
  '/contacts': 'contacts',
};

export function pageToPath(page: PageId, params?: Record<string, string>): string {
  let path = ROUTES[page] ?? '/';
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`:${key}`, encodeURIComponent(value));
    }
  }
  return path;
}

export function pathToPage(pathname: string): { page: PageId; params: Record<string, string> } | null {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (STATIC_ROUTES[clean]) return { page: STATIC_ROUTES[clean], params: {} };

  const segments = clean.split('/').filter(Boolean);
  for (const [path, page] of Object.entries(PAGE_BY_PATH)) {
    const pathSegments = path.split('/').filter(Boolean);
    if (pathSegments.length !== segments.length) continue;
    const params: Record<string, string> = {};
    let match = true;
    for (let i = 0; i < pathSegments.length; i++) {
      const seg = pathSegments[i];
      if (seg.startsWith(':')) {
        params[seg.slice(1)] = decodeURIComponent(segments[i]);
      } else if (seg !== segments[i]) {
        match = false;
        break;
      }
    }
    if (match) return { page, params };
  }
  return null;
}
