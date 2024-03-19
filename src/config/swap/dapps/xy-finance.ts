import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'XY Finance',
  logo: '/images/apps/xy-finance.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.XYFinance',
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
