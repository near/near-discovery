import { arbitrum } from '@/config/tokens/arbitrum';
import { gnosis } from '@/config/tokens/gnosis';
import { optimism } from '@/config/tokens/optimism';
import { polygon } from '@/config/tokens/polygon';
import { polygonZkevm } from '@/config/tokens/polygonZkevm';
import { linea } from '@/config/tokens/linea';
import { scroll } from '@/config/tokens/scroll';
import { base } from '@/config/tokens/base';

const basic = {
  name: 'SushiSwap',
  logo: '/images/apps/sushi.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.RamsesV2AmountOut',
};

const networks = {
  42161: {
    factoryAddress: '0x1af415a1EbA07a4986a52B6f2e7dE7003D82231e',
    routerAddress: '0x8A21F6768C1f8075791D08546Dadf6daA0bE820c',
    quoterAddress: '0x0524E833cCD057e4d7A296e3aaAb9f7675964Ce1',
    fees: [100, 500, 3000, 10000],
    defaultCurrencies: {
      input: arbitrum['weth'],
      output: arbitrum['usdt'],
    },
    tokens: [
      arbitrum['eth'],
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
    factoryAddress: '0xf78031cbca409f2fb6876bdfdbc1b2df24cf9bef',
    routerAddress: '0xFB7eF66a7e61224DD6FcD0D7d9C3be5C8B049b9f',
    quoterAddress: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    fees: [100, 500, 3000, 10000],
    defaultCurrencies: {
      input: gnosis['weth'],
      output: gnosis['xdai'],
    },
    tokens: [
      gnosis['gno'],
      gnosis['usdc'],
      gnosis['wxdai'],
      gnosis['weth'],
      gnosis['eth'],
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
    fees: [100, 500, 3000, 10000],
    defaultCurrencies: {
      input: optimism['eth'],
      output: optimism['usdc.e'],
    },
    tokens: [
      optimism['op'],
      optimism['eth'],
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
    factoryAddress: '0x917933899c6a5F8E37F31E19f92CdBFF7e8FF0e2',
    routerAddress: '0xFB7eF66a7e61224DD6FcD0D7d9C3be5C8B049b9f',
    quoterAddress: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    fees: [100, 500, 3000, 10000],
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
  59144: {
    factoryAddress: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
    routerAddress: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    quoterAddress: '0xFB7eF66a7e61224DD6FcD0D7d9C3be5C8B049b9f',
    fees: [100, 500, 3000, 10000],
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['axlusdc'],
    },
    tokens: [linea['eth'], linea['weth'], linea['axlusdc']],
  },
  534352: {
    factoryAddress: '0x46b3fdf7b5cde91ac049936bf0bdb12c5d22202e',
    routerAddress: '0x33d91116e0370970444B0281AB117e161fEbFcdD',
    quoterAddress: '0xe43ca1Dee3F0fc1e2df73A0745674545F11A59F5',
    fees: [100, 500, 3000, 10000],
    defaultCurrencies: {
      input: scroll['eth'],
      output: scroll['usdc'],
    },
    tokens: [scroll['eth'], scroll['weth'], scroll['usdc'], scroll['dai'], scroll['wbtc'], scroll['wsteth']],
  },
  8453: {
    factoryAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    routerAddress: '0xFB7eF66a7e61224DD6FcD0D7d9C3be5C8B049b9f',
    quoterAddress: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
    fees: [100, 500, 3000, 10000],
    defaultCurrencies: {
      input: base['eth'],
      output: base['dai'],
    },
    tokens: [base['eth'], base['weth'], base['dai'], base['usdc'], base['usdbc'], base['axlusdc'], base['']],
  },
};

export { basic, networks };
