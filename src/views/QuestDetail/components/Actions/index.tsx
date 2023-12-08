import { memo } from 'react';
import useRewardsClaim from '@/hooks/useRewardsClaim';
import Loading from '@/components/Icons/Loading';
import Timer from '@/views/Quest/components/Timer';
import ProcessBar from '@/views/Quest/components/ProcessBar';
import ActionItem from './Item';
import { StyledContainer, StyledHeader, StyledLabel, StyledButton, StyledCoin, StyledProcessBars } from './styles';

const Actions = ({
  actions,
  endTime,
  rewards,
  completed,
  id,
}: {
  actions: any;
  endTime: number;
  rewards: number;
  completed: number;
  id: string;
}) => {
  const { loading, handleClaim } = useRewardsClaim(() => {});
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledLabel>Actions</StyledLabel>
        {endTime && <Timer endTime={Number(endTime)} />}
      </StyledHeader>
      {actions.map((action: any, i: number) => (
        <ActionItem key={action.id} action={action} completed={action.status === 'completed'} />
      ))}
      <StyledLabel style={{ marginTop: '30px' }}>Your prccess</StyledLabel>
      <StyledProcessBars>
        {actions.map((action: any, i: number) => (
          <ProcessBar size={4} value={i < completed ? 100 : 0} noBorder={true} key={action.id} />
        ))}
      </StyledProcessBars>
      <StyledButton
        disabled={!completed || loading}
        onClick={() => {
          handleClaim(id);
        }}
      >
        {loading && <Loading mr="5px" />}
        <span>Claim</span>
        <StyledCoin $size={20} />
        <span>{rewards} PTS</span>
      </StyledButton>
    </StyledContainer>
  );
};

export default memo(Actions);
