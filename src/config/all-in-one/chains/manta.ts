export default {
  title: 'Manta',
  path: 'manta',
  icon: '/images/chains/manta.svg',
  bgColor: '#fff',
  selectBgColor: '#35bde3',
  chainId: 169,
  rpcUrls: ['https://1rpc.io/manta'],
  defaultTab: 'Swap',
  menuConfig: {
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Manta.Swap',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Manta.Lending',
    },
  },
};
