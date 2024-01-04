import { gnosis } from '@/config/tokens/gnosis';
import { polygon } from '@/config/tokens/polygon';

const basic = {
  name: 'Honeyswap',
  logo: 'https://ipfs.near.social/ipfs/bafkreigpb3scxgcvddqzongudv3m77bh363rzyxidzuudk6wx32qa6vgia',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};
const networks = {
  100: {
    factoryAddress: '0xA818b4F111Ccac7AA31D0BCc0806d64F2E0737D7',
    routerAddress: '0x1C232F01118CB8B424793ae03F870aa7D0ac7f77',
    defaultCurrencies: {
      input: gnosis['weth'],
      output: gnosis['xdai'],
    },
    tokens: [gnosis['weth'], gnosis['xdai'], gnosis['gno'], gnosis['wbtc'], gnosis['donut'], gnosis['hny']],
  },
  137: {
    factoryAddress: '0x03DAa61d8007443a6584e3d8f85105096543C19c',
    routerAddress: '0xaD340d0CD0B117B0140671E7cB39770e7675C848',
    defaultCurrencies: {
      input: polygon['eth'],
      output: polygon['usdc'],
    },
    tokens: [
      polygon['eth'],
      polygon['wbtc'],
      polygon['wmatic'],
      polygon['pcomb'],
      polygon['usdc'],
      polygon['dai'],
      polygon['usdt'],
    ],
  },
};

export { basic, networks };
