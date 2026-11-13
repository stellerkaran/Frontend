import NitJamshedpur from '@/src/data-college/btech/nit-jamshedpur';
import {
  buildBtechSchemas,
  getBtechCanonicalUrl,
  getBtechCollege,
  getBtechMetadata,
} from '../metadata';

export function generateMetadata() {
  return getBtechMetadata('nit-jamshedpur');
}

export default function Page() {
  const college = getBtechCollege('nit-jamshedpur');

  if (!college) {
    return <NitJamshedpur />;
  }

  const canonicalUrl = getBtechCanonicalUrl(college.id);
  const { webPageSchema, collegeSchema, breadcrumbSchema } = buildBtechSchemas(college, canonicalUrl);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <NitJamshedpur />
    </>
  );
}
