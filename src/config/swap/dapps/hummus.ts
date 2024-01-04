import { metis } from '@/config/tokens/metis';

const basic = {
  name: 'Hummus',
  logo: 'https://ipfs.near.social/ipfs/bafkreiaiitmjkwsqrrfppr3funhnuxjrb3lca533adgphq577chhmygua4',
  amountOutFn: 'bluebiu.near/widget/Metis.Swap.HummusExchangeAmountOut',
};
const networks = {
  1088: {
    routerAddress: '0x95B4F64c2a96F770C1b4216e18ED692C01506437',
    defaultCurrencies: {
      input: metis['weth'],
      output: metis['m.usdc'],
    },
    tokens: [metis['weth'], metis['m.usdc'], metis['m.usdt'], metis['m.dai'], metis['m.wbtc'], metis['metis']],
  },
};

export { basic, networks };
