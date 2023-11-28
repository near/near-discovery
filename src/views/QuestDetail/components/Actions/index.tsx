import Timer from '@/views/Quest/components/Timer';
import ProcessBar from '@/views/Quest/components/ProcessBar';
import ActionItem from './Item';
import { StyledContainer, StyledHeader, StyledLabel, StyledButton, StyledCoin, StyledProcessBars } from './styles';

import { memo } from 'react';

const Actions = () => {
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledLabel>Actions</StyledLabel>
        <Timer />
      </StyledHeader>
      <ActionItem />
      <StyledLabel style={{ marginTop: '30px' }}>Your prccess</StyledLabel>
      <StyledProcessBars>
        <ProcessBar size={4} value={0} noBorder={true} />
        <ProcessBar size={4} value={50} noBorder={true} />
        <ProcessBar size={4} value={100} noBorder={true} />
      </StyledProcessBars>
      <StyledButton>
        <span>Claim</span>
        <StyledCoin $size={20} />
        <span>200 PTS</span>
      </StyledButton>
    </StyledContainer>
  );
};

export default memo(Actions);
