import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'LayerBank',
  icon: 'https://ipfs.near.social/ipfs/bafkreiecfhuuc6grbyfxfv4uzgaciofdug6sdqv7efruu4uwmzclfqmcs4',
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
};

export default { basic, networks };
