export default {
  title: 'BSC',
  path: 'bsc',
  icon: 'https://assets.dapdap.net/images/bafkreiczurnr4ai5epzfovu4btugbrfsoc57d42wnz22kdjmogz3ewfgcm.svg',
  bgColor: '#FFBF19',
  bgIcon: '/images/chains/bnb_white.svg',
  selectBgColor: '#FFBF19',
  chainId: 56,
  rpcUrls: ['https://binance.llamarpc.com'],
  defaultTab: 'Lending',
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Bsc.Bridge',
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Bsc.Swap.Dex',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Bsc.Lending',
    },
  },
};
