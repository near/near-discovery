import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import QuestProfileView from '@/views/QuestProfile';

const QuestProfilePage: NextPageWithLayout = () => {
  return <QuestProfileView />;
};

QuestProfilePage.getLayout = useDefaultLayout;

export default QuestProfilePage;
