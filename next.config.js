/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compiler: { styledComponents: true },
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/stackoverflow',
        destination:
          '/near/widget/NearOrg.HomePage?utm_source=stack&utm_medium=podcast&utm_campaign=stackoverflow_evergreen_bos_awareness',
        permanent: false,
      },
      {
        source: '/stakewars',
        destination: 'https://github.com/near/stakewars-iv',
        permanent: false,
      },
      {
        source: '/nearcon23.near/widget/Index',
        destination: 'https://nearcon.app',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: 'https://near.org/blog/:path*',
        permanent: false,
      },
      {
        source: '/ecosystem/get-funding',
        destination: 'https://near.org/ecosystem/get-funding',
        permanent: false,
      },
      {
        source: '/consensus',
        destination: 'https://nearconsensus2023.splashthat.com/',
        permanent: false,
      },
      {
        source: '/docs',
        destination: 'https://docs.near.org',
        permanent: true,
      },
      {
        source: '/ethcc',
        destination: 'https://www.eventbrite.com/e/near-ethcc-tickets-655229297467',
        permanent: false,
      },
      {
        source: '/pitch',
        destination: 'https://nearpitchfestconsensus.splashthat.com/',
        permanent: false,
      },
      {
        source: '/developer-governance',
        destination: 'https://neardevgov.org/',
        permanent: false,
      },
      {
        source: '/validators',
        destination: 'https://pages.near.org/validators',
        permanent: true,
      },
      {
        source: '/da',
        destination: '/data-availability',
        permanent: true,
      },
      {
        //TODO - remove in Q2 2024
        source: '/files/:slug',
        destination: 'https://discovery-domain.org/papers/:slug.pdf',
        permanent: false,
      },
      {
        source: '/papers/:slug',
        destination: 'https://discovery-domain.org/papers/:slug.pdf',
        permanent: false,
      },
      {
        source: '/ethdenver',
        destination: 'https://pages.near.org/ethdenver2024',
        permanent: true,
      },
      {
        source: '/horizon',
        destination: '/founders',
        permanent: true,
      },
      {
        source: '/signin',
        destination: '/applications?requestAuth=1',
        permanent: false,
      },
      {
        source: '/signup',
        destination: '/applications?requestAuth=1&createAccount=1',
        permanent: false,
      },
      {
        source: '/assessments',
        destination: 'https://airtable.com/appr1nBRRGx2PTJVh/shrpa99vKKW3xafso',
        permanent: false,
      },
      {
        source: '/blog/getting-started-with-the-near-wallet',
        destination: 'https://wallet.near.org',
        permanent: true,
      },
    ];
  },
  rewrites: async () => [
    {
      source: '/api/analytics/:path*',
      destination: 'https://near.dataplane.rudderstack.com/:path*',
    },
    {
      source: '/blog/:path*',
      destination: '/blog/:path*/index.html',
    },
  ],
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ],
};

const withPWA = require('next-pwa')({
  dest: 'public',
  sw: 'next-pwa-sw.js',
  scope: '/',
  importScripts: ['/pwa.js'],
  cacheStartUrl: false,
  cacheOnFrontEndNav: true,
  skipWaiting: false,
});
const { loadEnvConfig } = require('@next/env');
loadEnvConfig('.');
module.exports = withPWA(nextConfig);

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    org: 'near-protocol',
    project: 'near-discovery',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
);
