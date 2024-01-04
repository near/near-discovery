import { linea } from '@/config/tokens/linea';
import { mantle } from '@/config/tokens/mantle';

const basic = {
  name: 'iZiSwap',
  logo: 'https://ipfs.near.social/ipfs/bafkreifsgwu2zd6y2n5alekr5qgdhzoivlkl5wujtq3z7gnm5pw4jy7sgi',
  amountOutFn: 'bluebiu.near/widget/Linea.Swap.IziSwapAmountOut',
};
const networks = {
  59144: {
    factoryAddress: '0x45e5F26451CDB01B0fA1f8582E0aAD9A6F27C218',
    routerAddress: '0x032b241De86a8660f1Ae0691a4760B426EA246d7',
    quoterAddress: '0xe6805638db944eA605e774e72c6F0D15Fb6a1347',
    fees: [100, 500, 3000, 10000],
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc'],
    },
    tokens: [linea['eth'], linea['usdc'], linea['weth'], linea['izi'], linea['wbtc'], linea['busd']],
  },
  5000: {
    factoryAddress: '0x530d2766D1988CC1c000C8b7d00334c14B69AD71',
    routerAddress: '0x25C030116Feb2E7BbA054b9de0915E5F51b03e31',
    quoterAddress: '0x032b241De86a8660f1Ae0691a4760B426EA246d7',
    fees: [100, 500, 3000, 10000],
    defaultCurrencies: {
      input: mantle['weth'],
      output: mantle['usdc'],
    },
    tokens: [mantle['weth'], mantle['usdc'], mantle['mnt'], mantle['usdt'], mantle['wbtc'], mantle['wmnt']],
  },
};

export { basic, networks };
