export default {
  1: {
    path: '/odyssey/home?id=1',
    chainsImg: '/images/compass/v1_chains.png',
    chainsHeight: '69px',
    showPrizeLabel: true,
  },
  2: {
    path: '/odyssey/v2',
    chainsImg: '/images/odyssey/v2/chains.png',
    chainsHeight: '56px',
    showPrizeLabel: false,
  },
} as {
  [key: string]: {
    path: string;
    chainsImg: string;
    showPrizeLabel: boolean;
    chainsHeight: string;
  };
};
