import { COLLEGES_DETAIL } from '@/src/data-college/diploma/gpaData';

export const SITE_URL = 'https://www.futurely.in';

export const viewport = {
  themeColor: '#0d9488',
  width: 'device-width',
  initialScale: 1,
};

export function getDiplomaCollege(collegeId) {
  return COLLEGES_DETAIL[collegeId] || null;
}

export function getDiplomaCanonicalUrl(collegeId) {
  return `${SITE_URL}/diploma/${collegeId}`;
}

function getDiplomaPageCopy(college) {
  const title = `${college.name}: Admission, Fees, Cutoff 2027`;
  const branchNames = college.courses?.map((course) => course.name).join(', ') || 'engineering diploma courses';
  const feeTotal = college.fees?.totalApproxFirstYear || college.fees?.total || college.fees || 0;
  const description = `${college.tagline} Courses: ${branchNames}. Fees from ₹${Math.round(feeTotal).toLocaleString('en-IN')}. Admission through JCECEB PECE counselling.`;
  return { title, description };
}

function getImageUrl(image) {
  const imageSrc = typeof image === 'string' ? image : image?.src || '';
  return imageSrc.startsWith('http') ? imageSrc : `${SITE_URL}${imageSrc}`;
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
function buildOgImage(image, alt) {
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

export function buildCollegeSchemas(college, canonicalUrl, breadcrumbLabel = 'Diploma Colleges') {
  const { title, description } = getDiplomaPageCopy(college);
  const imageUrl = getImageUrl(college.image);
  const totalSeats = college.courses?.reduce((total, course) => total + (course.seats || 0), 0) || 0;

  return {
    webPageSchema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: canonicalUrl,
    },
    collegeSchema: {
      '@context': 'https://schema.org',
      '@type': 'CollegeOrUniversity',
      name: college.name,
      description: college.tagline,
      url: canonicalUrl,
      image: imageUrl,
      foundingDate: college.established,
      address: {
        '@type': 'PostalAddress',
        addressLocality: college.city,
        addressRegion: college.state,
        addressCountry: 'IN',
      },
      parentOrganization: {
        '@type': 'CollegeOrUniversity',
        name: college.affiliation,
      },
      numberOfStudents: totalSeats,
    },
    breadcrumbSchema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: breadcrumbLabel, item: `${SITE_URL}/diploma` },
        { '@type': 'ListItem', position: 3, name: college.name, item: canonicalUrl },
      ],
    },
  };
}

export function getDiplomaMetadata(collegeId) {
  const college = getDiplomaCollege(collegeId);

  if (!college) {
    return {};
  }

  const { title, description } = getDiplomaPageCopy(college);
  const canonical = getDiplomaCanonicalUrl(college.id);
  const ogImage = buildOgImage(college.image, `${college.name} campus`);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Futurely',
      locale: 'en_IN',
      type: 'website',
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@futurely_in',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}
