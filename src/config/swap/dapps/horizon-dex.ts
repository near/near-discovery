import { base } from '@/config/tokens/base';
import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'HorizonDEX',
  logo: '/images/apps/horizon-dex.png',
  amountOutFn: 'bluebiu.near/widget/Base.Swap.HorizonDexAmountOut',
};
const networks = {
  8453: {
    factoryAddress: '0x07AceD5690e09935b1c0e6E88B772d9440F64718',
    routerAddress: '0x99AEC509174Cbf06F8F7E15dDEeB7bcC32363827',
    quoterAddress: '0x94ddDe405A00180891eD79Dc1147F0d841c30D73',
    fees: [8, 10, 40, 300, 1000],
    defaultCurrencies: {
      input: base['axlusdc'],
      output: base['eth'],
    },
    tokens: [
      base['hzn'],
      base['weth'],
      base['cbeth'],
      base['eth'],
      base['dai'],
      base['axlusdc'],
      base['usdbc'],
      base['bswap'],
      base['bald'],
    ],
  },
  59144: {
    factoryAddress: '0x9Fe607e5dCd0Ea318dBB4D8a7B04fa553d6cB2c5',
    routerAddress: '0x272E156Df8DA513C69cB41cC7A99185D53F926Bb',
    quoterAddress: '0x07AceD5690e09935b1c0e6E88B772d9440F64718',
    fees: [8, 10, 40, 300, 1000],
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc'],
    },
    tokens: [
      linea['eth'],
      linea['usdc'],
      linea['weth'],
      linea['axlusdc'],
      linea['axlusdt'],
      linea['hzn'],
      linea['busd'],
      linea['bnb'],
    ],
  },
};

export { basic, networks };
