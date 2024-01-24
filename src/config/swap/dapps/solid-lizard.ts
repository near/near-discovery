import { arbitrum } from '@/config/tokens/arbitrum';

const basic = {
  name: 'SolidLizard',
  logo: '/images/apps/solid-lizard.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.SolidLizardAmountOut',
};

const networks = {
  42161: {
    factoryAddress: '0x734d84631f00dC0d3FCD18b04b6cf42BFd407074',
    routerAddress: '0xF26515D5482e2C2FD237149bF6A653dA4794b3D0',
    defaultCurrencies: {
      input: arbitrum['weth'],
      output: arbitrum['usdt'],
    },
    tokens: [
      arbitrum['weth'],
      arbitrum['usdt'],
      arbitrum['usdc.e'],
      arbitrum['sliz'],
      arbitrum['dai'],
      arbitrum['arb'],
      arbitrum['wbtc'],
    ],
  },
};

export { basic, networks };
