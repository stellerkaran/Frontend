import Diploma from '@/src/data-college/diploma/diploma';
import COLLEGES from '@/src/data-college/diploma/diplomaCollegesData';

const SITE_URL = 'https://www.futurely.in';

export const viewport = {
  themeColor: '#0d9488',
  width: 'device-width',
  initialScale: 1,
};

export function generateMetadata() {
  const title = 'Top Polytechnic Colleges in Jharkhand 2027 | Fees, Cutoff & Placements';
  const description = 'Compare top diploma / polytechnic colleges in Jharkhand — GP Ranchi, GP Adityapur, GP Dhanbad & more. Check fees, branch-wise cutoff ranks, placement rates and seats. Admission via JCECEB PECE 2027 counselling.';
  const canonical = `${SITE_URL}/diploma`;

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

export default function DiplomaPage() {
  const canonicalUrl = `${SITE_URL}/diploma`;

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top Polytechnic Colleges in Jharkhand',
    url: canonicalUrl,
    itemListElement: COLLEGES.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      url: `${SITE_URL}/diploma/${c.id}`,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Diploma Colleges', item: canonicalUrl },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How to get admission in polytechnic colleges in Jharkhand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Admission is through JCECEB PECE counselling by the Jharkhand Combined Entrance Competitive Examination Board.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the fee for polytechnic colleges in Jharkhand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Annual fees range from ₹3,000 to ₹30,000 per year. SC/ST candidates get fee concessions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which is the best polytechnic college in Jharkhand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GP Ranchi is ranked #1. GP Adityapur and GP Dhanbad are top choices for industry proximity.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Diploma />
    </>
  );
}
