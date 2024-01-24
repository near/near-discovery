import { arbitrum } from '@/config/tokens/arbitrum';

const basic = {
  name: 'Ramses V1',
  logo: '/images/apps/ramses.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ChronosV1AmountOut',
};
const networks = {
  42161: {
    factoryAddress: '0xAAA35aaEa18B0187E82A3A7f2996C9ee7Bad9696',
    routerAddress: '0xAAA87963EFeB6f7E0a2711F397663105Acb1805e',
    defaultCurrencies: {
      input: arbitrum['eth'],
      output: arbitrum['usdc.e'],
    },
    tokens: [
      arbitrum['fba'],
      arbitrum['usdc.e'],
      arbitrum['frax'],
      arbitrum['alusd'],
      arbitrum['mai'],
      arbitrum['dai+'],
      arbitrum['eth'],
      arbitrum['usd+'],
    ],
  },
};

export { basic, networks };
