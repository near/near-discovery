export default {
  title: 'Metis',
  path: 'metis',
  icon: 'https://assets.dapdap.tech/images/bafkreiaekamkcbf7ixg3w6wl25zd4orgkmshxkz36vncpomenfu3ryymty.svg',
  bgColor: '#000000',
  bgIcon: '/images/chains/metis_white.svg',
  selectBgColor: '#00dacc',
  chainId: 1088,
  rpcUrls: ['https://andromeda.metis.io/?owner=1088'],
  defaultTab: 'Bridge',
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Metis.Bridge',
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Metis.Swap.Dex',
    },
  },
};
