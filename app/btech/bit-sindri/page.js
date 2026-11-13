import BitSindri from '@/src/data-college/btech/bit-sindri';
import {
  buildBtechSchemas,
  getBtechCanonicalUrl,
  getBtechCollege,
  getBtechMetadata,
} from '../metadata';

export function generateMetadata() {
  return getBtechMetadata('bit-sindri');
}

export default function Page() {
  const college = getBtechCollege('bit-sindri');

  if (!college) {
    return <BitSindri />;
  }

  const canonicalUrl = getBtechCanonicalUrl(college.id);
  const { webPageSchema, collegeSchema, breadcrumbSchema } = buildBtechSchemas(college, canonicalUrl);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BitSindri />
    </>
  );
}
