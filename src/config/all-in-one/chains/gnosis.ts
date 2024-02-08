export default {
  title: 'Gnosis',
  path: 'gnosis',
  icon: 'https://assets.dapdap.tech/images/bafkreiazsyndhevopspbjue3ztz5r5mypuzpa5gjragm3hdg6ey33rfheu.svg',
  bgColor: '#04795B',
  bgIcon: '/images/chains/gnosis_white.svg',
  selectBgColor: '#04795B',
  chainId: 100,
  rpcUrls: ['https://rpc.ankr.com/gnosis'],
  defaultTab: 'Swap',
  menuConfig: {
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Gnosis.Swap.Dex',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Gnosis.Lending',
    },
  },
};
