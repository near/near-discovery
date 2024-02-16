import { arbitrum } from '@/config/tokens/arbitrum';

const basic = {
  name: 'Chronos V1',
  logo: '/images/apps/chronos.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ChronosV1AmountOut',
};
const networks = {
  42161: {
    factoryAddress: '0xCe9240869391928253Ed9cc9Bcb8cb98CB5B0722 ',
    routerAddress: '0xE708aA9E887980750C040a6A2Cb901c37Aa34f3b',
    defaultCurrencies: {
      input: arbitrum['weth'],
      output: arbitrum['usdc'],
    },
    tokens: [
      arbitrum['wusdrv3'],
      arbitrum['usdc'],
      arbitrum['frax'],
      arbitrum['usd+'],
      arbitrum['chr'],
      arbitrum['usdc.e'],
      arbitrum['weth'],
      arbitrum['deus'],
      arbitrum['arb'],
      arbitrum['dai+'],
    ],
  },
};

export { basic, networks };
