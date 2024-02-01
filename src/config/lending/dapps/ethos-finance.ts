import { optimism } from '@/config/tokens/optimism';

const BORROW_TOKEN = 'ERN';
const BORROW_URL = 'https://assets.coingecko.com/coins/images/29744/standard/ERN200x200.png?1696528676';

const MIN_DEBT = 90;
const ONE_TIME_FEE = 1.42; //TODO
const MAX_LTV = 92.6; // 100/108

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
    // StabilityPool: '0x8B147A2d4Fc3598079C64b8BF9Ad2f776786CFed',
    borrowTokenAddress: '0xc5b001dc33727f8f26880b184090d3e252470d45',
    VesselManager: '0xd584A5E956106DB2fE74d56A0B14a9d64BE8DC93', //TODO
    VesselManagerOperations: '0xd584A5E956106DB2fE74d56A0B14a9d64BE8DC93', //TODO
    BorrowerOperations: '0x0a4582d3d9ecBAb80a66DAd8A881BE3b771d3e5B',
    markets: {
      [optimism['wbtc'].address]: {
        decimals: 8,
        underlyingToken: optimism['wbtc'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV,
        ONE_TIME_FEE,
        MIN_DEBT,
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
        // MINTED: 0,
        // MINTED_CAP: 500000,
      },
      [optimism['wstETH'].address]: {
        decimals: 18,
        underlyingToken: optimism['wstETH'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV,
        ONE_TIME_FEE,
        MIN_DEBT,
        // MINTED: 0,
        // MINTED_CAP: 500000,
      },
    },
  },
};

export default { basic, networks };
