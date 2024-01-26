import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'Zebra',
  logo: '/images/apps/',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.RamsesV2AmountOut',
};
const networks = {
  534352: {
    factoryAddress: '0x96a7F53f7636c93735bf85dE416A4Ace94B56Bd9',
    routerAddress: '0x5A4c258a6c7a6a6816eC6a71FF2187D20178781d',
    quoterAddress: '0xbC92FAfA262458F05986B2F7B1056c21f812ba48',
    fees: [500, 3000, 10000],
    defaultCurrencies: {
      input: scroll['eth'],
      output: scroll['usdc'],
    },
    tokens: [
      scroll['usdc'],
      scroll['dai'],
      scroll['eth'],
      scroll['weth'],
      scroll['reth'],
      scroll['aave'],
      scroll['crv'],
      scroll['lusd'],
    ],
  },
};

export { basic, networks };
