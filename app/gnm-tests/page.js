

import GNMTestsClient from "./GNMTestsClient";

export const metadata = {
  title: "GNM 2026 Test Series | Futurely",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GNMTestsPage() {
  return (
    <>
      <meta name="google-adsense-page" content="none" />
      <GNMTestsClient />
    </>
  );
}
