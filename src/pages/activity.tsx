import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ActivityPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.activityPage}
      meta={{ title: 'NEAR | Activity', description: 'Follow activity within the NEAR community.' }}
    />
  );
};

ActivityPage.getLayout = useDefaultLayout;

export default ActivityPage;
