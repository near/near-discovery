export default {
  title: 'Arbitrum',
  path: 'arbitrum',
  icon: 'https://assets.dapdap.net/images/bafkreicxdjysr5urjg2hfpfts2b7ptb6q3fge7ncuhzw4puqybi4dwlbdu.svg',
  bgColor: '#3564AB',
  selectBgColor: '#3564AB',
  chainId: 42161,
  rpcUrls: ['https://arb1.arbitrum.io/rpc'],
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Arbitrum.Bridge',
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Arbitrum.Swap.Dex',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Arbitrum.Lending',
    },
  },
};
