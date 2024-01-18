import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import QuestLeaderboardView from '@/views/QuestLeaderboard';

const QuestLeaderboardPage: NextPageWithLayout = () => {
  return <QuestLeaderboardView />;
};

QuestLeaderboardPage.getLayout = useDefaultLayout;

export default QuestLeaderboardView;
