import QuestLeaderboardView from '@/views/QuestLeaderboard';

import { useDefaultLayout } from '@/hooks/useLayout';

import type { NextPageWithLayout } from '@/utils/types';

const QuestLeaderboardPage: NextPageWithLayout = () => {
  return <QuestLeaderboardView />;
};

QuestLeaderboardPage.getLayout = useDefaultLayout;

export default QuestLeaderboardPage;
