// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this block to explicitly disable Turbopack in development mode
  // This forces Next.js to use the stable Webpack compiler.
  // This often resolves deep, persistent source map errors.
  webpack: (config, { isServer }) => {
    if (process.env.NODE_ENV === "development") {
      config.devtool = "cheap-module-source-map";
    }
    return config;
  },

  // Ensure the environment variable is still exposed correctly
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default nextConfig;
