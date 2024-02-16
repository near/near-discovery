import { arbitrum } from '@/config/tokens/arbitrum';

const basic = {
  name: 'Lodestar V1',
  icon: '/images/apps/lodestar-v1.png',
  data: 'bluebiu.near/widget/Lending.Data.LodestarV1',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  handlerClaim: 'bluebiu.near/widget/Linea.Lending.MendiHandlerClaim',
};

const networks = {
  42161: {
    unitrollerAddress: '0xa86DD95c210dd186Fa7639F93E4177E97d057576',
    oracleAddress: '0xcCf9393df2F656262FD79599175950faB4D4ec01',
    lensAddress: '0x24C25910aF4068B5F6C3b75252a36c4810849135',
    markets: {
      '0xC37896BF3EE5a2c62Cdbd674035069776f721668': {
        decimals: 8,
        symbol: 'WBTC',
        address: '0xC37896BF3EE5a2c62Cdbd674035069776f721668',
        underlyingToken: arbitrum['wbtc'],
      },
      '0x2193c45244AF12C280941281c8aa67dD08be0a64': {
        decimals: 8,
        symbol: 'ETH',
        address: '0x2193c45244AF12C280941281c8aa67dD08be0a64',
        underlyingToken: arbitrum['eth'],
      },
      '0x1ca530f02DD0487cef4943c674342c5aEa08922F': {
        decimals: 8,
        symbol: 'USDC.e',
        address: '0x1ca530f02DD0487cef4943c674342c5aEa08922F',
        underlyingToken: arbitrum['usdc.e'],
      },
      '0x9365181A7df82a1cC578eAE443EFd89f00dbb643': {
        decimals: 8,
        symbol: 'USDT',
        address: '0x9365181A7df82a1cC578eAE443EFd89f00dbb643',
        underlyingToken: arbitrum['usdt'],
      },
      '0x8991d64fe388fA79A4f7Aa7826E8dA09F0c3C96a': {
        decimals: 8,
        symbol: 'ARB',
        address: '0x8991d64fe388fA79A4f7Aa7826E8dA09F0c3C96a',
        underlyingToken: arbitrum['arb'],
      },
      '0x4987782da9a63bC3ABace48648B15546D821c720': {
        decimals: 8,
        symbol: 'DAI',
        address: '0x4987782da9a63bC3ABace48648B15546D821c720',
        underlyingToken: arbitrum['dai'],
      },
      '0xfECe754D92bd956F681A941Cef4632AB65710495': {
        decimals: 8,
        symbol: 'wstETH',
        address: '0xfECe754D92bd956F681A941Cef4632AB65710495',
        underlyingToken: arbitrum['wst-eth'],
      },
      '0xf21Ef887CB667f84B8eC5934C1713A7Ade8c38Cf': {
        decimals: 8,
        symbol: 'MAGIC',
        address: '0xf21Ef887CB667f84B8eC5934C1713A7Ade8c38Cf',
        underlyingToken: arbitrum['magic'],
      },
      '0xD12d43Cdf498e377D3bfa2c6217f05B466E14228': {
        decimals: 8,
        symbol: 'FRAX',
        address: '0xD12d43Cdf498e377D3bfa2c6217f05B466E14228',
        underlyingToken: arbitrum['frax'],
      },
      '0x5d27cFf80dF09f28534bb37d386D43aA60f88e25': {
        decimals: 8,
        symbol: 'DPX',
        address: '0x5d27cFf80dF09f28534bb37d386D43aA60f88e25',
        underlyingToken: arbitrum['dpx'],
      },
      '0x79B6c5e1A7C0aD507E1dB81eC7cF269062BAb4Eb': {
        decimals: 8,
        symbol: 'GMX',
        address: '0x79B6c5e1A7C0aD507E1dB81eC7cF269062BAb4Eb',
        underlyingToken: arbitrum['gmx'],
      },
    },
  },
};

export default { basic, networks };
