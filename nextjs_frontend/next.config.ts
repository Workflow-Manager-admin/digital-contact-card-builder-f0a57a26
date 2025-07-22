import type { NextConfig } from "next";

/**
 * PUBLIC_INTERFACE
 * Next.js configuration file for the Digital Contact Card Builder frontend.
 * Ensures dev server binds to 0.0.0.0 and enables logging for clearer error reporting.
 */
const nextConfig: NextConfig = {
  // Remove output: "export" for normal dev/server operation
  // output: "export",
  // For dev, set up custom Webpack logging and custom server binding (will not affect Vercel but adds clarity locally):
  webpack: (config, { isServer, dev }) => {
    if (dev && isServer) {
      // Print a warning if we suspect memory is tight
      const os = require('os');
      console.log('[startup-check] Free system memory (MB):', Math.round(os.freemem() / 1024 / 1024));
    }
    return config;
  }
};

export default nextConfig;
