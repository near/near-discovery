import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ApplicationsPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.componentsPage}
      componentProps={{
        tab: 'apps',
      }}
      meta={{ title: 'Applications built on the BOS', description: 'BOS Applications' }}
    />
  );
};

ApplicationsPage.getLayout = useDefaultLayout;

export default ApplicationsPage;
