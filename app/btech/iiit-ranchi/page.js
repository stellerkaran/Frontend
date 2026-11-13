import IiitRanchi from '@/src/data-college/btech/iiit-ranchi';
import {
  buildBtechSchemas,
  getBtechCanonicalUrl,
  getBtechCollege,
  getBtechMetadata,
} from '../metadata';

export function generateMetadata() {
  return getBtechMetadata('iiit-ranchi');
}

export default function Page() {
  const college = getBtechCollege('iiit-ranchi');

  if (!college) {
    return <IiitRanchi />;
  }

  const canonicalUrl = getBtechCanonicalUrl(college.id);
  const { webPageSchema, collegeSchema, breadcrumbSchema } = buildBtechSchemas(college, canonicalUrl);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <IiitRanchi />
    </>
  );
}
