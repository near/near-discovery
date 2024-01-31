import { polygon } from '@/config/tokens/polygon';
import { polygonZkevm } from '@/config/tokens/polygonZkevm';
import { manta } from '@/config/tokens/manta';

const basic = {
  name: 'QuickSwap',
  logo: '/images/apps/quick-swap.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};
const networks = {
  137: {
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    defaultCurrencies: {
      input: polygon['eth'],
      output: polygon['usdc'],
    },
    tokens: [polygon['eth'], polygon['usdc'], polygon['wbtc'], polygon['wmatic'], polygon['dai'], polygon['usdt']],
  },
  1101: {
    routerAddress: '0xF6Ad3CcF71Abb3E12beCf6b3D2a74C963859ADCd',
    quoterAddress: '0x55BeE1bD3Eb9986f6d2d963278de09eE92a3eF1D',
    amountOutFn: 'bluebiu.near/widget/PolygonZkevm.Swap.QuickSwapAmountOut',
    defaultCurrencies: {
      input: polygonZkevm['eth'],
      output: polygonZkevm['usdc'],
    },
    tokens: [
      polygonZkevm['eth'],
      polygonZkevm['usdc'],
      polygonZkevm['weth'],
      polygonZkevm['wbtc'],
      polygonZkevm['matic'],
      polygonZkevm['usdt'],
      polygonZkevm['dai'],
    ],
  },
  169: {
    routerAddress: '0xfdE3eaC61C5Ad5Ed617eB1451cc7C3a0AC197564',
    quoterAddress: '0x3005827fB92A0cb7D0f65738D6D645d98A4Ad96b',
    amountOutFn: 'bluebiu.near/widget/PolygonZkevm.Swap.QuickSwapAmountOut',
    defaultCurrencies: {
      input: manta['weth'],
      output: manta['usdc'],
    },
    tokens: [
      manta['weth'],
      manta['usdc'],
      manta['usdt'],
      manta['wbtc'],
      manta['dai'],
      manta['matic'],
      manta['quick'],
      manta['wsteth'],
      manta['wusdm'],
    ],
  },
};

export { basic, networks };
