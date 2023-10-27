import { memo } from 'react';
import styled from 'styled-components';

import Bridge from '@/components/Bridge';
import ArrowIcon from '@/components/Icons/ArrowIcon';

import Split from './Split';

const StyledBridgeWrapper = styled.div`
  color: #fff;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-left: var(--padding-x);
  padding-right: var(--padding-x);
`;
const StyledArrowIcon = styled.div`
  cursor: pointer;
  transform: rotate(90deg);
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
`;
const Icon = styled.div`
  opacity: 0.6;
`;
const Box = styled.div`
  padding-left: var(--padding-x);
  padding-right: var(--padding-x);
  margin-top: 20px;
`;

const BridgeWrapper = ({ onBack }: { onBack: () => void }) => {
  return (
    <StyledBridgeWrapper>
      <Split mt={20} />
      <Header>
        <StyledArrowIcon onClick={onBack}>
          <ArrowIcon size={14} />
        </StyledArrowIcon>
        <Title>Bridge</Title>
        <Icon>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4.2666H17" stroke="white" stroke-width="2" stroke-linecap="round" />
            <path d="M1 13.8667H17" stroke="white" stroke-width="2" stroke-linecap="round" />
            <circle cx="11" cy="4" r="3" fill="#141414" stroke="white" stroke-width="2" />
            <circle cx="7" cy="14" r="3" fill="#141414" stroke="white" stroke-width="2" />
          </svg>
        </Icon>
      </Header>
      <Box>
        <Bridge />
      </Box>
    </StyledBridgeWrapper>
  );
};

export default memo(BridgeWrapper);
