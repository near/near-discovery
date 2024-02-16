import { base } from '@/config/tokens/base';

const basic = {
  name: 'RocketSwap',
  logo: '/images/apps/rocket-swap.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};

const networks = {
  8453: {
    factoryAddress: '0x1B8128c3A1B7D20053D10763ff02466ca7FF99FC',
    routerAddress: '0x4cf76043B3f97ba06917cBd90F9e3A2AAC1B306e',
    defaultCurrencies: {
      input: base['eth'],
      output: base['axlusdc'],
    },
    tokens: [base['eth'], base['axlusdc'], base['rckt'], base['weth'], base['bald'], base['base']],
  },
};

export { basic, networks };
