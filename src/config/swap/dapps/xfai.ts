import multicall from '@/config/contract/multicall';
import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'Xfai',
  logo: '/images/apps/',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.Xfai',
};
const networks = {
  59144: {
    factoryAddress: '0xa5136eAd459F0E61C99Cec70fe8F5C24cF3ecA26',
    routerAddress: '0xD538be6e9026C13D130C9e17d509E69C8Bb0eF33',
    multicallAddress: multicall[59144],
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdt'],
    },
    tokens: [
      linea['xfit'],
      linea['usdc'],
      linea['eth'],
      linea['weth'],
      linea['wbtc'],
      linea['usdt'],
      linea['dai'],
      linea['wsteth'],
    ],
  },
};

export { basic, networks };
