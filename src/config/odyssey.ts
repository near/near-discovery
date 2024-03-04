export default {
  1: {
    path: '/odyssey/home?id=1',
    chainsImg: '/images/compass/v1_chains.png',
    showPrizeLabel: true,
  },
  2: {
    path: '/odyssey/v2',
    chainsImg: '/images/odyssey/v2/chains.png',
    showPrizeLabel: false,
  },
} as {
  [key: string]: {
    path: string;
    chainsImg: string;
    showPrizeLabel: boolean;
  };
};
