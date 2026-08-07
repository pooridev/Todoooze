const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  // The service worker is only generated for production builds; caching in
  // dev would serve stale bundles and fight with hot reload.
  disable: process.env.NODE_ENV === "development",
  fallbacks: {
    document: "/offline",
  },
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
});
