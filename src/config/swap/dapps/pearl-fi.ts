import { polygon } from '@/config/tokens/polygon';

const basic = {
  name: 'PearlFi',
  logo: '/images/apps/pearl-fi.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ChronosV1AmountOut',
};
const networks = {
  137: {
    factoryAddress: '0xd541Bc203Cc2B85810d9b8E6a534eed1615528E2',
    routerAddress: '0xcC25C0FD84737F44a7d38649b69491BBf0c7f083',
    defaultCurrencies: {
      input: polygon['eth'],
      output: polygon['usdc'],
    },
    tokens: [
      polygon['eth'],
      polygon['usdc'],
      polygon['usdr'],
      polygon['dai'],
      polygon['wusdr'],
      polygon['usdt'],
      polygon['matic'],
      polygon['cvr'],
      polygon['pearl'],
    ],
  },
};

export { basic, networks };
