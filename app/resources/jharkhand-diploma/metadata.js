/**
 * Shared metadata + JSON-LD builders for the diploma semester landing pages.
 *
 * WHY
 * ---
 * 15 of the 16 `/resources/jharkhand-diploma/semester-*` pages carried an
 * identical ~65 line block: the same faqSchema / collectionSchema wrappers, the
 * same publisher object, the same openGraph+twitter shape, and the same
 * `og-image.png` asset. Only the strings differed per page. Those wrappers now
 * live here once; each page keeps its own text in `./config`.
 *
 * NOTHING about the emitted JSON changes -- `buildFaqSchema` and
 * `buildCollectionSchema` reproduce the previous object literals field for
 * field, including key order, so the serialised output is byte-identical.
 */

export const SITE_URL = "https://www.futurely.in";

const OG_IMAGE = `${SITE_URL}/og-image.png`;

const PUBLISHER = {
  "@type": "Organization",
  name: "Futurely",
  url: SITE_URL,
};

/**
 * Build the FAQPage JSON-LD from a `[{ question, answer }]` list.
 * Key order preserved from the original per-page literals.
 */
export function buildFaqSchema(faqData) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-IN",
    mainEntity: faqData.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/**
 * Build the CollectionPage JSON-LD for a semester page.
 * `slug` is the route segment, e.g. "semester-3-civil".
 */
export function buildCollectionSchema({ slug, name, description }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    inLanguage: "en-IN",
    name,
    description,
    url: `${SITE_URL}/resources/jharkhand-diploma/${slug}`,
    publisher: { ...PUBLISHER },
  };
}

/**
 * Build the Next.js `metadata` export for a semester page.
 *
 * The original per-page objects always set the same fields in the same order,
 * so this reproduces them exactly. `config.title` / `config.description` feed
 * every field that previously repeated the same string.
 */
export function buildSemesterMetadata(config) {
  const url = `${SITE_URL}/resources/jharkhand-diploma/${config.slug}`;
  return {
    title: config.title,
    description: config.description,
    robots: config.robots ?? "index, follow",
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: config.ogTitle ?? config.title,
      description: config.ogDescription ?? config.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: config.twitterTitle ?? config.title,
      description: config.twitterDescription ?? config.description,
      images: [OG_IMAGE],
    },
  };
}