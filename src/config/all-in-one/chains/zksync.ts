export default {
  title: 'zkSync',
  path: 'zksync',
  icon: 'https://assets.dapdap.net/images/bafkreicwo7gbj23ay4r6w5wwdwllyaxd6eo4w2cngr64sp26z5wmke7xju.svg',
  bgColor: '#FFFFFF',
  bgIcon: '/images/chains/zksync_white.svg',
  selectBgColor: '#3b6bdc',
  chainId: 324,
  rpcUrls: ['https://mainnet.era.zksync.io'],
  defaultTab: 'Lending',
  menuConfig: {
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/zkSync.Swap.Dex',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/zkSync.Lending',
    },
  },
};
