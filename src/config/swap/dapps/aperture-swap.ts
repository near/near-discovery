import { manta } from '@/config/tokens/manta';

const basic = {
  name: 'ApertureSwap',
  logo: '/images/apps/aperture.png',
  amountOutFn: 'bluebiu.near/widget/PolygonZkevm.Swap.QuickSwapAmountOut',
};

const networks = {
  169: {
    routerAddress: '0x3488d5A2D0281f546e43435715C436b46Ec1C678',
    quoterAddress: '0x1e139877CbB99f1fa94BB8763aFc6161cC1dc303',
    defaultCurrencies: {
      input: manta['weth'],
      output: manta['usdc'],
    },
    tokens: [
      manta['weth'],
      manta['usdc'],
      manta['usdt'],
      manta['wbtc'],
      manta['dai'],
      manta['stone'],
      manta['wusdm'],
      manta['tia'],
      manta['wsteth'],
    ],
  },
};

export { basic, networks };
