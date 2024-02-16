import { polygonZkevm } from '@/config/tokens/polygonZkevm';
import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'Pancake Swap',
  logo: '/images/apps/pancake.png',
  amountOutFn: 'bluebiu.near/widget/PolygonZkevm.Swap.PancakeSwapAmountOut',
};
const networks = {
  1101: {
    routerAddress: '0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86',
    quoterAddress: '0x55BeE1bD3Eb9986f6d2d963278de09eE92a3eF1D',
    defaultCurrencies: {
      input: polygonZkevm['eth'],
      output: polygonZkevm['usdc'],
    },
    tokens: [polygonZkevm['eth'], polygonZkevm['usdc'], polygonZkevm['weth'], polygonZkevm['usdt']],
  },
  59144: {
    factoryAddress: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
    routerAddress: '0x1b81D678ffb9C0263b24A97847620C99d213eB14',
    quoterAddress: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
    amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.RamsesV2AmountOut',
    fees: [100, 500, 2500, 10000],
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc'],
    },
    tokens: [
      linea['eth'],
      linea['weth'],
      linea['wsteth'],
      linea['usdc'],
      linea['cake'],
      linea['wbtc'],
      linea['dai'],
      linea['usdt'],
      linea['axlusdc'],
    ],
  },
};

export { basic, networks };
