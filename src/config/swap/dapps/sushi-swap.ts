import { arbitrum } from '@/config/tokens/arbitrum';
import { gnosis } from '@/config/tokens/gnosis';
import { optimism } from '@/config/tokens/optimism';
import { polygon } from '@/config/tokens/polygon';
import { polygonZkevm } from '@/config/tokens/polygonZkevm';

const basic = {
  name: 'SushiSwap',
  logo: '/images/apps/sushi.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};

const networks = {
  42161: {
    factoryAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    defaultCurrencies: {
      input: arbitrum['weth'],
      output: arbitrum['usdt'],
    },
    tokens: [
      arbitrum['weth'],
      arbitrum['usdc'],
      arbitrum['usdc.e'],
      arbitrum['usdt'],
      arbitrum['dai'],
      arbitrum['arb'],
      arbitrum['sushi'],
      arbitrum['wbtc'],
    ],
  },
  100: {
    factoryAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    defaultCurrencies: {
      input: gnosis['weth'],
      output: gnosis['xdai'],
    },
    tokens: [
      gnosis['gno'],
      gnosis['usdc'],
      gnosis['wxdai'],
      gnosis['weth'],
      gnosis['wbtc'],
      gnosis['usdt'],
      gnosis['sushi'],
      gnosis['wsteth'],
    ],
  },
  10: {
    factoryAddress: '0x9c6522117e2ed1fE5bdb72bb0eD5E3f2bdE7DBe0',
    routerAddress: '0x8c32Fd078B89Eccb06B40289A539D84A4aA9FDA6',
    quoterAddress: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.RamsesV2AmountOut',
    fees: [100, 500, 3000, 10000],
    defaultCurrencies: {
      input: optimism['weth'],
      output: optimism['usdc.e'],
    },
    tokens: [
      optimism['op'],
      optimism['weth'],
      optimism['susd'],
      optimism['wbtc'],
      optimism['dai'],
      optimism['usdc'],
      optimism['usdt'],
      optimism['usdc.e'],
      optimism['lusd'],
      optimism['snx'],
      optimism['mai'],
    ],
  },
  137: {
    factoryAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    defaultCurrencies: {
      input: polygon['weth'],
      output: polygon['usdt'],
    },
    tokens: [
      polygon['matic'],
      polygon['wmatic'],
      polygon['wbtc'],
      polygon['weth'],
      polygon['usdc'],
      polygon['dai'],
      polygon['usdt'],
      polygon['sushi'],
    ],
  },
  1101: {
    factoryAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    routerAddress: '0xc14Ee6B248787847527e11b8d7Cf257b212f7a9F',
    quoterAddress: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.RamsesV2AmountOut',
    fees: [100, 500, 3000, 10000],
    defaultCurrencies: {
      input: polygonZkevm['eth'],
      output: polygonZkevm['usdc'],
    },
    tokens: [
      polygonZkevm['matic'],
      polygonZkevm['usdc'],
      polygonZkevm['usdt'],
      polygonZkevm['eth'],
      polygonZkevm['weth'],
      polygonZkevm['wbtc'],
      polygonZkevm['dai'],
    ],
  },
};

export { basic, networks };
