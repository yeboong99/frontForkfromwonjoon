const nextConfig = {
  async rewrites() {
    return [];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://toleave.shop/",
          },
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS, DELETE, PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Authorization, Content-Type, Refresh-Token, User-Identifier",
          },
          {
            key: "Access-Control-Expose-Headers",
            value: "Authorization, Refresh-Token, User-Identifier",
          },
        ],
      },
    ];
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
