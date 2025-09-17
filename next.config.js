module.exports = {
  async redirects() {
    return [
      {
        source: "/:username/widget/:component",
        destination: "https://near.social/:username/widget/:component",
        permanent: true,
      },
      {
        source: '/tools',
        destination: 'https://docs.near.org/toolbox',
        permanent: true,
      },
      {
        source: '/applications',
        destination: 'https://nearcatalog.xyz/',
        permanent: true,
      },
      {
        source: '/:path',
        permanent: false,
        destination: 'https://docs.near.org/:path',
      },
      {
        source: '/',
        permanent: false,
        destination: 'https://docs.near.org/',
      },
    ];
  },
};