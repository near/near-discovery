import { avalanche } from '@/config/tokens/avalanche';

const basic = {
  name: 'Benqi',
  icon: '/images/apps/benqi.png',
  data: 'bluebiu.near/widget/Lending.Data.Benqi',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  handlerClaim: 'bluebiu.near/widget/Avalanche.Lending.BenqiClaimHandler',
};

const networks = {
  43114: {
    unitrollerAddress: '0x486Af39519B4Dc9a7fCcd318217352830E8AD9b4',
    oracleAddress: '0x316ae55ec59e0beb2121c0e41d4bdef8bf66b32b',
    lensAddress: '0x87457bF0451914bF62C6c1bC2dc9eB1A8076Eb8E',
    markets: {
      '0xe194c4c5aC32a3C9ffDb358d9Bfd523a0B6d1568': {
        decimals: 8,
        symbol: 'qiBTC',
        address: '0xe194c4c5aC32a3C9ffDb358d9Bfd523a0B6d1568',
        underlyingToken: avalanche['wbtc.e'],
      },
      '0x334AD834Cd4481BB02d09615E7c11a00579A7909': {
        decimals: 8,
        symbol: 'qiETH',
        address: '0x334AD834Cd4481BB02d09615E7c11a00579A7909',
        underlyingToken: avalanche['eth'],
      },
      '0xc9e5999b8e75C3fEB117F6f73E664b9f3C8ca65C': {
        decimals: 8,
        symbol: 'qiUSDT',
        address: '0xc9e5999b8e75C3fEB117F6f73E664b9f3C8ca65C',
        underlyingToken: avalanche['usdt.e'],
      },
      '0x4e9f683A27a6BdAD3FC2764003759277e93696e6': {
        decimals: 8,
        symbol: 'qiLINK',
        address: '0x4e9f683A27a6BdAD3FC2764003759277e93696e6',
        underlyingToken: avalanche['link.e'],
      },
      '0x835866d37AFB8CB8F8334dCCdaf66cf01832Ff5D': {
        decimals: 8,
        symbol: 'qiDAI',
        address: '0x835866d37AFB8CB8F8334dCCdaf66cf01832Ff5D',
        underlyingToken: avalanche['dai.e'],
      },
      '0xBEb5d47A3f720Ec0a390d04b4d41ED7d9688bC7F': {
        decimals: 8,
        symbol: 'qiUSDC',
        address: '0xBEb5d47A3f720Ec0a390d04b4d41ED7d9688bC7F',
        underlyingToken: avalanche['usdc.e'],
      },
      '0xB715808a78F6041E46d61Cb123C9B4A27056AE9C': {
        decimals: 8,
        symbol: 'qiUSDCn',
        address: '0xB715808a78F6041E46d61Cb123C9B4A27056AE9C',
        underlyingToken: avalanche['usdc'],
      },
      '0xd8fcDa6ec4Bdc547C0827B8804e89aCd817d56EF': {
        decimals: 8,
        symbol: 'qiUSDTn',
        address: '0xd8fcDa6ec4Bdc547C0827B8804e89aCd817d56EF',
        underlyingToken: avalanche['usdt'],
      },
      '0xF362feA9659cf036792c9cb02f8ff8198E21B4cB': {
        decimals: 8,
        symbol: 'qisAVAX',
        address: '0xF362feA9659cf036792c9cb02f8ff8198E21B4cB',
        underlyingToken: avalanche['savax'],
      },
      '0x89a415b3D20098E6A6C8f7a59001C67BD3129821': {
        decimals: 8,
        symbol: 'qiBTC.b',
        address: '0x89a415b3D20098E6A6C8f7a59001C67BD3129821',
        underlyingToken: avalanche['btc.b'],
      },
    },
  },
};

export default { basic, networks };
