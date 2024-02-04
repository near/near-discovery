import { zkSync } from '@/config/tokens/zkSync';

// const BORROW_TOKEN = 'GRAI';
// const BORROW_URL = 'https://ipfs.near.social/ipfs/bafkreihv4qckd2us54qbgljcriwtbrmmmxrpmgvyg5xf5rjp456pcr25ui';

// const MIN_DEBT = 200;

const basic = {
  name: 'zerolend',
  // icon: '/images/apps/granary.png',
  // data: 'bluebiu.near/widget/Lending.Data.Liquity',
  // handler: 'bluebiu.near/widget/Lending.Handler.Liquity',
  type: 'aave-v3',
  // BORROW_TOKEN,
  // BORROW_URL,
};

const networks = {
  324: {
    // wethGateway: '0x4d8d90FAF90405b9743Ce600E98A2Aa8CdF579a0',
    // StabilityPool: '0xDAce04E411D9916169c0401033a7f76994eF5A0f',
    // borrowTokenAddress: '0x5FC44E95eaa48F9eB84Be17bd3aC66B6A82Af709',
    // BorrowerOperations: '0xd085Fd2338Cefb9cBD212F74d479072C1E7A25bf',
    // VesselManager: '0x8D9CDd9372740933702d606EaD3BB55dFfDC6303',
    // VesselManagerOperations: '0x03569d4c117f94e72e9f63B06F406c5bc7caddE9',
    markets: {
      [zkSync['weth'].address]: {
        decimals: 18,
        underlyingToken: zkSync['weth'],
      },
    },
  },
};

export default { basic, networks };
