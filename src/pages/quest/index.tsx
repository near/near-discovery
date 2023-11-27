import QuestView from '@/views/Quest';

import { useDefaultLayout } from '@/hooks/useLayout';

import type { NextPageWithLayout } from '@/utils/types';

const QuestPage: NextPageWithLayout = () => {
  return <QuestView/>;
};


QuestPage.getLayout = useDefaultLayout;

export default QuestPage;