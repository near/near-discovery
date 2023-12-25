import { memo, useMemo } from 'react';

import Loading from '@/components/Icons/Loading';

import useRewardsClaim from '../../hooks/useRewardsClaim';
import InviteCode from './InviteCode';
import {
  JoinedAccount,
  JoinedAccounts,
  StyledButton,
  StyledPanel,
  StyledPanelContent,
  StyledPanelFriends,
  StyledPanelFriendsTitle,
  StyledPanelHeader,
} from './styles';

const InviteCodePanel = ({ onInviteCodeClick, total, totalRewards, list }: any) => {
  const { loading, handleClaim } = useRewardsClaim();
  const activeList = useMemo(() => list.filter((item: any) => item.status === 'Active'), [list]);
  const pendingList = useMemo(() => list.filter((item: any) => item.status === 'Pending'), [list]);
  return (
    <StyledPanel>
      <StyledPanelHeader>
        <div>
          Invited <span className="num">{total}</span> friends
        </div>
        <StyledButton
          disabled={loading || totalRewards === 0}
          onClick={() => {
            handleClaim();
          }}
        >
          {loading && <Loading />}
          <span style={{ marginLeft: '4px' }}> Claim {totalRewards} PTS</span>
        </StyledButton>
      </StyledPanelHeader>
      <StyledPanelContent>
        <StyledPanelFriends>
          <div>
            <StyledPanelFriendsTitle>{activeList.length} active friends</StyledPanelFriendsTitle>
            <JoinedAccounts>
              {activeList.slice(0, 5).map((item: any) => (
                <JoinedAccount key={item.code} src={item.invited_user.avatar} />
              ))}
              {activeList.length > 6 && (
                <div className="more">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <rect width="30" height="30" rx="15" fill="#747474" />
                    <circle cx="21.5" cy="15.5" r="1.5" fill="#D9D9D9" />
                    <circle cx="15.5" cy="15.5" r="1.5" fill="#D9D9D9" />
                    <circle cx="9.5" cy="15.5" r="1.5" fill="#D9D9D9" />
                  </svg>
                </div>
              )}
            </JoinedAccounts>
          </div>
          <div>
            <StyledPanelFriendsTitle>{pendingList.length} pending friends</StyledPanelFriendsTitle>
            <JoinedAccounts>
              {pendingList.slice(0, 5).map((item: any) => (
                <JoinedAccount key={item.code} src={item.invited_user.avatar} />
              ))}
              {pendingList.length > 6 && (
                <div className="more">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <rect width="30" height="30" rx="15" fill="#747474" />
                    <circle cx="21.5" cy="15.5" r="1.5" fill="#D9D9D9" />
                    <circle cx="15.5" cy="15.5" r="1.5" fill="#D9D9D9" />
                    <circle cx="9.5" cy="15.5" r="1.5" fill="#D9D9D9" />
                  </svg>
                </div>
              )}
            </JoinedAccounts>
          </div>
        </StyledPanelFriends>
        <InviteCode onClick={onInviteCodeClick} />
      </StyledPanelContent>
    </StyledPanel>
  );
};

export default memo(InviteCodePanel);
