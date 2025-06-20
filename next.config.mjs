/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["pdfkit"],
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },serverRuntimeConfig: {
    maxFileSize: '50mb',
  },
  publicRuntimeConfig: {
    maxFileSize: '50mb',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};


export default nextConfig;