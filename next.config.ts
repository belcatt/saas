import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Keep Next from walking up into /Volumes/HomeX/bcatt
  outputFileTracingRoot: __dirname,

  webpack: (config) => {
    // Force a single copy of react/react-dom from THIS app
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    };
    return config;
  },
};

export default nextConfig;
