import type { NextConfig } from 'next';

const isGithubActions = Boolean(process.env.GITHUB_ACTIONS);
const basePath = isGithubActions ? '/wedfolio' : '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  output: isGithubActions ? 'export' : undefined,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: isGithubActions,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
