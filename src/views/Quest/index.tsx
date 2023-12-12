import { memo, useState } from 'react';

import Breadcrumb from '@/components/Breadcrumb';

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
      <Yours />
    </StyledContainer>
  );
};

export default memo(QuestView);
