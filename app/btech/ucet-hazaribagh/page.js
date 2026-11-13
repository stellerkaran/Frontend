import UcetHazaribagh from '@/src/data-college/btech/ucet-hazaribagh';
import {
  buildBtechSchemas,
  getBtechCanonicalUrl,
  getBtechCollege,
  getBtechMetadata,
} from '../metadata';

export function generateMetadata() {
  return getBtechMetadata('ucet-hazaribagh');
}

export default function Page() {
  const college = getBtechCollege('ucet-hazaribagh');

  if (!college) {
    return <UcetHazaribagh />;
  }

  const canonicalUrl = getBtechCanonicalUrl(college.id);
  const { webPageSchema, collegeSchema, breadcrumbSchema } = buildBtechSchemas(college, canonicalUrl);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <UcetHazaribagh />
    </>
  );
}
