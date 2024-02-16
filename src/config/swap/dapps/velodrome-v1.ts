import { optimism } from '@/config/tokens/optimism';
const basic = {
  name: 'Velodrome V1',
  logo: '/images/apps/velodrome.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ChronosV1AmountOut',
};
const networks = {
  10: {
    factoryAddress: '0x25CbdDb98b35ab1FF77413456B31EC81A6B6B746',
    routerAddress: '0x9c12939390052919aF3155f41Bf4160Fd3666A6f',
    defaultCurrencies: {
      input: optimism['weth'],
      output: optimism['usdc.e'],
    },
    tokens: [
      optimism['weth'],
      optimism['usdc.e'],
      optimism['op'],
      optimism['mseth'],
      optimism['stg'],
      optimism['mai'],
      optimism['susd'],
      optimism['snx'],
      optimism['wbtc'],
    ],
  },
};

export { basic, networks };
