import { memo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GoMore from '@/components/GoMore';
import Dapps from '@/components/Dapps';
import { container } from '@/components/animation';
import useDapps from '../../hooks/useDapps';
import { StyledContainer, StyledTitle, StyledTabsWrapper, StyledTabs, StyledTab, StyledDesc } from './styles';

const TABS = [
  {
    label: 'Featured',
    key: 'Y',
  },
  {
    label: 'Upcoming Token🔥',
    key: 'N',
  },
];

const DiscoveryDapps = () => {
  const [tab, setTab] = useState('Y');
  const { loading, featuredDapps, upcomingDapps } = useDapps();
  return (
    <StyledContainer>
      <StyledTitle>Discovery dApps</StyledTitle>
      <StyledTabsWrapper>
        <StyledTabs>
          {TABS.map((_tab: any) => (
            <StyledTab
              onClick={() => {
                setTab(_tab.key);
              }}
              key={_tab.key}
              className={_tab.key === tab ? 'active' : ''}
            >
              {_tab.label}
            </StyledTab>
          ))}
        </StyledTabs>
        <GoMore label="Explore all" path="/alldapps" bp="1001-006" />
      </StyledTabsWrapper>
      <StyledDesc>
        Experience a tailored selection of dApps, handpicked for their potential to improve your DeFi journey.
      </StyledDesc>
      {tab === 'Y' && (
        <AnimatePresence mode="wait">
          <motion.div {...container}>
            <Dapps dapps={featuredDapps || []} bp={{ detail: '1001-004', dapp: '1001-005' }} />
          </motion.div>
        </AnimatePresence>
      )}

      {tab === 'N' && (
        <AnimatePresence mode="wait">
          <motion.div {...container}>
            <Dapps dapps={upcomingDapps || []} bp={{ detail: '1001-004', dapp: '1001-005' }} />
          </motion.div>
        </AnimatePresence>
      )}
    </StyledContainer>
  );
};

export default memo(DiscoveryDapps);
