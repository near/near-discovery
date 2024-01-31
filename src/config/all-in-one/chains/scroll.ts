export default {
  title: 'Scroll',
  path: 'scroll',
  icon: '/images/chains/scroll.svg',
  bgIcon: '/images/chains/scroll_white.svg',
  bgColor: '#fff',
  selectBgColor: '#35bde3',
  chainId: 534352,
  rpcUrls: ['https://rpc.scroll.io'],
  defaultTab: 'Swap',
  menuConfig: {
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Scroll.Swap',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Scroll.Lending',
    },
  },
};
