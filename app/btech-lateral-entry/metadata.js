import { BTECH_LE_COLLEGES_DETAIL } from '@/src/data-college/btech-le/btechLeData';

export const SITE_URL = 'https://www.futurely.in';

export const viewport = { themeColor: '#0d9488', width: 'device-width', initialScale: 1 };

const rupee = n => '₹' + Intl.NumberFormat('en-IN').format(Math.round(n || 0));

// 14 live route slugs (mirrors app/sitemap.ts btechLateralSlugs).
export const BTECH_LE_ROUTES = [
  'bit-sindri', 'chaibasa-engineering', 'cit-ranchi', 'dumka-engineering',
  'gec-bokaro', 'gec-chaibasa', 'gec-dumka', 'gec-godda', 'gec-palamu',
  'kkcem-dhanbad', 'ramgarh-engineering', 'rtcit-ranchi', 'rvscet-jamshedpur',
  'ucet-hazaribagh',
];

// Route slug -> data key actually read (alias routes read through their shared key).
const ROUTE_TO_COLLEGE = {
  'bit-sindri': 'bit-sindri', 'chaibasa-engineering': 'chaibasa-engineering',
  'cit-ranchi': 'cit-ranchi', 'dumka-engineering': 'dumka-engineering',
  'gec-bokaro': 'gec-bokaro', 'gec-chaibasa': 'chaibasa-engineering',
  'gec-dumka': 'dumka-engineering', 'gec-godda': 'gec-godda',
  'gec-palamu': 'gec-palamu', 'kkcem-dhanbad': 'kkcem-dhanbad',
  'ramgarh-engineering': 'ramgarh-engineering', 'rtcit-ranchi': 'rtcit-ranchi',
  'rvscet-jamshedpur': 'rvscet-jamshedpur', 'ucet-hazaribagh': 'ucet-hazaribagh',
};

// customId passed to the shared component (only the 2 alias routes differ:
// 'gec-chaibasa' renders the chaibasa-engineering record, 'gec-dumka'
// renders the dumka-engineering record).
export const ROUTE_CUSTOM_IDS = {
  'gec-chaibasa': 'chaibasa-engineering', 'gec-dumka': 'dumka-engineering',
};

// Secondary fallbacks, copied from each static page's `||` chain.
const FALLBACKS = {
  'bit-sindri': 'bit-sindri', 'chaibasa-engineering': 'chaibasa-engineering',
  'gec-chaibasa': 'chaibasa-engineering', 'dumka-engineering': 'dumka-engineering',
  'gec-dumka': 'dumka-engineering', 'ramgarh-engineering': 'ramgarh-engineering',
  'ucet-hazaribagh': 'ucet-hazaribagh', 'gec-palamu': 'gec-palamu',
  'cit-ranchi': 'gec-palamu', 'gec-bokaro': 'gec-palamu', 'gec-godda': 'gec-palamu',
  'kkcem-dhanbad': 'gec-palamu', 'rtcit-ranchi': 'gec-palamu',
  'rvscet-jamshedpur': 'gec-palamu',
};

const GEC_REPLACE_ROUTES = ['gec-bokaro', 'gec-godda', 'gec-palamu'];
const SPLIT_ROUTES = ['gec-chaibasa', 'ramgarh-engineering', 'ucet-hazaribagh'];

function resolveCollege(routeId) {
  const dataKey = ROUTE_TO_COLLEGE[routeId] || routeId;
  const raw = BTECH_LE_COLLEGES_DETAIL[dataKey]
    || (FALLBACKS[routeId] ? BTECH_LE_COLLEGES_DETAIL[FALLBACKS[routeId]] : undefined);
  if (!raw) return null;
  return { ...raw };
}

function getPageCopy(routeId, d) {
  if (routeId === 'bit-sindri') {
    const branchNames = d.courses ? d.courses.map((c) => c.name).join(', ') : '';
    return {
      pageTitle: `${d.name}: D2D Lateral Entry Admission, Fees, Cutoff 2026`,
      metaDescription: `${d.tagline} Lateral entry branches: ${branchNames}. Fees ${rupee(d.fees?.totalApproxFirstYear)}/yr, ${d.placements?.summary?.placementRate}% placement, ${d.placements?.summary?.avgPackageLPA} LPA avg package. Admission via JCECEB D2D counselling.`,
      shortName: d.name,
    };
  }
  if (routeId === 'chaibasa-engineering') {
    return {
      pageTitle: `${d.name} B.Tech LE: D2D Admission, Fees & Cutoff 2027`,
      metaDescription: `${d.name} B.Tech Lateral Entry (D2D) 2027: Admission process, cutoff ranks, fee structure (${rupee(d.fees?.totalApproxFirstYear)}/yr), placement stats, and seat matrix.`,
      shortName: d.name,
    };
  }
  const shortName = GEC_REPLACE_ROUTES.includes(routeId)
    ? d.name.replace(/^Government Engineering College /, 'GEC ')
    : SPLIT_ROUTES.includes(routeId)
      ? d.name.split(' (')[0]
      : d.name;
  return {
    pageTitle: `${shortName}: D2D Admission, Fees & Cutoff 2026`,
    metaDescription: `${shortName} B.Tech Lateral Entry (D2D) 2026: Admission, cutoff ranks, fees (${rupee(d.fees?.totalApproxFirstYear)}/yr), placement stats & seat matrix.`,
    shortName,
  };
}

function getImageUrl(image) {
  const imgSrc = typeof image === 'string' ? image : image?.src || '';
  return imgSrc.startsWith('http') ? imgSrc : `${SITE_URL}${imgSrc}`;
}

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const OG_TRANSFORM = `c_fill,w_${OG_WIDTH},h_${OG_HEIGHT},g_auto,q_auto`;
const CLOUDINARY_UPLOAD_PATH = '/image/upload/';

