import { memo } from 'react';
import styled from 'styled-components';

import Modal from '@/components/Modal';

import type { Chain } from '../types';

const Chains = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  padding: 10px 0px;
`;
const StyledChain = styled.div<{ active: boolean }>`
  cursor: pointer;
  align-items: center;
  display: flex;
  padding: 10px 20px;
  gap: 10px;
  color: #fff;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  ${({ active }) => active && 'background-color: #ebf479; pointer-events: none;color: #000'}
`;
const ChainLogo = styled.img`
  width: 36px;
  height: 36px;
`;
const ChainName = styled.div`
  font-size: 18px;
  font-weight: 500px;
`;

const DialogChains = ({
  display,
  chains,
  currentChainId,
  onClose,
  onSelect,
}: {
  display: boolean;
  chains: Chain[];
  currentChainId?: number;
  onClose: () => void;
  onSelect: (chain: Chain) => void;
}) => {
  return (
    <Modal
      display={display}
      title="Select Network"
      onClose={onClose}
      content={
        <Chains>
          {chains.map((chain) => (
            <StyledChain
              key={chain.chainId}
              onClick={() => {
                onSelect(chain);
              }}
              active={currentChainId === chain.chainId}
            >
              <ChainLogo src={chain.icon} />
              <ChainName>{chain.chainName}</ChainName>
            </StyledChain>
          ))}
        </Chains>
      }
    />
  );
};

export default memo(DialogChains);
