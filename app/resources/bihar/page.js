import React from "react";
import BiharResourcesClient from "./BiharResourcesClient";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurely.in/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.futurely.in/resources" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Bihar Study Resources",
      item: "https://www.futurely.in/resources/bihar",
    },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  inLanguage: "en-IN",
  name: "Bihar Study Resources - Polytechnic, B.Tech Lateral & B.Sc. Nursing PYQs | Futurely",
  description:
    "Free Bihar study resources: Bihar Polytechnic (DCECE) PYQs 2018\u20132025, Bihar B.Tech Lateral Entry (BCECE LE) PYQs 2021\u20132025 and Bihar B.Sc. Nursing (BCECE PCB) PYQs 2021\u20132025. Organised, mobile-friendly, regularly updated.",
  url: "https://www.futurely.in/resources/bihar",
  publisher: { "@type": "Organization", name: "Futurely", url: "https://www.futurely.in" },
};

export const metadata = {
  title: "Bihar Study Resources - Polytechnic, B.Tech Lateral & B.Sc. Nursing PYQs | Futurely",
  description:
    "Download free Bihar study resources: Bihar Polytechnic (DCECE) PYQs (2018\u20132025), Bihar B.Tech Lateral Entry (BCECE LE) PYQs (2021\u20132025) and Bihar B.Sc. Nursing (BCECE PCB) PYQs (2021\u20132025). Organised by subject, mobile-friendly and updated regularly on Futurely.",
  alternates: {
    canonical: "https://www.futurely.in/resources/bihar",
  },
  openGraph: {
    type: "website",
    url: "https://www.futurely.in/resources/bihar",
    title: "Bihar Study Resources - Polytechnic, B.Tech Lateral & B.Sc. Nursing PYQs | Futurely",
    description:
      "Free Bihar Polytechnic (DCECE), B.Tech Lateral (BCECE LE) & B.Sc. Nursing (BCECE PCB) PYQs. Organised, mobile-friendly & updated.",
    images: [{ url: "https://www.futurely.in/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bihar Study Resources - Polytechnic, B.Tech Lateral & B.Sc. Nursing PYQs | Futurely",
    description:
      "Free Bihar Polytechnic (DCECE), B.Tech Lateral (BCECE LE) & B.Sc. Nursing (BCECE PCB) PYQs. Download on Futurely.",
    images: ["https://www.futurely.in/og-image.png"],
  },
};

export default function BiharResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <BiharResourcesClient />
    </>
  );
}
