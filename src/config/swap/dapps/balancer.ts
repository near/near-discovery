import { polygonZkevm } from '@/config/tokens/polygonZkevm';

const basic = {
  name: 'Balancer',
  logo: '/images/apps/balancer.png',
  amountOutFn: 'bluebiu.near/widget/PolygonZkevm.Swap.BalancerAmountOut',
};
const networks = {
  1101: {
    routerAddress: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
    quoterAddress: '0x55BeE1bD3Eb9986f6d2d963278de09eE92a3eF1D',
    defaultCurrencies: {
      input: polygonZkevm['eth'],
      output: polygonZkevm['usdc'],
    },
    tokens: [
      polygonZkevm['eth'],
      polygonZkevm['usdc'],
      polygonZkevm['weth'],
      polygonZkevm['wbtc'],
      polygonZkevm['matic'],
      polygonZkevm['usdt'],
      polygonZkevm['dai'],
    ],
  },
};

export { basic, networks };
