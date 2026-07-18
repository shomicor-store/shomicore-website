/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // ⚡ Whitelists all folders and image path sizes from your Cloudinary cloud bucket
      },
      {
        protocol: 'https',
        hostname: '://unsplash.com',
        pathname: '/**', // Whitelists our backup layout placeholder image domain
      }
    ],
  },
};

export default nextConfig;
