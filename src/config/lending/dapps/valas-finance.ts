import { bsc } from '@/config/tokens/bsc';

const basic = {
  name: 'Valas Finance',
  icon: 'https://ipfs.near.social/ipfs/bafkreibq6dfxzg4cmtntijp4wak2i6jytjgd5jxqluxvms3ennb7vvlf3e',
  data: 'bluebiu.near/widget/Lending.Data.Radiant',
  handler: 'bluebiu.near/widget/Lending.Handler.Radiant',
  type: 'aave2',
};

const networks = {
  // bsc
  56: {
    oracleAddress: '0x3436c4B4A27B793539844090e271591cbCb0303c',
    poolAddressProvider: '0x0736B3dAdDe5B78354BF7F7faaFAcEE82B1851b9',
    aaveProtocolDataProviderAddress: '0xc9704604E18982007fdEA348e8DDc7CC652E34cA',
    lendingPoolAddress: '0xE29A55A6AEFf5C8B1beedE5bCF2F0Cb3AF8F91f5',
    wethGateway: '0x3025D9f822D399FD7fB6275b5164bbdE6DC28A29',
    markets: {
      [bsc['wbnb'].address]: {
        decimals: 18,
        symbol: 'valBNB',
        address: '0xB11A912CD93DcffA8b609b4C021E89723ceb7FE8',
        underlyingToken: bsc['bnb'],
        stableDebtTokenAddress: '0x2Adc0c94A055f1FF64A35672D30Eb523ec647816',
        variableDebtTokenAddress: '0xE7CDC4e53915D50B74496847EeBa7233caE85CE5',
      },
      // [bsc['busd'].address]: {
      //   decimals: 18,
      //   symbol: 'valBUSD',
      //   address: '0xaeD19DAB3cd68E4267aec7B2479b1eD2144Ad77f',
      //   underlyingToken: bsc['busd'],
      //   stableDebtTokenAddress: '0x576efee43A35e8adf9FaaC6f9DDC5f8AAc77768F',
      //   variableDebtTokenAddress: '0x24758d41e5Aa89f79048076254A3d22927b2E0D4',
      // },
      [bsc['cake'].address]: {
        decimals: 18,
        symbol: 'valCAKE',
        address: '0xC37079A50611a742A018c39ba1C5EbDd89896334',
        underlyingToken: bsc['cake'],
        stableDebtTokenAddress: '0x0978AFdb6787779B4Eac6fEFE7E43e948F6cD6b8',
        variableDebtTokenAddress: '0xC7C7bF1F28d29cEa48F4AAAefb7E8C1FB43DB200',
      },
      [bsc['tusd'].address]: {
        decimals: 18,
        symbol: 'valTUSD',
        address: '0xBB5DDE96BAD874e4FFe000B41Fa5E98F0665a4BC',
        underlyingToken: bsc['tusd'],
        stableDebtTokenAddress: '0x8B0bFa69062315cD2063944d4d6723022B9c6E67',
        variableDebtTokenAddress: '0xaEB0AE2B4CF427E6E3ebe14b6B92f8bF2D68dfD4',
      },
      [bsc['usdc'].address]: {
        decimals: 18,
        symbol: 'valUSDC',
        address: '0xA6fDEa1655910C504E974f7F1B520B74be21857B',
        underlyingToken: bsc['usdc'],
        stableDebtTokenAddress: '0xd67dF5a99512697305F121E669Dd10a1A5E6081c',
        variableDebtTokenAddress: '0x8Ef780a3e1C266aF586315a9aDA19dBfC3a1E45c',
      },
      [bsc['usdt'].address]: {
        decimals: 18,
        symbol: 'valUSDT',
        address: '0x5f7f6cB266737B89f7aF86b30F03Ae94334b83e9',
        underlyingToken: bsc['usdt'],
        stableDebtTokenAddress: '0x0DBE974029970fFA1e298e1C1B723100c8f3B7b5',
        variableDebtTokenAddress: '0x256B441313e10b7210A6239070C085446a507bD8',
      },
      [bsc['btcb'].address]: {
        decimals: 18,
        symbol: 'valBTCB',
        address: '0x204992f7fCBC4c0455d7Fec5f712BeDd98E7d6d6',
        underlyingToken: bsc['btcb'],
        stableDebtTokenAddress: '0x07a1375a55C43fc8A02a051A3194cA400b30a890',
        variableDebtTokenAddress: '0x5651565e4F544911F16f9a717d3aCEccD29d1BdA',
      },
      [bsc['dai'].address]: {
        decimals: 18,
        symbol: 'valDAI',
        address: '0x2c85EBAE81b7078Cd656b2C6e2d58411cB41D91A',
        underlyingToken: bsc['dai'],
        stableDebtTokenAddress: '0x68cc1E4d949C41eDBB2b0A7498635E70c610072B',
        variableDebtTokenAddress: '0x1CF681fc1Df8aEF478A675DF40E62091B93E0Aac',
      },
      [bsc['eth'].address]: {
        decimals: 18,
        symbol: 'valETH',
        address: '0x831F42c8A0892C1a5b7Fa3E972B3CE3AA40D676e',
        underlyingToken: bsc['eth'],
        stableDebtTokenAddress: '0x27fE030832A8F01BCcBc0aAFBcb1C07da241D16c',
        variableDebtTokenAddress: '0x9e06035740ab5eD9F48D8fF8B588056693b83e3a',
      },
    },
  },
};

export default { basic, networks };
