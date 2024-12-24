/** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

export default {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/admin/SignIn",
        permanent: false,
      },
    ];
  },
};

