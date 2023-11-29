import UserInfo from './components/UserInfo';
import DailyTask from './components/DailyTask';
import Tabs from './components/Tabs';
import InviteCode from './components/InviteCode';
import Quests from './components/Quests';
import Favorites from './components/Favorites';
import Pts from './components/Pts';
import InviteFirendsModal from './components/InviteFirendsModal';
import { StyledContainer, StyledTabsBox } from './styles';

import { memo, useState } from 'react';

import type { Tab } from './types';

const QuestLeaderboardView = () => {
  const [tab, setTab] = useState<Tab>('pts');
  const [openCodes, setOpenCodes] = useState(false);
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
              setOpenCodes(true);
            }}
          />
        </StyledTabsBox>
        {tab === 'quests' && <Quests />}
        {tab === 'favorites' && <Favorites />}
        {tab === 'pts' && <Pts />}
      </StyledContainer>
      <InviteFirendsModal
        open={openCodes}
        onClose={() => {
          setOpenCodes(false);
        }}
      />
    </>
  );
};

export default memo(QuestLeaderboardView);
