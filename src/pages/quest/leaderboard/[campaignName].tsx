import { useSimpleLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import QuestLeaderboardView from '@/views/QuestLeaderboard';
import BnsCompaignView from '@/views/bns/compaign'
import { useRouter } from 'next/router';

const BnsLeaderboardPage: NextPageWithLayout = () => {
  const router = useRouter()
  const campaignName = router.query.campaignName
  return (
    campaignName === 'DapDapXBNS' ? <BnsCompaignView /> : <QuestLeaderboardView />
  )
};

BnsLeaderboardPage.getLayout = useSimpleLayout;

export default BnsLeaderboardPage;
