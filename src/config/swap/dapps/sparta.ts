import { arbitrum } from '@/config/tokens/arbitrum';
const basic = {
  name: 'Spartadex',
  logo: '/images/apps/sparta.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};
const networks = {
  42161: {
    factoryAddress: '0xFe8EC10Fe07A6a6f4A2584f8cD9FE232930eAF55',
    routerAddress: '0x89AE36E3B567b914a5E97E6488C6EB5b9C5d0231',
    defaultCurrencies: {
      input: arbitrum['eth'],
      output: arbitrum['usdc.e'],
    },
    tokens: [
      arbitrum['eth'],
      arbitrum['weth'],
      arbitrum['usdc.e'],
      arbitrum['sparta'],
      arbitrum['arb'],
      arbitrum['wbtc'],
      arbitrum['usdt'],
      arbitrum['gswift'],
    ],
  },
};

export { basic, networks };
