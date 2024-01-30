import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'DODO',
  logo: '/images/apps/dodo.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.DodoAmountOut',
};
const networks = {
  534352: {
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
