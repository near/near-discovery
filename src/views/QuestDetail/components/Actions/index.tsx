import { memo, useMemo, useState } from 'react';

import Loading from '@/components/Icons/Loading';
import useRewardsClaim from '@/hooks/useRewardsClaim';
import ProcessBar from '@/views/Quest/components/ProcessBar';
import Timer from '@/views/Quest/components/Timer';
import useAuthConfig from '@/views/QuestProfile/hooks/useAuthConfig';

import ActionItem from './Item';
import {
  StyledButton,
  StyledCoin,
  StyledContainer,
  StyledHeader,
  StyledLabel,
  StyledProcessBars,
  StyledTimerBox,
} from './styles';

const Actions = ({
  actions,
  endTime,
  startTime,
  rewards,
  completed,
  id,
  userInfo,
  isLive,
}: {
  actions: any;
  startTime: number;
  endTime: number;
  rewards: number;
  completed: number;
  id: string;
  userInfo: any;
  isLive: boolean;
}) => {
  const { loading, handleClaim } = useRewardsClaim(() => {});
  const [cbCompleted, setCbCompleted] = useState(0);
  const completedCount = useMemo(() => completed + cbCompleted, [completed, cbCompleted]);
  const config = useAuthConfig();
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledLabel>Actions</StyledLabel>
        <StyledTimerBox>
          {startTime > Date.now() && <div>Upcoming</div>}
          {startTime > Date.now() ? <Timer endTime={Number(startTime)} /> : <Timer endTime={Number(endTime)} />}{' '}
        </StyledTimerBox>
      </StyledHeader>
      {actions.map((action: any, i: number) => (
        <ActionItem
          key={action.id}
          action={action}
          completed={action.status === 'completed'}
          userInfo={userInfo}
          onSuccess={() => {
            setCbCompleted((prev) => prev + 1);
          }}
          config={config}
          isLive={isLive}
        />
      ))}
      <StyledLabel style={{ marginTop: '30px' }}>Your prccess</StyledLabel>
      <StyledProcessBars>
        {actions.map((action: any, i: number) => (
          <ProcessBar size={4} value={i < completedCount ? 100 : 0} noBorder={true} key={action.id} />
        ))}
      </StyledProcessBars>
      <StyledButton
        disabled={completedCount < actions.length || loading}
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
