import { bsc } from '@/config/tokens/bsc';

const basic = {
  name: 'Biswap',
  logo: '/images/apps/bi-swap.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};
const networks = {
  56: {
    factoryAddress: '0x858E3312ed3A876947EA49d572A7C42DE08af7EE',
    routerAddress: '0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8',
    defaultCurrencies: {
      input: bsc['eth'],
      output: bsc['usdc'],
    },
    tokens: [bsc['eth'], bsc['bnb'], bsc['wbnb'], bsc['btcb'], bsc['bscusd'], bsc['busd'], bsc['usdc'], bsc['bsw']],
  },
};

export { basic, networks };
