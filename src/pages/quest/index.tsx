import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import QuestView from '@/views/Quest';

const QuestPage: NextPageWithLayout = () => {
  return <QuestView/>;
};


QuestPage.getLayout = useDefaultLayout;

export default QuestPage;