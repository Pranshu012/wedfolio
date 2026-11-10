import type { NextConfig } from 'next';

const isGithubActions = Boolean(process.env.GITHUB_ACTIONS);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  output: isGithubActions ? 'export' : undefined,
  basePath: isGithubActions ? '/wedfolio' : '',
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
