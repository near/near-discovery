import { memo, useMemo, useState } from 'react';

import AccountSider from '@/components/AccountSider';
import { DesktopNavigationTop } from '@/components/navigation/desktop/DesktopNavigationTop';
import useCampaignList from '@/views/Quest/hooks/useCampaignList';
import useCategoryList from '@/views/Quest/hooks/useCategoryList';
import useQuestList from '@/views/Quest/hooks/useQuestList';
import Breadcrumb from '@/components/Breadcrumb';

import useUserInfo from '../../hooks/useUserInfo';
import Yours from '../Quest/components/Yours';
import Leaderboard from './components/Leaderboard';
import Quests from './components/Quests';
import Swiper from './components/Swiper';
import Tabs from './components/Tabs';
import useLeaderboard from './hooks/useLeaderboard';
import { StyledWrapper, StyledContainer } from './styles';
import type { Tab } from './types';

const QuestLeaderboardView = (props: any) => {
  const [tab, setTab] = useState<Tab>('quests');
  const [id, setId] = useState<string>();
  const [updater, setUpdater] = useState(1);
  const { loading, list, page, info, maxPage, handlePageChange, handleRefresh } = useLeaderboard();
  const { loading: userLoading, info: userInfo = {} } = useUserInfo({ id, from: 'leaderboard', updater });
  const { loading: campaignLoading, campaigns } = useCampaignList();
  const { loading: questingLoading, quests } = useQuestList(id);
  const { loading: categoryLoading, categories } = useCategoryList();
  const banners = useMemo(() => {
    if (!campaigns.length) return [];
    return campaigns
      .filter((campaign: any) => campaign.banner)
      .map((campaign) => ({ banner: campaign.banner, link: campaign.link }));
  }, [campaigns]);

  return (
    <StyledWrapper>
      <DesktopNavigationTop />
      <StyledContainer style={{ paddingTop: 30, paddingBottom: 19 }}>
        <Breadcrumb navs={[
          { name: 'Quest', path: '/quest/leaderboard' },
          { name: 'DapDap Web3 Adventure', path: '/quest/leaderboard/DapDapWeb3Adventure' },
        ]} />
      </StyledContainer>
      {tab === 'quests' && (
        <Quests
          id={id}
          {...{ campaignLoading, campaigns, questingLoading, quests, categoryLoading, categories, userInfo }}
          onLoad={(id: string) => {
            setId(id);
          }}
        />
      )}
      <AccountSider />
      <Yours info={userInfo} />
    </StyledWrapper>
  );
};

export default memo(QuestLeaderboardView);
