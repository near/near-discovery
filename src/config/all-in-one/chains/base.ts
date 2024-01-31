export default {
  title: 'Base',
  path: 'base',
  icon: 'https://assets.dapdap.net/images/bafkreientyvw2l6v2jvtcq5pptg5xftj2dyobnk3yaykbu5mb6tpomzc3q.svg',
  bgColor: '#0038FF',
  bgIcon: '/images/chains/base_white.svg',
  selectBgColor: '#0038FF',
  chainId: 8453,
  rpcUrls: ['https://developer-access-mainnet.base.org'],
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Base.Bridge',
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Base.BaseDex',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Base.Lending',
    },
  },
};
