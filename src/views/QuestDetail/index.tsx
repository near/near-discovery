import { useSearchParams } from 'next/navigation';
import { memo, useState } from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import Spinner from '@/components/Spinner';
import useUserInfo from '@/hooks/useUserInfo';
import useCategoryList from '@/views/Quest/hooks/useCategoryList';

import Yours from '../Quest/components/Yours';
import Actions from './components/Actions';
import Details from './components/Details';
import Recommends from './components/Recommends';
import useQuestInfo from './hooks/useQuestInfo';
import { StyledContainer, StyledTopBox } from './styles';

const QuestDetailView = () => {
  const searchParams = useSearchParams();
  const _id = searchParams.get('id');
  const id = _id?.includes('?') ? _id.split('?')[0] : _id;
  const { loading, info } = useQuestInfo(id || '');
  const [updater, setUpdater] = useState(1);
  const { loading: categoryLoading, categories } = useCategoryList();
  const { info: userInfo = {} } = useUserInfo({ updater });

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
              <Details quest={info.quest} category={categories[info.quest?.quest_category_id]} />
              <Actions
                actions={info.actions}
                endTime={info.quest.end_time}
                startTime={info.quest.start_time}
                rewards={info.quest.reward}
                completed={info.quest.action_completed}
                id={id || ''}
                userInfo={userInfo}
                isLive={info.quest.status === 'ongoing'}
                claimed={info.quest.is_claimed}
                onSuccess={() => {
                  setUpdater(Date.now());
                }}
              />
            </StyledTopBox>
            <Recommends campaignId={info.quest.quest_campaign_id} />
          </>
        )
      )}
      <Yours info={userInfo} />
    </StyledContainer>
  );
};

export default memo(QuestDetailView);
