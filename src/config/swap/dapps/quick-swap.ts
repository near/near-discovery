import { polygon } from '@/config/tokens/polygon';
import { polygonZkevm } from '@/config/tokens/polygonZkevm';

const basic = {
  name: 'QuickSwap',
  logo: 'https://ipfs.near.social/ipfs/bafkreida55shh44tqd4ingcunnu6u34g5bm3jugoaasy7a365kutoomjru',
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
};

export { basic, networks };
