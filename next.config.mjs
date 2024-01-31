/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  httpAgentOptions: {
    keepAlive: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
