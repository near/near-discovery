import { arbitrum } from '@/config/tokens/arbitrum';
import { bsc } from '@/config/tokens/bsc';
import { polygon } from '@/config/tokens/polygon';

const basic = {
  name: 'Apeswap',
  logo: '/images/apps/ape-swap.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};
const networks = {
  42161: {
    factoryAddress: '0xCf083Be4164828f00cAE704EC15a36D711491284',
    routerAddress: '0x7d13268144adcdbEBDf94F654085CC15502849Ff',
    defaultCurrencies: {
      input: arbitrum['eth'],
      output: arbitrum['usdt'],
    },
    tokens: [arbitrum['eth'], arbitrum['weth'], arbitrum['usdc.e'], arbitrum['usdt']],
  },
  56: {
    factoryAddress: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
    routerAddress: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
    defaultCurrencies: {
      input: bsc['eth'],
      output: bsc['usdc'],
    },
    tokens: [bsc['eth'], bsc['usdc'], bsc['btcb'], bsc['banana'], bsc['wbnb'], bsc['bscusd'], bsc['chrp'], bsc['ceek']],
  },
  137: {
    factoryAddress: '0xCf083Be4164828f00cAE704EC15a36D711491284',
    routerAddress: '0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607',
    defaultCurrencies: {
      input: polygon['eth'],
      output: polygon['usdc'],
    },
    tokens: [polygon['eth'], polygon['matic'], polygon['wmatic'], polygon['dai'], polygon['usdt'], polygon['usdc']],
  },
};

export { basic, networks };
