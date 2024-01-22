import { useSimpleLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import QuestLeaderboardView from '@/views/QuestLeaderboard';

const QuestLeaderboardPage: NextPageWithLayout = () => {
  return <QuestLeaderboardView />;
};

QuestLeaderboardPage.getLayout = useSimpleLayout;

export default QuestLeaderboardView;
