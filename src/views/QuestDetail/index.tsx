import Breadcrumb from '@/components/Breadcrumb';
import Spinner from '@/components/Spinner';
import Yours from '../Quest/components/Yours';
import Details from './components/Details';
import Actions from './components/Actions';
import Recommends from './components/Recommends';

import { StyledContainer, StyledTopBox } from './styles';

import { memo } from 'react';
import { useSearchParams } from 'next/navigation';
import useCategoryList from '@/views/Quest/hooks/useCategoryList';
import useQuestInfo from './hooks/useQuestInfo';

const QuestDetailView = () => {
  const searchParams = useSearchParams();
  const { loading, info } = useQuestInfo(searchParams.get('id') || '');
  const { loading: categoryLoading, categories } = useCategoryList();
  return (
    <StyledContainer>
      <Breadcrumb
        navs={[
          { name: 'Quest Campaign', path: '/quest' },
          { name: 'Quest detail', path: '/quest/detail' },
        ]}
      />
      {loading || categoryLoading ? (
        <Spinner />
      ) : (
        info && (
          <>
            <StyledTopBox>
              <Details quest={info.quest} category={categories[info.quest.quest_category_id]} />
              <Actions
                actions={info.actions}
                endTime={info.quest.end_time}
                rewards={info.quest.reward}
                completed={info.quest.action_completed}
                id={searchParams.get('id') || ''}
              />
            </StyledTopBox>
            <Recommends campaignId={info.quest.quest_campaign_id} />
          </>
        )
      )}
      <Yours />
    </StyledContainer>
  );
};

export default memo(QuestDetailView);
