import { memo, useMemo, useState } from 'react';

import useCampaignList from '@/views/Quest/hooks/useCampaignList';
import useCategoryList from '@/views/Quest/hooks/useCategoryList';
import useQuestList from '@/views/Quest/hooks/useQuestList';

import Yours from '../Quest/components/Yours';
import Leaderboard from './components/Leaderboard';
import Quests from './components/Quests';
import Swiper from './components/Swiper';
import Tabs from './components/Tabs';
import useLeaderboard from './hooks/useLeaderboard';
import useUserInfo from './hooks/useUserInfo';
import { StyledContainer } from './styles';
import type { Tab } from './types';

const QuestLeaderboardView = () => {
  const [tab, setTab] = useState<Tab>('quests');
  const [id, setId] = useState<string>();
  const { loading, list, page, info, maxPage, handlePageChange } = useLeaderboard();
  const { loading: userLoading, info: userInfo = {} } = useUserInfo({});
  const { loading: campaignLoading, campaigns } = useCampaignList();
  const { loading: questingLoading, quests } = useQuestList(id);
  const { loading: categoryLoading, categories } = useCategoryList();
  const banners = useMemo(() => {
    if (!campaigns.length) return [];
    return campaigns
      .filter((campaign: any) => campaign.banner)
      .map((campaign) => ({ banner: campaign.banner, link: campaign.link }));
  }, [campaigns]);
  console.log('campaigns', campaigns);
  return (
    <StyledContainer>
      <Yours />
      {!!banners.length && <Swiper banners={banners} />}
      <Tabs
        current={tab}
        onChange={(_tab) => {
          setTab(_tab);
        }}
      />

      {tab === 'leaderboard' && (
        <Leaderboard id={id} {...{ loading, list, page, info, maxPage, handlePageChange, userLoading, userInfo }} />
      )}
      {tab === 'quests' && (
        <Quests
          id={id}
          {...{ campaignLoading, campaigns, questingLoading, quests, categoryLoading, categories }}
          onLoad={(id: string) => {
            setId(id);
          }}
        />
      )}
    </StyledContainer>
  );
};

export default memo(QuestLeaderboardView);
