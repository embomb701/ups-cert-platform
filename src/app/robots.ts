import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masteringfse.com';

// Site is in beta and not yet open to the public — block all crawling until
// launch. Flip back to the allow-list below (public pages open, private
// paths blocked) when going live.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
  };
}

// --- Post-launch config (public pages crawlable, private paths blocked) ---
// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: [
//       {
//         userAgent: '*',
//         allow: '/',
//         disallow: [
//           '/admin/',
//           '/account/',
//           '/dashboard/',
//           '/settings/',
//           '/exam/',
//           '/invite/',
//           '/certificate/',
//           '/candidates/',
//           '/api/',
//           '/checkout/',
//         ],
//       },
//     ],
//     sitemap: `${SITE_URL}/sitemap.xml`,
//   };
// }
