import { avalanche } from '@/config/tokens/avalanche';
import { optimism } from '@/config/tokens/optimism';

const basic = {
  name: 'Iron Bank',
  icon: '/images/apps/iron-bank.png',
  data: 'bluebiu.near/widget/Lending.Data.IronBank',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
};

const networks = {
  43114: {
    unitrollerAddress: '0x2eE80614Ccbc5e28654324a66A396458Fa5cD7Cc',
    oracleAddress: '0x0980f2F0D2af35eF2c4521b2342D59db575303F7',
    markets: {
      '0xb3c68d69E95B095ab4b33B4cB67dBc0fbF3Edf56': {
        decimals: 8,
        symbol: 'iWAVAX',
        address: '0xb3c68d69E95B095ab4b33B4cB67dBc0fbF3Edf56',
        underlyingToken: avalanche['wavax'],
      },
      '0x338EEE1F7B89CE6272f302bDC4b952C13b221f1d': {
        decimals: 8,
        symbol: 'iWETH.E',
        address: '0x338EEE1F7B89CE6272f302bDC4b952C13b221f1d',
        underlyingToken: avalanche['eth'],
      },
      '0xCEb1cE674f38398432d20bc8f90345E91Ef46fd3': {
        decimals: 8,
        symbol: 'iUSDT.E',
        address: '0xCEb1cE674f38398432d20bc8f90345E91Ef46fd3',
        underlyingToken: avalanche['usdt.e'],
      },
      '0xe28965073C49a02923882B8329D3E8C1D805E832': {
        decimals: 8,
        symbol: 'iUSDC.E',
        address: '0xe28965073C49a02923882B8329D3E8C1D805E832',
        underlyingToken: avalanche['usdc.e'],
      },
      '0x085682716f61a72bf8C573FBaF88CCA68c60E99B': {
        decimals: 8,
        symbol: 'iDAI.E',
        address: '0x085682716f61a72bf8C573FBaF88CCA68c60E99B',
        underlyingToken: avalanche['dai.e'],
      },
      '0xB09b75916C5F4097C8b5812E63e216FEF97661Fc': {
        decimals: 8,
        symbol: 'iWBTC.E',
        address: '0xB09b75916C5F4097C8b5812E63e216FEF97661Fc',
        underlyingToken: avalanche['wbtc.e'],
      },
      '0xEc5Aa19566Aa442C8C50f3C6734b6Bb23fF21CD7': {
        decimals: 8,
        symbol: 'iUSDC',
        address: '0xEc5Aa19566Aa442C8C50f3C6734b6Bb23fF21CD7',
        underlyingToken: avalanche['usdc'],
      },
      '0x3Af7c11d112C1C730E5ceE339Ca5B48F9309aCbC': {
        decimals: 8,
        symbol: 'iUSDT',
        address: '0x3Af7c11d112C1C730E5ceE339Ca5B48F9309aCbC',
        underlyingToken: avalanche['usdt'],
      },
    },
  },
  10: {
    unitrollerAddress: '0xE0B57FEEd45e7D908f2d0DaCd26F113Cf26715BF',
    oracleAddress: '0x17C6768F438F1C67A70889dCFfE49C665CcfE769',
    markets: {
      '0x049E04bEE77cFfB055f733A138a2F204D3750283': {
        decimals: 8,
        symbol: 'iDAI',
        address: '0x049E04bEE77cFfB055f733A138a2F204D3750283',
        underlyingToken: optimism['dai'],
      },
      '0x4645e0952678E9566FB529D9313f5730E4e1C412': {
        decimals: 8,
        symbol: 'iOP',
        address: '0x4645e0952678E9566FB529D9313f5730E4e1C412',
        underlyingToken: optimism['op'],
      },
      '0xE724FfA5D30782499086682C8362CB3673bF69ae': {
        decimals: 8,
        symbol: 'iSNX',
        address: '0xE724FfA5D30782499086682C8362CB3673bF69ae',
        underlyingToken: optimism['snx'],
      },
      '0x1d073cf59Ae0C169cbc58B6fdD518822ae89173a': {
        decimals: 8,
        symbol: 'iUSDC',
        address: '0x1d073cf59Ae0C169cbc58B6fdD518822ae89173a',
        underlyingToken: optimism['usdc.e'],
      },
      '0x874C01c2d1767EFA01Fa54b2Ac16be96fAd5a742': {
        decimals: 8,
        symbol: 'iUSDT',
        address: '0x874C01c2d1767EFA01Fa54b2Ac16be96fAd5a742',
        underlyingToken: optimism['usdt'],
      },
      '0xcdb9b4db65C913aB000b40204248C8A53185D14D': {
        decimals: 8,
        symbol: 'iWBTC',
        address: '0xcdb9b4db65C913aB000b40204248C8A53185D14D',
        underlyingToken: optimism['wbtc'],
      },
      '0x17533a1bDe957979E3977EbbFBC31E6deeb25C7d': {
        decimals: 8,
        symbol: 'iWETH',
        address: '0x17533a1bDe957979E3977EbbFBC31E6deeb25C7d',
        underlyingToken: optimism['weth'],
      },
      '0x04F0fd3CD03B17a3E5921c0170ca6dD3952841cA': {
        decimals: 8,
        symbol: 'iSUSD',
        address: '0x04F0fd3CD03B17a3E5921c0170ca6dD3952841cA',
        underlyingToken: optimism['susd'],
      },
    },
  },
};

export default { basic, networks };
