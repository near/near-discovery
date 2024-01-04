import { zkSync } from '@/config/tokens/zkSync';

const basic = {
  name: 'SpaceFi',
  logo: '	https://ipfs.near.social/ipfs/bafkreifjliccmtazc7sfzf3b45jyxpuabbhyqf4rt4ylensgbzc2nlbsru',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};
const networks = {
  324: {
    factoryAddress: '0x0700Fb51560CfC8F896B2c812499D17c5B0bF6A7',
    routerAddress: '0xbE7D1FD1f6748bbDefC4fbaCafBb11C6Fc506d1d',
    defaultCurrencies: {
      input: zkSync['eth'],
      output: zkSync['usdc'],
    },
    tokens: [
      zkSync['eth'],
      zkSync['usdc'],
      zkSync['wbtc'],
      zkSync['space'],
      zkSync['cebnb'],
      zkSync['usdt'],
      zkSync['cebusd'],
    ],
  },
};

export { basic, networks };
