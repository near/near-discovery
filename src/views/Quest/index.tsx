import { memo, useState } from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import useUserInfo from '@/views/QuestLeaderboard/hooks/useUserInfo';

import Campaign from './components/Campaign';
import QuestLists from './components/QuestLists';
import Yours from './components/Yours';
import useCampaignList from './hooks/useCampaignList';
import useCategoryList from './hooks/useCategoryList';
import useQuestList from './hooks/useQuestList';
import { StyledContainer } from './styles';

const QuestView = () => {
  const [id, setId] = useState<string>();
  const { loading, campaigns } = useCampaignList();
  const { info: userInfo = {} } = useUserInfo({ updater: 1 });
  const { loading: questingLoading, quests } = useQuestList(id);
  const { loading: categoryLoading, categories } = useCategoryList();
  return (
    <StyledContainer>
      <Breadcrumb navs={[{ name: 'Quest Campaign', path: '/quest' }]} />
      <Campaign
        onLoad={(campainId: string) => {
          setId(campainId);
        }}
        loading={loading}
        campaigns={campaigns}
        categoryLoading={categoryLoading}
        categories={categories}
      />
      <QuestLists id={id} loading={questingLoading} quests={quests} />
      <Yours info={userInfo} />
    </StyledContainer>
  );
};

export default memo(QuestView);
