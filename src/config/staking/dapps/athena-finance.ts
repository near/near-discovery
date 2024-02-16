import { metis } from '@/config/tokens/metis';

const basic = {
  name: 'Athena Finance',
  // icon: '/images/apps/granary.png',
  // data: 'bluebiu.near/widget/Lending.Data.Liquity',
  // handler: 'bluebiu.near/widget/Lending.Handler.Liquity',
  type: 'staking',
};

const tokenArray = Object.values(metis);
const tokenMapping = tokenArray.reduce((prev, cur) => {
  (prev as any)[cur.address] = cur;
  return prev;
}, {});

const networks = {
  // metis
  1088: {
    // RewardPoolDepositWrapper: '0x0Fec3d212BcC29eF3E505B555D7a7343DF0B7F76',
    // PoolContractWrapper: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
    TOKENS: tokenMapping,
    markets: {
      // [gnosis['wmatic'].address]: {
      //   decimals: 18,
      //   underlyingToken: gnosis['wmatic'],
      // },
    },
  },
};

export default { basic, networks };
