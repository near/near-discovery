import { memo, useState } from 'react';

import UserInfo from './components/UserInfo';
import DailyTask from './components/DailyTask';
import Tabs from './components/Tabs';
import InviteCode from './components/InviteCode';
import Quests from './components/Quests';
import Favorites from './components/Favorites';
import Pts from './components/Pts';
import InviteFirendsModal from './components/InviteFirendsModal';
import { StyledContainer, StyledTabsBox } from './styles';

import useInviteList from './hooks/useInviteList';

import type { Tab } from './types';

const QuestLeaderboardView = () => {
  const [tab, setTab] = useState<Tab>('quests');
  const [openCodes, setOpenCodes] = useState(false);
  const { loading, list, totalRewards, reward } = useInviteList();
  return (
    <>
      <StyledContainer>
        <UserInfo />
        <DailyTask />
        <StyledTabsBox>
          <Tabs
            current={tab}
            onChange={(_tab) => {
              setTab(_tab);
            }}
          />
          <InviteCode
            onClick={() => {
              if (list.length > 0) setOpenCodes(true);
            }}
            total={list.length}
          />
        </StyledTabsBox>
        {tab === 'quests' && <Quests />}
        {tab === 'favorites' && <Favorites />}
        {tab === 'pts' && <Pts />}
      </StyledContainer>
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

export default memo(QuestLeaderboardView);
