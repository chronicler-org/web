/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  httpAgentOptions: {
    keepAlive: true,
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
