import BtechCollegeDetail from '@/src/data-college/btech/BtechCollegeDetail';
import { BTECH_COLLEGES_DETAIL } from '@/src/data-college/btech/btechData';
import {
  buildBtechSchemas,
  getBtechCanonicalUrl,
  getBtechCollege,
  getBtechMetadata,
  viewport as btechViewport,
} from '../metadata';

export const viewport = btechViewport;

/**
 * The college records are static build-time data, so this route can be fully
 * pre-rendered. Previously it was "Dynamic": every hit invoked a Function and
 * re-rendered identical HTML, all of which is charged as Fast Origin Transfer.
 *
 * `dynamicParams = false` means an unknown slug 404s at the edge instead of
 * invoking a Function. The old fallback path rendered a default record for
 * unknown slugs; `getBtechCollege()` returning null for those is handled by
 * the global not-found page, which is the correct result for an invalid URL.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(BTECH_COLLEGES_DETAIL).map((id) => ({ 'college-id': id }));
}

export function generateMetadata({ params }) {
  return getBtechMetadata(params?.['college-id']);
}

export default function Page({ params }) {
  const collegeId = params?.['college-id'];
  const college = getBtechCollege(collegeId);

  // Unknown slug: the shared component falls back to its own default record,
  // so render it without schemas instead of emitting metadata for another college.
  if (!college) {
    return <BtechCollegeDetail customId={collegeId} />;
  }

  const canonicalUrl = getBtechCanonicalUrl(college.id);
  const { webPageSchema, collegeSchema, breadcrumbSchema } = buildBtechSchemas(college, canonicalUrl);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BtechCollegeDetail customId={collegeId} />
    </>
  );
}
