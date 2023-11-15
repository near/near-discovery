import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ComponentsPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.componentsPage}
      componentProps={{
        tab: 'all',
      }}
      meta={{ title: 'Components built on the BOS', description: 'BOS Components' }}
    />
  );
};

ComponentsPage.getLayout = useDefaultLayout;

export default ComponentsPage;
