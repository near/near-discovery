import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const GatewaysPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.bosDirectory}
      meta={{ title: 'BOS Viewer Directory', description: 'NEAR BOS Directory' }}
    />
  );
};

GatewaysPage.getLayout = useDefaultLayout;

export default GatewaysPage;
