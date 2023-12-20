import { useSearchParams } from 'next/navigation';
import { memo } from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import Spinner from '@/components/Spinner';
import useCategoryList from '@/views/Quest/hooks/useCategoryList';

import Yours from '../Quest/components/Yours';
import Actions from './components/Actions';
import Details from './components/Details';
import Recommends from './components/Recommends';
import useQuestInfo from './hooks/useQuestInfo';
import { StyledContainer, StyledTopBox } from './styles';

const QuestDetailView = () => {
  const searchParams = useSearchParams();
  const { loading, info } = useQuestInfo(searchParams.get('id') || '');
  const { loading: categoryLoading, categories } = useCategoryList();
  return (
    <StyledContainer>
      <Breadcrumb
        navs={[
          { name: 'Quest Campaign', path: '/quest/leaderboard' },
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
