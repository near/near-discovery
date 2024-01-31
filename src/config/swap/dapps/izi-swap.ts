import { linea } from '@/config/tokens/linea';
import { mantle } from '@/config/tokens/mantle';
import { manta } from '@/config/tokens/manta';
import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'iZiSwap',
  logo: '/images/apps/izi-swap.png',
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
  169: {
    factoryAddress: '0x8c7d3063579BdB0b90997e18A770eaE32E1eBb08',
    routerAddress: '0x02F55D53DcE23B4AA962CC68b0f685f26143Bdb2',
    quoterAddress: '0x33531bDBFE34fa6Fd5963D0423f7699775AacaaF',
    fees: [3000, 10000],
    defaultCurrencies: {
      input: manta['weth'],
      output: manta['usdc'],
    },
    tokens: [
      manta['weth'],
      manta['usdc'],
      manta['iusd'],
      manta['izi'],
      manta['usdt'],
      manta['wbtc'],
      manta['dai'],
      manta['wsteth'],
      manta['tia'],
    ],
  },
  534352: {
    factoryAddress: '0x8c7d3063579BdB0b90997e18A770eaE32E1eBb08',
    routerAddress: '0x2db0AFD0045F3518c77eC6591a542e326Befd3D7',
    quoterAddress: '0x3EF68D3f7664b2805D4E88381b64868a56f88bC4',
    fees: [3000, 10000],
    defaultCurrencies: {
      input: scroll['weth'],
      output: scroll['usdc'],
    },
    tokens: [scroll['weth'], scroll['usdc'], scroll['dai'], scroll['wbtc'], scroll['izi'], scroll['wsteth']],
  },
};

export { basic, networks };
