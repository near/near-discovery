import Timer from '@/views/Quest/components/Timer';
import ProcessBar from '@/views/Quest/components/ProcessBar';
import ActionItem from './Item';
import { StyledContainer, StyledHeader, StyledLabel, StyledButton, StyledCoin, StyledProcessBars } from './styles';

import { memo } from 'react';

const Actions = ({
  actions,
  endTime,
  rewards,
  completed,
}: {
  actions: any;
  endTime: number;
  rewards: number;
  completed: number;
}) => {
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledLabel>Actions</StyledLabel>
        {endTime && <Timer endTime={Number(endTime)} />}
      </StyledHeader>
      {actions.map((action: any) => (
        <ActionItem key={action.id} action={action} />
      ))}
      <StyledLabel style={{ marginTop: '30px' }}>Your prccess</StyledLabel>
      <StyledProcessBars>
        {actions.map((action: any) => (
          <ProcessBar size={4} value={0} noBorder={true} key={action.id} />
        ))}
      </StyledProcessBars>
      <StyledButton disabled={!completed}>
        <span>Claim</span>
        <StyledCoin $size={20} />
        <span>{rewards} PTS</span>
      </StyledButton>
    </StyledContainer>
  );
};

export default memo(Actions);
