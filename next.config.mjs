/** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

export default {
  async redirects() {
    console.log("Applying redirect from '/' to '/admin'");
    return [
      {
        source: "/",
        destination: "/admin/signIn",
        permanent: false,
      },
    ];
  },
};

// export default {
//   async redirects() {
//     return [
//       {
//         source: "/",
//         destination: "/admin/SignIn",
//         permanent: true,
//       },
//     ];
//   },
// };
