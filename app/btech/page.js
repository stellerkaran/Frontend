import Btech from '@/src/data-college/btech/btech';

const SITE_URL = 'https://www.futurely.in';

export const viewport = {
  themeColor: '#0d9488',
  width: 'device-width',
  initialScale: 1,
};

// Mirrors the copy btech.js sets client-side (pageTitle / metaDescription),
// so the served tags and the runtime values cannot disagree.
export function generateMetadata() {
  const title = 'Top B.Tech Engineering Colleges in Jharkhand 2026 | Fees, Cutoff & Placements';
  const description = 'Compare top 7 B.Tech engineering colleges in Jharkhand — BIT Sindri, IIT (ISM) Dhanbad, NIT Jamshedpur, BIT Mesra, IIIT Ranchi, UCET Hazaribagh & GEC Ramgarh. Check fees, cutoff ranks, seats and placements.';
  const canonical = `${SITE_URL}/btech`;

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
    },
    twitter: {
      card: 'summary_large_image',
      site: '@futurely_in',
      title,
      description,
    },
  };
}

export default function Page() {
  return <Btech />;
}
