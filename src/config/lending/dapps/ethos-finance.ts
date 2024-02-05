import { optimism } from '@/config/tokens/optimism';

const BORROW_TOKEN = 'ERN';
const BORROW_URL = 'https://assets.coingecko.com/coins/images/29744/standard/ERN200x200.png?1696528676';

const MIN_DEBT = 90;
const ONE_TIME_FEE = 1.42; //TODO
const MAX_LTV = 0.8333; // 100/108

const basic = {
  name: 'Ethos Finance',
  // icon: '/images/apps/granary.png',
  data: 'bluebiu.near/widget/Lending.Data.Liquity',
  // handler: 'bluebiu.near/widget/Lending.Handler.Liquity',
  type: 'liquity',
  BORROW_TOKEN,
  BORROW_URL,
};

const networks = {
  //  optimism
  10: {
    StabilityPool: '0xd839a111598d5e27bd8f7a1a18ce9bf079f0c0a2',
    borrowTokenAddress: '0xc5b001dc33727f8f26880b184090d3e252470d45',
    VesselManager: '0x75C72F459f2054B46ceFD6D10eC99d0fbd777F05', //TODO
    VesselManagerOperations: '0xd584A5E956106DB2fE74d56A0B14a9d64BE8DC93', //TODO
    BorrowerOperations: '0xaa0b41b61f76587cf85155147d7f3b7725d14eb3',
    markets: {
      [optimism['wbtc'].address]: {
        decimals: 8,
        underlyingToken: optimism['wbtc'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV,
        ONE_TIME_FEE,
        MIN_DEBT,
        MCR: 1.1, //110%
        // MINTED: 0,
        // MINTED_CAP: 500000,
      },
      [optimism['weth'].address]: {
        decimals: 18,
        underlyingToken: optimism['weth'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV,
        ONE_TIME_FEE,
        MIN_DEBT,
        MCR: 1.08, //108%
        // MINTED: 0,
        // MINTED_CAP: 500000,
      },
      [optimism['wstETH'].address]: {
        decimals: 18,
        underlyingToken: optimism['wstETH'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV, // UNUSED
        ONE_TIME_FEE,
        MIN_DEBT,
        MCR: 1.1, //110%
        // MINTED: 0,
        // MINTED_CAP: 500000,
      },
    },
  },
};

export default { basic, networks };
