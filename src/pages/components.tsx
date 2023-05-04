import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useWidgets } from '@/hooks/useWidgets';
import type { NextPageWithLayout } from '@/utils/types';

const ComponentsPage: NextPageWithLayout = () => {
  const widgets = useWidgets();

  return (
    <ComponentWrapperPage
      src={widgets.componentsPage}
      componentProps={{
        tab: 'all',
      }}
      meta={{ title: 'Components built on the BOS', description: 'BOS Components' }}
    />
  );
};

ComponentsPage.getLayout = useDefaultLayout;

export default ComponentsPage;
