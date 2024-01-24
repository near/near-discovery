import { arbitrum } from '@/config/tokens/arbitrum';

const basic = {
  name: 'Camelot',
  logo: '/images/apps/camelot.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.CamelotAmountOut',
};

const networks = {
  42161: {
    factoryAddress: '0x6EcCab422D763aC031210895C81787E87B43A652',
    routerAddress: '0xc873fEcbd354f5A56E00E710B90EF4201db2448d',
    defaultCurrencies: {
      input: arbitrum['eth'],
      output: arbitrum['usdt'],
    },
    tokens: [
      arbitrum['eth'],
      arbitrum['grail'],
      arbitrum['arb'],
      arbitrum['usdc.e'],
      arbitrum['usdc'],
      arbitrum['usdt'],
      arbitrum['fctr'],
      arbitrum['winr'],
      arbitrum['pendle'],
      arbitrum['gmx'],
      arbitrum['trove'],
      arbitrum['jones dao'],
    ],
  },
};

export { basic, networks };
