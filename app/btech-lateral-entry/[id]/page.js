import { notFound } from 'next/navigation';
import BtechLeCollegeDetail from '@/src/data-college/btech-le/BtechLeCollegeDetail';
import {
  BTECH_LE_ROUTES,
  ROUTE_CUSTOM_IDS,
  buildBtechLeSchemas,
  getBtechLeCollege,
  getBtechLeMetadata,
  viewport as btechLeViewport,
} from '../metadata';

export const viewport = btechLeViewport;

// Only the 14 routed slugs are valid; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return BTECH_LE_ROUTES.map((id) => ({ id }));
}

export function generateMetadata({ params }) {
  return getBtechLeMetadata(params.id);
}

export default function Page({ params }) {
  const college = getBtechLeCollege(params.id);

  if (!college) {
    notFound();
  }

  const customId = ROUTE_CUSTOM_IDS[params.id] || params.id;

  // bit-sindri never had page-level schemas; the shared component provides them.
  if (params.id === 'bit-sindri') {
    return <BtechLeCollegeDetail customId={customId} routeSlug={params.id} />;
  }

  const { webPageSchema, collegeSchema, breadcrumbSchema } = buildBtechLeSchemas(params.id);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BtechLeCollegeDetail customId={customId} routeSlug={params.id} />
    </>
  );
}
