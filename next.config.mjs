/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["pdfkit"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveExtensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'],
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.(ttf|afm)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name][ext]',
      },
    });
    return config;
  },
};

// Dynamically import user configuration
let userConfig;
try {
  // Try to import ESM user config
  userConfig = await import('./user-next.config.mjs').then(
    (mod) => mod.default || mod
  );
} catch {
  try {
    // Fallback to CJS user config
    userConfig = await import('./user-next.config').then(
      (mod) => mod.default || mod
    );
  } catch (error) {
    console.warn(
      'No user configuration found for user-next.config.mjs or user-next.config. Using default configuration.',
      error.message
    );
  }
}

// Merge user config with default config
if (userConfig) {
  Object.keys(userConfig).forEach((key) => {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key]) &&
      nextConfig[key] !== null
    ) {
      nextConfig[key] = { ...nextConfig[key], ...userConfig[key] };
    } else {
      nextConfig[key] = userConfig[key];
    }
  });
}

export default nextConfig;