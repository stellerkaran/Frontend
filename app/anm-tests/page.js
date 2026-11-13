import ANMTestsClient from "./ANMTestsClient";

export const metadata = {
  title: "ANM 2026 Test Series | Futurely",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ANMTestsPage() {
  return (
    <>
      <meta name="google-adsense-page" content="none" />
      <ANMTestsClient />
    </>
  );
}