// A Cloudinary delivery path may already carry a transform segment
// (e.g. `.../upload/v1789800308/ucet-hazaribagh.jpg` carries none).
function hasTransform(url) {
  return /\/image\/upload\/[^/]*(?:c_|w_|h_|f_|q_)/.test(url);
}

/**
 * OG/Twitter preview image.
 *
 * Cloudinary-hosted photos are requested as a real 1200x630 crop so the
 * declared width/height always match the bytes a crawler actually fetches.
 * For anything else (local static assets, Unsplash fallbacks) the dimensions
 * are omitted rather than declared incorrectly — crawlers then read them
 * straight from the image instead of being told a wrong aspect ratio.
 */
export function buildOgImage(image, alt) {
  const absolute = getImageUrl(image);
  if (!absolute) return null;
  if (absolute.includes(CLOUDINARY_UPLOAD_PATH) && !hasTransform(absolute)) {
    return {
      url: absolute.replace(CLOUDINARY_UPLOAD_PATH, `${CLOUDINARY_UPLOAD_PATH}${OG_TRANSFORM}/`),
      width: OG_WIDTH,
      height: OG_HEIGHT,
      alt,
    };
  }
  return { url: absolute, alt };
}

function getCanonicalUrl(routeId) {
  return `${SITE_URL}/btech-lateral-entry/${routeId}`;
}

// ---- /btech-lateral-entry (listing page) ------------------------------------
// Mirrors the copy btechLe.js sets client-side. It previously pointed og:image at
// `${SITE_URL}/og-btech-lateral-entry.jpg`, a file that does not exist in public/
// (the tag was a 404 for any crawler that ran JS), so the image now comes from the
// top-ranked college's own photo through buildOgImage().
export const BTECH_LE_LISTING_TITLE = 'Top B.Tech Lateral Colleges in Jharkhand 2026 | Fees, Cutoff & Placements';
export const BTECH_LE_LISTING_DESCRIPTION = 'Compare top B.Tech lateral entry / D2D colleges in Jharkhand — BIT Sindri, UCET Hazaribagh, GEC Palamu & more. Check fees, branch-wise cutoff ranks, placement rates and seats. Admission via JCECEB D2D 2026 counselling.';

export function getBtechLeListingMetadata() {
  const canonical = `${SITE_URL}/btech-lateral-entry`;
  const top = resolveCollege('bit-sindri');
  const ogImage = buildOgImage(top?.image, 'B.Tech Lateral Entry (D2D) colleges in Jharkhand');

  return {
    title: BTECH_LE_LISTING_TITLE,
    description: BTECH_LE_LISTING_DESCRIPTION,
    alternates: { canonical },
    openGraph: {
      title: BTECH_LE_LISTING_TITLE,
      description: BTECH_LE_LISTING_DESCRIPTION,
      url: canonical,
      siteName: 'Futurely',
      locale: 'en_IN',
      type: 'website',
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@futurely_in',
      title: BTECH_LE_LISTING_TITLE,
      description: BTECH_LE_LISTING_DESCRIPTION,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export function getBtechLeCollege(routeId) {
  return resolveCollege(routeId);
}

export function buildBtechLeSchemas(routeId) {
  const d = resolveCollege(routeId);
  if (!d) return { webPageSchema: {}, collegeSchema: {}, breadcrumbSchema: {} };
  const canonicalUrl = getCanonicalUrl(routeId);
  const { pageTitle, metaDescription } = getPageCopy(routeId, d);
  const imageUrl = getImageUrl(d.image);
  const totalSeats = d.courses ? d.courses.reduce((a, c) => a + (c.seats || 0), 0) : 0;

  return {
    webPageSchema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: pageTitle,
      description: metaDescription,
      url: canonicalUrl,
    },
    collegeSchema: {
      '@context': 'https://schema.org',
      '@type': 'CollegeOrUniversity',
      name: d.name,
      description: d.tagline,
      url: canonicalUrl,
      image: imageUrl,
      foundingDate: d.established,
      address: {
        '@type': 'PostalAddress',
        addressLocality: d.city,
        addressRegion: d.state,
        addressCountry: 'IN',
      },
      parentOrganization: {
        '@type': 'CollegeOrUniversity',
        name: d.affiliation,
      },
      numberOfStudents: totalSeats,
    },
    breadcrumbSchema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'B.Tech Lateral Entry Colleges', item: `${SITE_URL}/btech-lateral-entry` },
        { '@type': 'ListItem', position: 3, name: d.name, item: canonicalUrl },
      ],
    },
  };
}

export function getBtechLeMetadata(routeId) {
  const d = resolveCollege(routeId);
  if (!d) return {};
  const canonicalUrl = getCanonicalUrl(routeId);
  const { pageTitle, metaDescription } = getPageCopy(routeId, d);
  const imageUrl = getImageUrl(d.image);
  const ogImage = buildOgImage(d.image, `${d.name} campus`);

  if (routeId === 'bit-sindri') {
    return {
      title: pageTitle,
      description: metaDescription,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: pageTitle,
        description: metaDescription,
        url: canonicalUrl,
        images: [{ url: imageUrl, alt: `${d.name} campus` }],
      },
      twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description: metaDescription,
        images: [imageUrl],
      },
    };
  }

  return {
    title: pageTitle,
    description: metaDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: pageTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: 'Futurely',
      locale: 'en_IN',
      type: 'website',
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@futurely_in',
      title: pageTitle,
      description: metaDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}
