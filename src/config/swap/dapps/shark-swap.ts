import { base } from '@/config/tokens/base';

const basic = {
  name: 'SharkSwap',
  logo: 'https://ipfs.near.social/ipfs/bafkreia7oozhsapdw6x3eebz2v3x2nixwabwpboguqfjvhgg7xithkjhta',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};

const networks = {
  8453: {
    factoryAddress: '0x57592D44eb60011500961EF177BFf8D8691D5a8B',
    routerAddress: '0x0573B0ce977bBa12E31ad7A3CCC02d0dB004D57a',
    defaultCurrencies: {
      input: base['eth'],
      output: base['usdbc'],
    },
    tokens: [base['weth'], base['eth'], base['usdbc'], base['dai']],
  },
};

export { basic, networks };
