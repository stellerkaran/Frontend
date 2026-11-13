import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.futurely.in';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/', '/api', '/api/', '/dashboard', '/dashboard/', '/auth', '/auth/','/leaderboard' ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
