import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'DODO',
  logo: '/images/apps/',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.DodoAmountOut',
};
const networks = {
  534352: {
    routerAddress: '0x20E77aD760eC9E922Fd2dA8847ABFbB2471B92CD',
    defaultCurrencies: {
      input: scroll['eth'],
      output: scroll['usdc'],
    },
    tokens: [
      scroll['weth'],
      scroll['usdc'],
      scroll['dai'],
      scroll['wbtc'],
      scroll['eth'],
      scroll['wsteth'],
      scroll['usdt'],
      scroll['dodo'],
    ],
  },
};

export { basic, networks };
