import { notFound } from 'next/navigation';
import DiplomaCollegeDetail from '@/src/data-college/diploma/DiplomaCollegeDetail';
import { COLLEGES_DETAIL } from '@/src/data-college/diploma/gpaData';
import {
  buildCollegeSchemas,
  getDiplomaCanonicalUrl,
  getDiplomaCollege,
  getDiplomaMetadata,
  viewport as diplomaViewport,
} from '../metadata';

export const viewport = diplomaViewport;

// Only the colleges present in COLLEGES_DETAIL are valid; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(COLLEGES_DETAIL).map((id) => ({ id }));
}

export function generateMetadata({ params }) {
  return getDiplomaMetadata(params.id);
}

export default function Page({ params }) {
  const college = getDiplomaCollege(params.id);

  if (!college) {
    notFound();
  }

  const canonicalUrl = getDiplomaCanonicalUrl(college.id);
  const { webPageSchema, collegeSchema, breadcrumbSchema } = buildCollegeSchemas(college, canonicalUrl);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <DiplomaCollegeDetail customId={params.id} />
    </>
  );
}