import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import BnsLeaderboardView from '@/views/bns/leaderboard';

const BnsLeaderboardPage: NextPageWithLayout = () => {
  return <BnsLeaderboardView />;
};

BnsLeaderboardPage.getLayout = useDefaultLayout;

export default BnsLeaderboardPage;
