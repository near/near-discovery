import { motion } from 'framer-motion';
import { memo, useRef } from 'react';

import type { Tab } from '../../types';
import {
  StyledCoin,
  StyledFavorite,
  StyledFist,
  StyledTab,
  StyledTabActiveBg,
  StyledTabs,
  StyledTabWrap,
} from './styles';

const TABS: { name: string; key: Tab }[] = [
  {
    name: 'Quest of participation',
    key: 'quests',
  },
  {
    name: 'Favorites',
    key: 'favorites',
  },
  {
    name: 'Your PTS',
    key: 'pts',
  },
];

const Tabs = ({ current, onChange }: { current: Tab; onChange: (tab: Tab) => void }) => {
  const index = useRef<number>(0);
  return (
    <StyledTabs $width={730} $mt={60}>
      {TABS.map((tab, i) => (
        <StyledTabWrap
          onClick={() => {
            index.current = TABS.findIndex((tab) => tab.key === current);
            onChange(tab.key);
          }}
          key={tab.key}
        >
          <StyledTab $active={current === tab.key}>
            {tab.key === 'quests' && <StyledFist $size={37} />}
            {tab.key === 'favorites' && <StyledFavorite $size={37} />}
            {tab.key === 'pts' && <StyledCoin $size={34} />}
            <span>{tab.name}</span>
          </StyledTab>
          {current === tab.key && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {
                  x: index.current > i ? '30%' : '-30%',
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
