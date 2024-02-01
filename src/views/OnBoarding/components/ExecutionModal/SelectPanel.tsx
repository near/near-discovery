import { memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { container } from '@/components/animation';
import { StyledSelectPanel, StyledSelectPanelItem, StyledDapp, StyledDappIcon, StyledDappName } from './styles';

const SelectPanel = ({ dapps, open, currentDapp, onSelect }: any) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <StyledSelectPanel {...container}>
          {Object.values(dapps).map((dapp: any) => (
            <StyledSelectPanelItem
              key={dapp.name}
              onClick={() => {
                onSelect(dapp);
              }}
            >
              <StyledDapp>
                <StyledDappIcon src={dapp.logo || dapp.icon} />
                <StyledDappName>{dapp.name}</StyledDappName>
              </StyledDapp>
              {currentDapp.name === dapp.name && (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 4.11111L5.28571 8L13 1" stroke="#EBF479" stroke-width="2" stroke-linecap="round" />
                </svg>
              )}
            </StyledSelectPanelItem>
          ))}
        </StyledSelectPanel>
      )}
    </AnimatePresence>
  );
};

export default memo(SelectPanel);
