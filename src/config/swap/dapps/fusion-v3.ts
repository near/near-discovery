import { mantle } from '@/config/tokens/mantle';

const basic = {
  name: 'FusionX V3',
  logo: 'https://ipfs.near.social/ipfs/bafkreifiphkr4bvatimqrz2lty4fgygb2awpvbcsri2bny23w47dactnly',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.RamsesV2AmountOut',
};
const networks = {
  5000: {
    factoryAddress: '0x530d2766D1988CC1c000C8b7d00334c14B69AD71',
    routerAddress: '0x5989FB161568b9F133eDf5Cf6787f5597762797F',
    quoterAddress: '0x90f72244294E7c5028aFd6a96E18CC2c1E913995',
    fees: [100, 500, 3000, 10000],
    defaultCurrencies: {
      input: mantle['weth'],
      output: mantle['usdc'],
    },
    tokens: [mantle['weth'], mantle['usdc'], mantle['mnt'], mantle['usdt'], mantle['wbtc'], mantle['wmnt']],
  },
};

export { basic, networks };
