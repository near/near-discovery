import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'Velocore V2',
  logo: '/images/apps/velocore.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.VelocoreV2AmountOut',
};
const networks = {
  59144: {
    routerAddress: '0x1d0188c4B276A09366D05d6Be06aF61a73bC7535',
    factoryAddress: '0xBe6c6A389b82306e88d74d1692B67285A9db9A47',
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc'],
    },
    tokens: [
      linea['weth'],
      linea['eth'],
      linea['busd'],
      linea['dai'],
      linea['usdt'],
      linea['wbtc'],
      linea['bnb'],
      linea['wsteth'],
      linea['usdc'],
    ],
  },
};

export { basic, networks };
