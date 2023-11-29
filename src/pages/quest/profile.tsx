import QuestProfileView from '@/views/QuestProfile';

import { useDefaultLayout } from '@/hooks/useLayout';

import type { NextPageWithLayout } from '@/utils/types';

const QuestProfilePage: NextPageWithLayout = () => {
  return <QuestProfileView />;
};

QuestProfilePage.getLayout = useDefaultLayout;

export default QuestProfilePage;
