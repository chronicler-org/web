/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  transpilePackages: ['lodash-es', 'react-icons', '@ant-design', 'antd', '@phosphor-icons/react'],
  httpAgentOptions: {
    keepAlive: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
