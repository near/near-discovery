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
  StyledAward
} from './styles';
import useUserInfo from '@/hooks/useUserInfo';

const Actions = ({
  actions,
  endTime,
  startTime,
  rewards,
  completed,
  id,
  userInfo,
  isLive,
  isBitGetUser,
  claimed,
  onSuccess,
  onClaimed,
}: {
  actions: any;
  startTime: number;
  endTime: number;
  rewards: number;
  completed: number;
  id: string;
  userInfo: any;
  isLive: boolean;
  isBitGetUser: boolean;
  claimed: boolean;
  onSuccess: VoidFunction;
  onClaimed: VoidFunction;
  
}) => {
  const [claimedSuccess, setClaimedSuccess] = useState(false);
  const { loading, handleClaim } = useRewardsClaim(() => {
    setClaimedSuccess(true);
    onClaimed();
  });
  const [cbCompleted, setCbCompleted] = useState(0);
  const completedCount = useMemo(() => completed + cbCompleted, [completed, cbCompleted]);
  const config = useAuthConfig();
  // const isBitGetUser = useMemo(() => (userInfo.source === 'bitget' || userInfo.source === 'bitget_wallet'), [userInfo])
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
          onSuccess={(type) => {
            if (type !== 1) setCbCompleted((prev) => prev + 1);
            onSuccess();
          }}
          config={config}
          isLive={isLive}
          id={id}
          bp="1001511-001"
        />
      ))}
      <StyledLabel style={{ marginTop: '30px' }}>Your prccess</StyledLabel>
      <StyledProcessBars>
        {actions.map((action: any, i: number) => (
          <ProcessBar size={4} value={i < completedCount ? 100 : 0} noBorder={true} key={action.id} />
        ))}
      </StyledProcessBars>
      <StyledButton
        disabled={completedCount < actions.length || loading || claimed || claimedSuccess}
        onClick={() => {
          handleClaim(id);
        }}
        data-bp="1001511-002"
      >
        {loading && <Loading mr="5px" />}
        <span>Claim</span>
        <StyledCoin $size={20} />
        <span>{rewards} PTS</span>
      </StyledButton>
      {isBitGetUser && <StyledAward>💡 You will get an extra 10% - <span>20 PTS</span> as a Bitget user.</StyledAward>}
    </StyledContainer>
  );
};

export default memo(Actions);
