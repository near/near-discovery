import { useRouter } from 'next/router';
import { memo, useEffect, useState, useRef } from 'react';
import useReport from '@/views/Landing/hooks/useReport';
import { useDebounceFn } from 'ahooks';
import useAccount from '@/hooks/useAccount';
import useUserInfo from '@/hooks/useUserInfo';
import useUserReward from '@/hooks/useUserReward';
import DailyTask from './components/DailyTask';
import Favorites from './components/Favorites';
import InviteCodePanel from './components/InviteCode';
import InviteFirendsModal from './components/InviteFirendsModal';
import Pts from './components/Pts';
import Quests from './components/Quests';
import Tabs from './components/Tabs';
import UserInfo from './components/UserInfo';
import useInviteList from './hooks/useInviteList';
import { StyledBgImg, StyledContainer, StyledPanelWrapper, StyledTabsBox } from './styles';
import type { Tab } from './types';

const QuestProfileView = () => {
  const router = useRouter();
  let initTab: Tab;
  if (router?.query?.active === 'pts') {
    initTab = 'pts';
  } else {
    initTab = 'quests';
  }
  const { account } = useAccount();
  const [tab, setTab] = useState<Tab>(initTab);
  const [updater, setUpdater] = useState(1);
  const [openCodes, setOpenCodes] = useState(false);
  const { list, totalRewards, reward } = useInviteList();
  const { userInfo } = useUserInfo();
  const { info: rewardInfo, getUserReward } = useUserReward();
  const isMounted = useRef(false);

  const { handleReport } = useReport();

  const { run } = useDebounceFn(
    () => {
      if (!account) {
        router.push('/');
      }
    },
    { wait: 500 },
  );

  useEffect(() => {
    if (isMounted.current) run();
  }, [account]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  useEffect(() => {
    if (updater !== 1) getUserReward();
  }, [updater]);

  return (
    <>
      <StyledContainer>
        <StyledPanelWrapper>
          <UserInfo info={userInfo} rewardInfo={rewardInfo} />
          <InviteCodePanel
            onInviteCodeClick={() => {
              handleReport('invite');
              setOpenCodes(true);
            }}
            total={list.length}
            totalRewards={totalRewards}
            list={list}
          />
          <DailyTask
            onSuccess={() => {
              getUserReward();
              setUpdater(Date.now());
            }}
            key={updater}
          />
        </StyledPanelWrapper>
        <StyledTabsBox>
          <Tabs
            current={tab}
            onChange={(_tab) => {
              setTab(_tab);
            }}
          />
        </StyledTabsBox>
        {tab === 'quests' && <Quests key={updater} />}
        {tab === 'favorites' && <Favorites key={updater} />}
        {tab === 'pts' && <Pts key={updater} />}
      </StyledContainer>
      <StyledBgImg />
      <InviteFirendsModal
        open={openCodes}
        list={list}
        totalRewards={totalRewards}
        reward={reward}
        onClose={() => {
          setOpenCodes(false);
        }}
      />
    </>
  );
};

export default memo(QuestProfileView);
