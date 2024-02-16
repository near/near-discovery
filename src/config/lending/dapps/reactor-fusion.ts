import { zkSync } from '@/config/tokens/zkSync';

const basic = {
  name: 'Reactorfusion',
  icon: '/images/apps/reactorfusion.png',
  data: 'bluebiu.near/widget/Lending.Data.Reactorfusion',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
};

const networks = {
  324: {
    unitrollerAddress: '0x23848c28Af1C3AA7B999fA57e6b6E8599C17F3f2',
    oracleAddress: '0x9919f167326AE0f6251dB2fF05F6F70eC6e0c6c2',
    markets: {
      '0xC5db68F30D21cBe0C9Eac7BE5eA83468d69297e6': {
        decimals: 18,
        symbol: 'rfETH',
        address: '0xC5db68F30D21cBe0C9Eac7BE5eA83468d69297e6',
        underlyingToken: zkSync['eth'],
      },
      '0x04e9Db37d8EA0760072e1aCE3F2A219988Fdac29': {
        decimals: 6,
        symbol: 'rfUSDC',
        address: '0x04e9Db37d8EA0760072e1aCE3F2A219988Fdac29',
        underlyingToken: zkSync['usdc'],
      },
      '0x0a976E1E7D3052bEb46085AcBE1e0DAccF4A19CF': {
        decimals: 8,
        symbol: 'rfWBTC',
        address: '0x0a976E1E7D3052bEb46085AcBE1e0DAccF4A19CF',
        underlyingToken: zkSync['wbtc'],
      },
    },
  },
};

export default { basic, networks };
