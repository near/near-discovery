import { StyledTabs, StyledTab, StyledCoin, StyledFist, StyledTabWrap, StyledTabActiveBg } from './styles';

import { memo } from 'react';
import { motion } from 'framer-motion';

import type { Tab } from '../../types';

const TABS: { name: string; key: Tab }[] = [
  {
    name: 'Quests',
    key: 'quests',
  },
  {
    name: 'Leaderboard',
    key: 'leaderboard',
  },
];

const Tabs = ({ current, onChange }: { current: Tab; onChange: (tab: Tab) => void }) => {
  return (
    <StyledTabs $width={500} $mt={60}>
      {TABS.map((tab, i) => (
        <StyledTabWrap
          onClick={() => {
            onChange(tab.key);
          }}
          key={tab.key}
        >
          <StyledTab $active={current === tab.key}>
            {tab.key === 'quests' && <StyledFist $size={37} />}
            {tab.key === 'leaderboard' && <StyledCoin $size={34} />}
            <span>{tab.name}</span>
          </StyledTab>
          {current === tab.key && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {
                  x: i === 0 ? '50%' : '-50%',
                },
                show: {
                  x: '0%',
                  transition: {
                    staggerChildren: 0.5,
                  },
                },
              }}
            >
              <StyledTabActiveBg />
            </motion.div>
          )}
        </StyledTabWrap>
      ))}
    </StyledTabs>
  );
};

export default memo(Tabs);
