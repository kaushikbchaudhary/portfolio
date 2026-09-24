/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: []
  },
  async redirects() {
    return [{ source: "/devices", destination: "/", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
