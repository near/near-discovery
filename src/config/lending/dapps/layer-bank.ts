import { linea } from '@/config/tokens/linea';
import { manta } from '@/config/tokens/manta';
import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'LayerBank',
  icon: '/images/apps/layer-bank.png',
  data: 'bluebiu.near/widget/Lending.Data.LayerBank',
  handler: 'bluebiu.near/widget/Lending.Handler.LayerBank',
  handlerClaim: 'bluebiu.near/widget/Linea.Lending.LayerBankHandlerClaim',
};

const networks = {
  59144: {
    unitrollerAddress: '0x009a0b7C38B542208936F1179151CD08E2943833',
    oracleAddress: '0x4F5F443fEC450fD64Dce57CCacE8f5ad10b4028f',
    rateModelSlopeAddress: '0xC690549E0215192D1fFB527BB3ca4D4Ba638Cad2',
    distributionAddress: '0x5D06067f86946620C326713b846DdC8B97470957',
    markets: {
      '0xEa0F73296a6147FB56bAE29306Aae0FFAfF9De5F': {
        decimals: 18,
        symbol: 'lWBTC',
        address: '0xEa0F73296a6147FB56bAE29306Aae0FFAfF9De5F',
        underlyingToken: linea['wbtc'],
      },
      '0xc7D8489DaE3D2EbEF075b1dB2257E2c231C9D231': {
        decimals: 18,
        symbol: 'lETH',
        address: '0xc7D8489DaE3D2EbEF075b1dB2257E2c231C9D231',
        underlyingToken: linea['eth'],
      },
      '0x2aD69A0Cf272B9941c7dDcaDa7B0273E9046C4B0': {
        decimals: 18,
        symbol: 'lUSDC',
        address: '0x2aD69A0Cf272B9941c7dDcaDa7B0273E9046C4B0',
        underlyingToken: linea['usdc'],
      },
    },
    rewardToken: linea['lab'],
  },
  169: {
    unitrollerAddress: '0xB7A23Fc0b066051dE58B922dC1a08f33DF748bbf',
    oracleAddress: '0x38f4384B457F81A4895c93a7503c255eFd0746d2',
    rateModelSlopeAddress: '0x27F85bD47740139a56e34124B33481ea6e1e660D',
    distributionAddress: '0x67c10B7b8eEFe92EB4DfdEeedd94263632E483b0',
    markets: {
      '0x472D43A8f00A41c3431e549367d2DE2E07c5e388': {
        decimals: 18,
        symbol: 'lwUSDM',
        address: '0x472D43A8f00A41c3431e549367d2DE2E07c5e388',
        underlyingToken: manta['wusdm'],
      },
      '0x71384B2c17433Ba1D8F6Fe895E9B2E7953dCED68': {
        decimals: 18,
        symbol: 'lSTONE',
        address: '0x71384B2c17433Ba1D8F6Fe895E9B2E7953dCED68',
        underlyingToken: manta['stone'],
      },
      '0x7479c717f2B72116D15B4eaF8D540C497E07e0B6': {
        decimals: 18,
        symbol: 'lETH',
        address: '0x7479c717f2B72116D15B4eaF8D540C497E07e0B6',
        underlyingToken: manta['eth'],
      },
      '0x7Def25c6C2b4Bc9e9fB5122D22650F8EcdFeff45': {
        decimals: 18,
        symbol: 'lUSDC',
        address: '0x7Def25c6C2b4Bc9e9fB5122D22650F8EcdFeff45',
        underlyingToken: manta['usdc'],
      },
      '0x9d8Ecb502d2Ac290644D70A096165188D47e21A4': {
        decimals: 18,
        symbol: 'lTIA',
        address: '0x9d8Ecb502d2Ac290644D70A096165188D47e21A4',
        underlyingToken: manta['tia'],
      },
      '0xDF4b60ce539648AB05541827A3bf0a079a5fc1C2': {
        decimals: 18,
        symbol: 'lwstETH',
        address: '0xDF4b60ce539648AB05541827A3bf0a079a5fc1C2',
        underlyingToken: manta['wsteth'],
      },
    },
    rewardToken: manta['lab'],
  },
  534352: {
    unitrollerAddress: '0xEC53c830f4444a8A56455c6836b5D2aA794289Aa',
    oracleAddress: '0x760bd7Fc100F217678D1b521404D2E93Db7Bec5F',
    rateModelSlopeAddress: '0x18941f10B29a7F6d5290F3B1D5fcC7ae9f6f8DF4',
    distributionAddress: '0xF1F897601A525F57c5EA751a1F3ec5f9ADAc0321',
    markets: {
      '0x274C3795dadfEbf562932992bF241ae087e0a98C': {
        decimals: 18,
        symbol: 'lETH',
        address: '0x274C3795dadfEbf562932992bF241ae087e0a98C',
        underlyingToken: { ...scroll['eth'], address: '0x0000000000000000000000000000000000000000' },
      },
      '0x0D8F8e271DD3f2fC58e5716d3Ff7041dBe3F0688': {
        decimals: 18,
        symbol: 'lUSDC',
        address: '0x0D8F8e271DD3f2fC58e5716d3Ff7041dBe3F0688',
        underlyingToken: scroll['usdc'],
      },
      '0xB6966083c7b68175B4BF77511608AEe9A80d2Ca4': {
        decimals: 18,
        symbol: 'wstETH',
        address: '0xB6966083c7b68175B4BF77511608AEe9A80d2Ca4',
        underlyingToken: scroll['wsteth'],
      },
    },
    rewardToken: scroll['lab'],
  },
};

export default { basic, networks };
