/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
      appDir: true,
  },
  async headers() {
      return [
          {
              source: '/(.*)',
              headers: [
                  { key: 'Access-Control-Allow-Origin', value: 'https://api.toleave.shop' },
                  { key: 'Access-Control-Allow-Credentials', value: 'true' },
                  { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS, DELETE, PUT' },
                  { key: 'Access-Control-Allow-Headers', value: 'Authorization, Content-Type, Refresh-Token' },
                  { key: 'Access-Control-Expose-Headers', value: 'Authorization, Refresh-Token' },
              ],
          },
      ];
  },
};

export default nextConfig;
