import { useSearchParams } from 'next/navigation';
import { memo, useEffect, useState, useMemo } from 'react';
import { useConnectWallet } from '@web3-onboard/react';
import Breadcrumb from '@/components/Breadcrumb';
import Spinner from '@/components/Spinner';
import useUserInfo from '@/hooks/useUserInfo';
import useCategoryList from '@/views/Quest/hooks/useCategoryList';
import useReport from '@/views/Landing/hooks/useReport';
import ClaimedSuccessModal from './components/ClaimedSuccessModal';
import Yours from '../Quest/components/Yours';
import useCampaignList from '../Quest/hooks/useCampaignList';
import Actions from './components/Actions';
import Details from './components/Details';
import Recommends from './components/Recommends';
import useQuestInfo from './hooks/useQuestInfo';
import useRecommendList from './hooks/useRecommendList';
import { StyledContainer, StyledTopBox } from './styles';

const MAX = 100;

const QuestDetailView = () => {
  const searchParams = useSearchParams();
  const [{ wallet, connecting }] = useConnectWallet();
  const { handleReport } = useReport();
  const _id = searchParams.get('id');
  const id = _id?.includes('?') ? _id.split('?')[0] : _id;
  const { loading, info } = useQuestInfo(id || '');
  const [updater, setUpdater] = useState(1);
  const { loading: categoryLoading, categories } = useCategoryList();
  const { loading: campaignLoading, campaigns } = useCampaignList();
  const { info: userInfo = {} } = useUserInfo({ updater });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { recommends, handlePageChange, page, maxPage } = useRecommendList(info?.quest.quest_campaign_id, MAX, id);

  const quest = info?.quest ?? null;

  const navs = useMemo(() => {
    if (quest && campaigns.length > 0) {
      const campaign = campaigns.find((campaign) => campaign.id === quest.quest_campaign_id);
      const array = [];
      array[0] = { name: 'Quest Campaign', path: '/quest/leaderboard' };
      // array[1] =
      //   campaign.name.replace(/\s/g, '') === 'DapDapXBNS'
      //     ? {
      //         name: 'DapDap X BNS',
      //         path: '/quest/leaderboard/DapDapXBNS',
      //       }
      //     : {
      //         name: 'DapDap Web3 Adventure',
      //         path: '/quest/leaderboard/DapDapWeb3Adventure',
      //       };
      array[1] = {
        name: campaign.name,
        path: '/quest/leaderboard/' + campaign.name.replace(/\s/g, ''),
      };
      array[2] = { name: 'Detail', path: '/quest/detail' };
      return array;
    }
  }, [quest, campaigns]);

  const isBitGetUser = useMemo(() => userInfo.source === 'bitget' || userInfo.source === 'bitget_wallet', [userInfo]);
  useEffect(() => {
    if (wallet?.label.toLowerCase().includes('bitget')) {
      handleReport('bitget_wallet');
    }
  }, []);

  return (
    <StyledContainer>
      <Breadcrumb navs={navs || []} />
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
                rewards={info.quest.reward + (isBitGetUser ? info.quest.reward * 0.1 : 0)}
                completed={info.quest.action_completed}
                id={id || ''}
                userInfo={userInfo}
                isLive={info.quest.status === 'ongoing'}
                isBitGetUser={isBitGetUser}
                claimed={info.quest.is_claimed}
                onSuccess={() => {
                  setUpdater(Date.now());
                }}
                onClaimed={() => {
                  setShowSuccessModal(true);
                }}
              />
            </StyledTopBox>
            <Recommends recommends={recommends} />
            <ClaimedSuccessModal
              open={showSuccessModal}
              reward={info.quest.reward}
              onClose={() => {
                setShowSuccessModal(false);
              }}
              recommends={recommends}
            />
          </>
        )
      )}
      <Yours info={userInfo} />
    </StyledContainer>
  );
};

export default memo(QuestDetailView);
