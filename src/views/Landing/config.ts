import chainCofig from '@/config/chains';

export const CHAIN_ID = 59144;
export const FROM_CHAIN_ID = 1;

export const steps = [
  {
    title: 'Bridge',
    desc: `Use our in-app bridging on the right to transfer any Ethereum token to ${chainCofig[CHAIN_ID].chainName}`,
  },
  {
    title: 'Learn about Quick Onboarding',
    desc: 'Follow our tutorial to learn everything you need to know about our ‘Quick Onboarding’ feature.',
  },
  {
    title: 'Explore Quest',
    desc: 'Learn more about our quests to earn $PTS.',
  },
];

export const bgs: { [key: number]: string } = {
  2: '/images/landing/2.png',
  3: '/images/landing/3.png',
  4: '/images/landing/3.png',
};
