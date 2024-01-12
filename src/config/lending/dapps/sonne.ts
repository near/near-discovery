import { base } from '@/config/tokens/base';
import { optimism } from '@/config/tokens/optimism';

const basic = {
  name: 'Sonne',
  icon: 'https://ipfs.near.social/ipfs/bafkreih3zbgnxv34qmlr62j5nq62uai6hsiykiyip3wgmfa7djewbwbdtq',
  data: 'bluebiu.near/widget/Lending.Data.Sonne',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  handlerClaim: 'bluebiu.near/widget/Linea.Lending.MendiHandlerClaim',
};

const networks = {
  8453: {
    unitrollerAddress: '0x1DB2466d9F5e10D7090E7152B68d62703a2245F0',
    oracleAddress: '0x3fb2ef203a051A5bF190fFBb2Fa510e78a5Bb103',
    lensAddress: '0x8e10362334A4549640481d330a0020238B37AD10',
    markets: {
      '0x5F5c479fe590cD4442A05aE4a941dd991A633B8E': {
        decimals: 8,
        symbol: 'sobWETH',
        address: '0x5F5c479fe590cD4442A05aE4a941dd991A633B8E',
        underlyingToken: base['weth'],
      },
      '0xb864BA2aab1f53BC3af7AE49a318202dD3fd54C2': {
        decimals: 8,
        symbol: 'sobDAI',
        address: '0xb864BA2aab1f53BC3af7AE49a318202dD3fd54C2',
        underlyingToken: base['dai'],
      },
      '0x225886C9beb5eeE254F79d58bbD80cf9F200D4d0': {
        decimals: 8,
        symbol: 'sobUSDbC',
        address: '0x225886C9beb5eeE254F79d58bbD80cf9F200D4d0',
        underlyingToken: base['usdbc'],
      },
      '0xfd68F92B45b633bbe0f475294C1A86aecD62985A': {
        decimals: 8,
        symbol: 'sobUSDC',
        address: '0xfd68F92B45b633bbe0f475294C1A86aecD62985A',
        underlyingToken: base['usdc'],
      },
    },
  },
  10: {
    unitrollerAddress: '0x60CF091cD3f50420d50fD7f707414d0DF4751C58',
    oracleAddress: '0x91579f47f7826471C08B0008eE9C778aaB2989fD',
    lensAddress: '0x168901193a72E82c00110C799c9C22f3AE6Fd311',
    markets: {
      '0xAFdf91f120DEC93c65fd63DBD5ec372e5dcA5f82': {
        decimals: 8,
        symbol: 'soLUSD',
        address: '0xAFdf91f120DEC93c65fd63DBD5ec372e5dcA5f82',
        underlyingToken: optimism['lusd'],
      },
      '0x5569b83de187375d43FBd747598bfe64fC8f6436': {
        decimals: 8,
        symbol: 'soDAI',
        address: '0x5569b83de187375d43FBd747598bfe64fC8f6436',
        underlyingToken: optimism['dai'],
      },
      '0xE7De932d50EfC9ea0a7a409Fc015B4f71443528e': {
        decimals: 8,
        symbol: 'soMAI',
        address: '0xE7De932d50EfC9ea0a7a409Fc015B4f71443528e',
        underlyingToken: optimism['mai'],
      },
      '0x8cD6b19A07d754bF36AdEEE79EDF4F2134a8F571': {
        decimals: 8,
        symbol: 'soOP',
        address: '0x8cD6b19A07d754bF36AdEEE79EDF4F2134a8F571',
        underlyingToken: optimism['op'],
      },
      '0xD7dAabd899D1fAbbC3A9ac162568939CEc0393Cc': {
        decimals: 8,
        symbol: 'soSNX',
        address: '0xD7dAabd899D1fAbbC3A9ac162568939CEc0393Cc',
        underlyingToken: optimism['snx'],
      },
      '0xEC8FEa79026FfEd168cCf5C627c7f486D77b765F': {
        decimals: 8,
        symbol: 'soUSDC',
        address: '0xEC8FEa79026FfEd168cCf5C627c7f486D77b765F',
        underlyingToken: optimism['usdc.e'],
      },
      '0x5Ff29E4470799b982408130EFAaBdeeAE7f66a10': {
        decimals: 8,
        symbol: 'soUSDT',
        address: '0x5Ff29E4470799b982408130EFAaBdeeAE7f66a10',
        underlyingToken: optimism['usdt'],
      },
    },
  },
};

export default { basic, networks };
