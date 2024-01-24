import { arbitrum } from '@/config/tokens/arbitrum';
import { bsc } from '@/config/tokens/bsc';
import { optimism } from '@/config/tokens/optimism';
import { polygon } from '@/config/tokens/polygon';

const basic = {
  name: 'WePiggy',
  icon: '/images/apps/we-piggy.png',
  data: 'bluebiu.near/widget/Lending.Data.WePiggy',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  handlerClaim: 'bluebiu.near/widget/Lending.RewardClaim.WePiggy',
};

const networks = {
  56: {
    unitrollerAddress: '0x8c925623708A94c7DE98a8e83e8200259fF716E0',
    oracleAddress: '0x4C78015679FabE22F6e02Ce8102AFbF7d93794eA',
    rewardAddress: '0xE6320460Aca9E4A4385058EEfD7D4D70123fC9c9',
    markets: {
      '0x33A32f0ad4AA704e28C93eD8Ffa61d50d51622a7': {
        decimals: 8,
        symbol: 'pBNB',
        address: '0x33A32f0ad4AA704e28C93eD8Ffa61d50d51622a7',
        underlyingToken: bsc['bnb'],
      },
      '0x849C37A029B38D3826562697Ccc40c34477C6293': {
        decimals: 8,
        symbol: 'pETH',
        address: '0x849C37A029B38D3826562697Ccc40c34477C6293',
        underlyingToken: bsc['eth'],
      },
      '0x311aEA58Ca127B955890647413846E351df32554': {
        decimals: 8,
        symbol: 'pBTCB',
        address: '0x311aEA58Ca127B955890647413846E351df32554',
        underlyingToken: bsc['btcb'],
      },
      '0x12D803497D1e58dD4D4A4F455D754f1d0F937C8b': {
        decimals: 8,
        symbol: 'pDAI',
        address: '0x12D803497D1e58dD4D4A4F455D754f1d0F937C8b',
        underlyingToken: bsc['dai'],
      },
      '0x2a8Cd78bFb91ACF53f589961D213d87c956e0d7f': {
        decimals: 8,
        symbol: 'pUSDT',
        address: '0x2a8Cd78bFb91ACF53f589961D213d87c956e0d7f',
        underlyingToken: bsc['usdt'],
      },
      '0x2B7F68170a598E507B19Bca41ED745eABc936B3F': {
        decimals: 8,
        symbol: 'pUSDC',
        address: '0x2B7F68170a598E507B19Bca41ED745eABc936B3F',
        underlyingToken: bsc['usdc'],
      },
      '0x417FDfC74503d8008AeEB53248E5C0f1960c2C1d': {
        decimals: 8,
        symbol: 'pCAKE',
        address: '0x417FDfC74503d8008AeEB53248E5C0f1960c2C1d',
        underlyingToken: bsc['cake'],
      },
      '0x00FF07204C3b27D72cF83Ef521Adb7066167561a': {
        decimals: 8,
        symbol: 'pLINK',
        address: '0x00FF07204C3b27D72cF83Ef521Adb7066167561a',
        underlyingToken: bsc['link'],
      },
      '0x811Cd5CB4cC43F44600Cfa5eE3F37a402C82aec2': {
        decimals: 8,
        symbol: 'pDOT',
        address: '0x811Cd5CB4cC43F44600Cfa5eE3F37a402C82aec2',
        underlyingToken: bsc['dot'],
      },
      '0x6a05BD123d780055c38526cC05d3c9B90D0E471c': {
        decimals: 8,
        symbol: 'pLTC',
        address: '0x6a05BD123d780055c38526cC05d3c9B90D0E471c',
        underlyingToken: bsc['ltc'],
      },
      '0xBc52BCE2C73Fec358ABBf047c50377183B9EAd0d': {
        decimals: 8,
        symbol: 'pADA',
        address: '0xBc52BCE2C73Fec358ABBf047c50377183B9EAd0d',
        underlyingToken: bsc['ada'],
      },
    },
  },
  42161: {
    unitrollerAddress: '0xaa87715E858b482931eB2f6f92E504571588390b',
    oracleAddress: '0x04d2944394b70d6e56fcf1CaD3aa6b5a43Ec8A5C',
    rewardAddress: '0x77401ff895bde043d40aae58f98de5698682c12a',
    markets: {
      '0x17933112E9780aBd0F27f2B7d9ddA9E840D43159': {
        decimals: 8,
        symbol: 'pETH',
        address: '0x17933112E9780aBd0F27f2B7d9ddA9E840D43159',
        underlyingToken: arbitrum['eth'],
      },
      '0x3393cD223f59F32CC0cC845DE938472595cA48a1': {
        decimals: 8,
        symbol: 'pWBTC',
        address: '0x3393cD223f59F32CC0cC845DE938472595cA48a1',
        underlyingToken: arbitrum['wbtc'],
      },
      '0x2Bf852e22C92Fd790f4AE54A76536c8C4217786b': {
        decimals: 8,
        symbol: 'pUSDC',
        address: '0x2Bf852e22C92Fd790f4AE54A76536c8C4217786b',
        underlyingToken: arbitrum['usdc.e'],
      },
      '0x8F87c9c6Efe9CA6997d6FEC8BC930C1fEd90ccC7': {
        decimals: 8,
        symbol: 'pLINK',
        address: '0x8F87c9c6Efe9CA6997d6FEC8BC930C1fEd90ccC7',
        underlyingToken: arbitrum['link'],
      },
      '0xB65Ab7e1c6c1Ba202baed82d6FB71975D56F007C': {
        decimals: 8,
        symbol: 'pUSDT',
        address: '0xB65Ab7e1c6c1Ba202baed82d6FB71975D56F007C',
        underlyingToken: arbitrum['usdt'],
      },
      '0xDe39Adfb2025D2aA51f6fD967e7C1753215f1905': {
        decimals: 8,
        symbol: 'pDAI',
        address: '0xDe39Adfb2025D2aA51f6fD967e7C1753215f1905',
        underlyingToken: arbitrum['dai'],
      },
    },
  },
  10: {
    unitrollerAddress: '0x896aecb9E73Bf21C50855B7874729596d0e511CB',
    oracleAddress: '0xb205d0AeF84C666FBBe441C61DC04fEb844444E6',
    rewardAddress: '0x3157e0bbDc7E5DEa0f4c33a0Ad7211B9a4FF19Ee',
    markets: {
      '0x8e1e582879Cb8baC6283368e8ede458B63F499a5': {
        decimals: 8,
        symbol: 'pETH',
        address: '0x8e1e582879Cb8baC6283368e8ede458B63F499a5',
        underlyingToken: optimism['eth'],
      },
      '0x811Cd5CB4cC43F44600Cfa5eE3F37a402C82aec2': {
        decimals: 8,
        symbol: 'pUSDC',
        address: '0x811Cd5CB4cC43F44600Cfa5eE3F37a402C82aec2',
        underlyingToken: optimism['usdc.e'],
      },
      '0x8158B34fF8A36dD9E4519d62C52913C24ad5554b': {
        decimals: 8,
        symbol: 'pUSDT',
        address: '0x8158B34fF8A36dD9E4519d62C52913C24ad5554b',
        underlyingToken: optimism['usdt'],
      },
      '0xc12B9D620bFCB48be3e0CCbf0ea80C717333b46F': {
        decimals: 8,
        symbol: 'pDAI',
        address: '0xc12B9D620bFCB48be3e0CCbf0ea80C717333b46F',
        underlyingToken: optimism['dai'],
      },
      '0x48a5322c3021d5eD5CE4293112141045d12c7EFC': {
        decimals: 8,
        symbol: 'pBTC',
        address: '0x48a5322c3021d5eD5CE4293112141045d12c7EFC',
        underlyingToken: optimism['wbtc'],
      },
      '0x8F00a5E13b3F2AaAddc9708AD5c77FbCc300b0EE': {
        decimals: 8,
        symbol: 'pLINK',
        address: '0x8F00a5E13b3F2AaAddc9708AD5c77FbCc300b0EE',
        underlyingToken: optimism['link'],
      },
    },
  },
  137: {
    unitrollerAddress: '0xFfceAcfD39117030314A07b2C86dA36E51787948',
    oracleAddress: '0x4C78015679FabE22F6e02Ce8102AFbF7d93794eA',
    rewardAddress: '0x16b321C99Ab31A84D565ea484F035693718c3E71',
    markets: {
      '0xC1B02E52e9512519EDF99671931772E452fb4399': {
        decimals: 8,
        symbol: 'pMATIC',
        address: '0xC1B02E52e9512519EDF99671931772E452fb4399',
        underlyingToken: polygon['matic'],
      },
      '0x12D803497D1e58dD4D4A4F455D754f1d0F937C8b': {
        decimals: 8,
        symbol: 'pUSDC',
        address: '0x12D803497D1e58dD4D4A4F455D754f1d0F937C8b',
        underlyingToken: polygon['usdc'],
      },
      '0x0C8c1ab017c3C0c8A48dD9F1DB2F59022D190f0b': {
        decimals: 8,
        symbol: 'pUSDT',
        address: '0x0C8c1ab017c3C0c8A48dD9F1DB2F59022D190f0b',
        underlyingToken: polygon['usdt'],
      },
      '0x5cFad792C4Df1323188180778AeC58E00eAcE32a': {
        decimals: 8,
        symbol: 'pDAI',
        address: '0x5cFad792C4Df1323188180778AeC58E00eAcE32a',
        underlyingToken: polygon['dai'],
      },
      '0xf4B6d5d432F1C7A9EfC9E0b04acDe479F9FD1f72': {
        decimals: 8,
        symbol: 'pWETH',
        address: '0xf4B6d5d432F1C7A9EfC9E0b04acDe479F9FD1f72',
        underlyingToken: polygon['weth'],
      },
      '0xf19200b30a0416322d58e6B6b1d6B5F832936729': {
        decimals: 8,
        symbol: 'pWBTC',
        address: '0xf19200b30a0416322d58e6B6b1d6B5F832936729',
        underlyingToken: polygon['wbtc'],
      },
      '0x1b1CD0fDb6592fe482026b8E47706EAC1ee94a7c': {
        decimals: 8,
        symbol: 'pSUSHI',
        address: '0x1b1CD0fDb6592fe482026b8E47706EAC1ee94a7c',
        underlyingToken: polygon['sushi'],
      },
      '0x3A9CAD689a510A7C410EE1bE17929cdf78efAC8C': {
        decimals: 8,
        symbol: 'pLINK',
        address: '0x3A9CAD689a510A7C410EE1bE17929cdf78efAC8C',
        underlyingToken: polygon['link'],
      },
      '0xc28E11040c529a6828c20A641f8F75B7C0ea92E3': {
        decimals: 8,
        symbol: 'pCRV',
        address: '0xc28E11040c529a6828c20A641f8F75B7C0ea92E3',
        underlyingToken: polygon['crv'],
      },
    },
  },
};

export default { basic, networks };
