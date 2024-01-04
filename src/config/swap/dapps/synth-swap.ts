import { base } from '@/config/tokens/base';

const basic = {
  name: 'Synthswap',
  logo: 'https://www.synthswap.io/_next/image?url=%2Fimages%2Fsynth.png&w=48&q=75',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};

const networks = {
  8453: {
    factoryAddress: '0x4bd16d59A5E1E0DB903F724aa9d721a31d7D720D',
    routerAddress: '0x8734B3264Dbd22F899BCeF4E92D442d538aBefF0',
    defaultCurrencies: {
      input: base['eth'],
      output: base['dai'],
    },
    tokens: [base['eth'], base['synth'], base['usdc'], base['weth'], base['dai']],
  },
};

export { basic, networks };
