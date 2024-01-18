import { zkSync } from '@/config/tokens/zkSync';

const basic = {
  name: 'zkSwap Finance',
  logo: 'https://ipfs.near.social/ipfs/bafkreiesthfx736q4xkn3t352fo73jxgrfd2523kbru76vtpxuodzxrmja',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};
const networks = {
  324: {
    factoryAddress: '0x3a76e377ED58c8731F9DF3A36155942438744Ce3',
    routerAddress: '0x18381c0f738146Fb694DE18D1106BdE2BE040Fa4',
    defaultCurrencies: {
      input: zkSync['eth'],
      output: zkSync['usdc'],
    },
    tokens: [
      zkSync['usdc'],
      zkSync['eth'],
      zkSync['weth'],
      zkSync['wbtc'],
      zkSync['cebusd'],
      zkSync['zf'],
      zkSync['usdt'],
      zkSync['velocore'],
    ],
  },
};

export { basic, networks };
