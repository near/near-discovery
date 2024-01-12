import { gnosis } from '@/config/tokens/gnosis';

const basic = {
  name: 'Agave',
  icon: 'https://ipfs.near.social/ipfs/bafkreidnjva6lfgk24dzwhxrw2kuzegoochsczau5bqtmudhyyxvmcampq',
  data: 'bluebiu.near/widget/Lending.Data.Radiant',
  handler: 'bluebiu.near/widget/Lending.Handler.Radiant',
};

const networks = {
  100: {
    oracleAddress: '0x062B9D1D3F5357Ef399948067E93B81F4B85db7a',
    poolAddressProvider: '0x3673C22153E363B1da69732c4E0aA71872Bbb87F',
    aaveProtocolDataProviderAddress: '0xe6729389dea76d47b5bcb0ba5c080821c3b51329',
    lendingPoolAddress: '0x5E15d5E33d318dCEd84Bfe3F4EACe07909bE6d9c',
    wethGateway: '0x36A644cC38Ae257136EEca5919800f364d73FeFC',
    markets: {
      [gnosis['gno'].address]: {
        decimals: 18,
        symbol: 'agGNO',
        address: '0xA26783eAd6C1f4744685c14079950622674ae8A8',
        underlyingToken: gnosis['gno'],
        stableDebtTokenAddress: '0x0DfD401903bA960B2EED32A10f8aeB601Cd9A7A5',
        variableDebtTokenAddress: '0x99272C6E2Baa601cEA8212b8fBAA7920A9f916F0',
      },
      [gnosis['weth'].address]: {
        decimals: 18,
        symbol: 'agWETH',
        address: '0x44932e3b1E662AdDE2F7bac6D5081C5adab908c6',
        underlyingToken: gnosis['weth'],
        stableDebtTokenAddress: '0x43Ae4A9474eA23b0BC04C99F9fF2A9B4c2d5554c',
        variableDebtTokenAddress: '0x73Ada33D706085d6B93350B5e6aED6178905Fb8A',
      },
      [gnosis['wxdai'].address]: {
        decimals: 18,
        symbol: 'agWXDAI',
        address: '0xd4e420bBf00b0F409188b338c5D87Df761d6C894',
        underlyingToken: gnosis['wxdai'],
        stableDebtTokenAddress: '0xF4401355B41c867edbF09C821FA7B4fffbed5C82',
        variableDebtTokenAddress: '0xec72De30C3084023F7908002A2252a606CCe0B2c',
      },
      [gnosis['usdc'].address]: {
        decimals: 18,
        symbol: 'agUSDC',
        address: '0x291B5957c9CBe9Ca6f0b98281594b4eB495F4ec1',
        underlyingToken: gnosis['usdc'],
        stableDebtTokenAddress: '0x05c43e14d38bC5123F6408A57BE03714aB689F6e',
        variableDebtTokenAddress: '0xa728C8f1CF7fC4d8c6d5195945C3760c87532724',
      },
      [gnosis['wbtc'].address]: {
        decimals: 18,
        symbol: 'agWBTC',
        address: '0x4863cfaF3392F20531aa72CE19E5783f489817d6',
        underlyingToken: gnosis['wbtc'],
        stableDebtTokenAddress: '0xca0f3B157165FE11692a047ea14963ffAdfB31fD',
        variableDebtTokenAddress: '0x110C5A1494F0AB6C851abB72AA2efa3dA738aB72',
      },
      [gnosis['usdt'].address]: {
        decimals: 18,
        symbol: 'agUSDT',
        address: '0x5b4Ef67c63d091083EC4d30CFc4ac685ef051046',
        underlyingToken: gnosis['usdt'],
        stableDebtTokenAddress: '0xB067faD853d099EDd9c86483682e7D947B7983E5',
        variableDebtTokenAddress: '0x474f83d77150bDDC6a6F34eEe4F5574EAfD05938',
      },
      [gnosis['eure'].address]: {
        decimals: 18,
        symbol: 'agEURe',
        address: '0xEB20B07a9abE765252E6b45e8292b12CB553CcA6',
        underlyingToken: gnosis['eure'],
        stableDebtTokenAddress: '0x78A69aFc50E7705Ad4588cB57cF8D27B29161e51',
        variableDebtTokenAddress: '0xA4a45B550897dD5d8a44c68DBD245C5934EbAcd9',
      },
      [gnosis['wsteth'].address]: {
        decimals: 18,
        symbol: 'agwstETH',
        address: '0x606B2689ba4A9F798f449fa6495186021486dD9f',
        underlyingToken: gnosis['wsteth'],
        stableDebtTokenAddress: '0xeC7f91f26E7fD42E90fFa53ca0B0b02095A6B450',
        variableDebtTokenAddress: '0xd0b168FD6a4e220f1a8FA99De97F8f428587e178',
      },
    },
  },
};

export default { basic, networks };
