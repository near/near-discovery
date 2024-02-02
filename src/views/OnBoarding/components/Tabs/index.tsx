import { memo } from 'react';
import { motion } from 'framer-motion';
import { StyledContainer, StyledTabWrap, StyledTab, StyledTabActiveBg } from './styles';

const TABS = [
  {
    name: 'Onboarding Actions',
    key: 'onboarding',
  },
  {
    name: 'My Actions',
    key: 'my',
  },
];

const Tabs = ({ current, onChange }: any) => {
  return (
    <StyledContainer>
      {TABS.map((tab, i) => (
        <StyledTabWrap
          onClick={() => {
            onChange(tab.key);
          }}
          key={tab.key}
        >
          <StyledTab $active={current === tab.key}>
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
    </StyledContainer>
  );
};

export default memo(Tabs);
