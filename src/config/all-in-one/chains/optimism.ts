export default {
  title: 'Optimism',
  path: 'optimism',
  icon: 'https://assets.dapdap.net/images/bafkreihejurzfytybrvjy2b5vie5eppb4erhaimhtv25koseml3vhv3lse.svg',
  bgColor: '#CA0C0C',
  selectBgColor: '#CA0C0C',
  chainId: 10,
  rpcUrls: ['https://rpc.ankr.com/optimism'],
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Optimism.Bridge',
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Optimism.Dex',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Optimism.Lending',
    },
  },
};
