import QuestDetailView from '@/views/QuestDetail';

import { useDefaultLayout } from '@/hooks/useLayout';

import type { NextPageWithLayout } from '@/utils/types';

const QuestDetailPage: NextPageWithLayout = () => {
  return <QuestDetailView />;
};

QuestDetailPage.getLayout = useDefaultLayout;

export default QuestDetailPage;
