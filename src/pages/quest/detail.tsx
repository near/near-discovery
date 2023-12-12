import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import QuestDetailView from '@/views/QuestDetail';

const QuestDetailPage: NextPageWithLayout = () => {
  return <QuestDetailView />;
};

QuestDetailPage.getLayout = useDefaultLayout;

export default QuestDetailPage;
