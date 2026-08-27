/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin'],
    // Include raw question JSON files in the import-from-server serverless function
    // so they can be read with fs.readFileSync instead of being webpack-bundled.
    outputFileTracingIncludes: {
      '/api/admin/import-from-server': ['./data/questions/**'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      // Google sign-in profile photos — the only OAuth provider this app
      // supports (see src/lib/firebase/auth.ts); email/password users have
      // no photoURL at all, so this is the one external avatar host that
      // ever actually appears.
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // face-api.js uses canvas (server-side) and fs — exclude both from browser bundle
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    if (!isServer) {
      config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    }
    return config;
  },
};

module.exports = nextConfig;
