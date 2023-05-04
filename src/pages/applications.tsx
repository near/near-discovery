import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useWidgets } from '@/hooks/useWidgets';
import type { NextPageWithLayout } from '@/utils/types';

const ApplicationsPage: NextPageWithLayout = () => {
  const widgets = useWidgets();

  return (
    <ComponentWrapperPage
      src={widgets.componentsPage}
      componentProps={{
        tab: 'apps',
      }}
      meta={{ title: 'Applications built on the BOS', description: 'BOS Applications' }}
    />
  );
};

ApplicationsPage.getLayout = useDefaultLayout;

export default ApplicationsPage;
