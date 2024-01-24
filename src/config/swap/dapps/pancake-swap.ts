import { polygonZkevm } from '@/config/tokens/polygonZkevm';

const basic = {
  name: 'Pancake Swap',
  logo: '/images/apps/pancake.png',
  amountOutFn: 'bluebiu.near/widget/PolygonZkevm.Swap.PancakeSwapAmountOut',
};
const networks = {
  1101: {
    routerAddress: '0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86',
    quoterAddress: '0x55BeE1bD3Eb9986f6d2d963278de09eE92a3eF1D',
    defaultCurrencies: {
      input: polygonZkevm['eth'],
      output: polygonZkevm['usdc'],
    },
    tokens: [polygonZkevm['eth'], polygonZkevm['usdc'], polygonZkevm['weth'], polygonZkevm['usdt']],
  },
};

export { basic, networks };
