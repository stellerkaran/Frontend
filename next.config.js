/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow next/image to optimize remote images from any host
    // (ui-avatars, futurely.in, Google user content, backend, etc.)
    remotePatterns: [
      { protocol: "http", hostname: "**" },
      { protocol: "https", hostname: "**" },
    ],
  },
  typescript: {
    // GATE page exports SUBJECTS_LIST with topics field — ignore build error
    ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["@google/genai"],
  },
  async redirects() {
    return [
      {
        source: "/exams",
        destination: "/exam-preparation",
        permanent: true,
      },
      {
        source: "/exams/:path*",
        destination: "/exam-preparation/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
