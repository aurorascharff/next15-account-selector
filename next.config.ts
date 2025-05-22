import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    inlineCss: true,
    reactCompiler: true,
    staleTimes: {
      dynamic: 30,
    },
    viewTransition: true,
  },
};

module.exports = nextConfig;
