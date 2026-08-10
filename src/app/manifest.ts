import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mastering Field Service Training Portal',
    short_name: 'MasteringFSE',
    description: 'Field service training and certification — 28 career tracks in critical infrastructure.',
    start_url: '/',
    display: 'standalone',
    background_color: '#111827',
    theme_color: '#111827',
    icons: [],
  };
}
