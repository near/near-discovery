import { optimism } from '@/config/tokens/optimism';
const basic = {
  name: 'Beethoven X',
  logo: '/images/apps/beethoven-x.png',
  amountOutFn: 'bluebiu.near/widget/Metis.Swap.HummusExchangeAmountOut',
};
const networks = {
  10: {
    routerAddress: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
    defaultCurrencies: {
      input: optimism['weth'],
      output: optimism['usdc.e'],
    },
    tokens: [
      optimism['op'],
      optimism['usdc.e'],
      optimism['wbtc'],
      optimism['usdt'],
      optimism['usdc'],
      optimism['susd'],
      optimism['dai'],
      optimism['beets'],
      optimism['weth'],
      optimism['lusd'],
    ],
    pools: [
      [
        [optimism['usdc'].address, optimism['usdc.e'].address, optimism['usdt'].address, optimism['dai'].address],
        '0x9da11ff60bfc5af527f58fd61679c3ac98d040d9000000000000000000000100',
      ],
      [
        [optimism['weth'].address, optimism['op'].address, optimism['usdc.e'].address],
        '0x39965c9dab5448482cf7e002f583c812ceb53046000100000000000000000003',
      ],
    ],
  },
};

export { basic, networks };
