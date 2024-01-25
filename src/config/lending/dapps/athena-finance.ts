import { arbitrum } from '@/config/tokens/arbitrum';
import { avalanche } from '@/config/tokens/avalanche';
import { base } from '@/config/tokens/base';
import { bsc } from '@/config/tokens/bsc';
import { linea } from '@/config/tokens/linea';
import { metis } from '@/config/tokens/metis';
import { optimism } from '@/config/tokens/optimism';

const basic = {
  name: 'Athena Finance',
  // icon: '/images/apps/granary.png',
  // data: 'bluebiu.near/widget/Lending.Data.Radiant',
  // handler: 'bluebiu.near/widget/Lending.Handler.Radiant',
  // type: 'aave2',
};

const networks = {
  // metis
  1088: {
    // oracleAddress: '0xC4ae6CEA0f15F5a44e0F8EEA1D516aF2Eccb9709',
    // poolAddressProvider: '0xE2dfcb86C99599DAFC12028F67b8456f99c9de4c',
    // aaveProtocolDataProviderAddress: '0x10615D451a5b91C92ce8538703E7AABA5d5cCC4D',
    // lendingPoolAddress: '0x65dEc665ea1e96Ee5203DB321b5Cd413b81B2bd2',
    // wethGateway: '0x4d8d90FAF90405b9743Ce600E98A2Aa8CdF579a0',
    // markets: {
    //   [metis['m.usdc'].address]: {
    //     decimals: 6,
    //     symbol: 'grainUSDC',
    //     address: '0x37FA438EdfB7044E9444b4022b2516C4dAA4592F',
    //     underlyingToken: metis['m.usdc'],
    //     stableDebtTokenAddress: '0x9e398d935d3e9e02319124110aab1b4646944f45',
    //     variableDebtTokenAddress: '0x1eee9a7452c6e73e6fae6b6f95bfcb3afebeddbd',
    //   },
    //   [metis['m.usdt'].address]: {
    //     decimals: 6,
    //     symbol: 'grainUSDT',
    //     address: '0x18bA3e87876f4982810d321D447b81d01Cdf6668',
    //     underlyingToken: metis['m.usdt'],
    //     stableDebtTokenAddress: '',
    //     variableDebtTokenAddress: '',
    //   },
    //   [metis['metis'].address]: {
    //     decimals: 18,
    //     symbol: 'grainMETIS',
    //     address: '0x7f5eC43a46dF54471DAe95d3C05BEBe7301b75Ff',
    //     underlyingToken: metis['metis'],
    //     stableDebtTokenAddress: '0x179659d5e67c64b54b0df4960389787ffa4db6c2',
    //     variableDebtTokenAddress: '0xeaf4cbd2622bf807a02091804db775cdce2169fb',
    //   },
    //   [metis['m.wbtc'].address]: {
    //     decimals: 8,
    //     symbol: 'grainWBTC',
    //     address: '0x826ED083724909196e6598452Be4fDFe0FA6C7CD',
    //     underlyingToken: metis['m.wbtc'],
    //     stableDebtTokenAddress: '0xcdce2de35069a192c74a44adc94323bf80f8adcf',
    //     variableDebtTokenAddress: '0x9ae05c138ebaa84c0e65ee63edd5ad64a8b78ab6',
    //   },
    //   [metis['weth'].address]: {
    //     decimals: 18,
    //     symbol: 'grainWETH',
    //     address: '0x73d49aC28C4Fea2B8e7C6BF45d64A2e68ed53bE0',
    //     underlyingToken: metis['weth'],
    //     stableDebtTokenAddress: '0xcbd8930edde3f64cff1f1b1f079282d1377db62b',
    //     variableDebtTokenAddress: '0xe772bf4d6f458552bc6a0e067efd69b9c1acbcc3',
    //   },
    // },
  },
};

export default { basic, networks };
