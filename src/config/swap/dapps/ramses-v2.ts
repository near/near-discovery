import { arbitrum } from '@/config/tokens/arbitrum';

const basic = {
  name: 'Ramses V2',
  logo: '/images/apps/ramses.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.RamsesV2AmountOut',
};
const networks = {
  42161: {
    factoryAddress: '0xAA2cd7477c451E703f3B9Ba5663334914763edF8',
    routerAddress: '0xAA23611badAFB62D37E7295A682D21960ac85A90',
    quoterAddress: '0xAA20EFF7ad2F523590dE6c04918DaAE0904E3b20',
    fees: [50, 100, 250, 500, 3000, 10000],
    defaultCurrencies: {
      input: arbitrum['eth'],
      output: arbitrum['usdt'],
    },
    tokens: [
      arbitrum['eth'],
      arbitrum['weth'],
      arbitrum['usdc'],
      arbitrum['usdt'],
      arbitrum['arb'],
      arbitrum['ram'],
      arbitrum['frax'],
    ],
  },
};

export { basic, networks };
