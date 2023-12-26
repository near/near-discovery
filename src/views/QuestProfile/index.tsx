import { memo, useState } from 'react';

import useReport from '@/views/Landing/hooks/useReport';
import useUserInfo from '../../hooks/useUserInfo';
import DailyTask from './components/DailyTask';
import Favorites from './components/Favorites';
import InviteCodePanel from './components/InviteCode';
import InviteFirendsModal from './components/InviteFirendsModal';
import Pts from './components/Pts';
import Quests from './components/Quests';
import Tabs from './components/Tabs';
import UserInfo from './components/UserInfo';
import useInviteList from './hooks/useInviteList';
import { StyledContainer, StyledPanelWrapper, StyledTabsBox } from './styles';
import type { Tab } from './types';

const QuestProfileView = () => {
  const [tab, setTab] = useState<Tab>('quests');
  const [updater, setUpdater] = useState(Date.now());
  const [openCodes, setOpenCodes] = useState(false);
  const { list, totalRewards, reward } = useInviteList();
  const { info: userInfo = {} } = useUserInfo({ updater });

  const { handleReport } = useReport();

  return (
    <>
      <StyledContainer>
        <UserInfo
          info={userInfo}
          onSuccess={() => {
            setUpdater(Date.now());
          }}
        />
        <StyledPanelWrapper>
          <InviteCodePanel
            onInviteCodeClick={() => {
              handleReport('invite');
              if (list.length > 0) setOpenCodes(true);
            }}
            total={list.length}
            totalRewards={totalRewards}
            list={list}
          />
          <DailyTask
            onSuccess={() => {
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
