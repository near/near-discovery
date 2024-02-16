import { base } from '@/config/tokens/base';

const basic = {
  name: 'SwapBased',
  logo: '/images/apps/swap-based.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};

const networks = {
  8453: {
    factoryAddress: '0x04C9f118d21e8B767D2e50C946f0cC9F6C367300',
    routerAddress: '0xaaa3b1F1bd7BCc97fD1917c18ADE665C5D31F066',
    defaultCurrencies: {
      input: base['eth'],
      output: base['axlusdc'],
    },
    tokens: [base['eth'], base['axlusdc'], base['rckt'], base['weth'], base['bald'], base['base'], base['dai']],
  },
};

export { basic, networks };
