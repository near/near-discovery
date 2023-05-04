import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useWidgets } from '@/hooks/useWidgets';
import type { NextPageWithLayout } from '@/utils/types';

const GatewaysPage: NextPageWithLayout = () => {
  const widgets = useWidgets();

  return (
    <ComponentWrapperPage
      src={widgets.bosDirectory}
      meta={{ title: 'BOS Viewer Directory', description: 'NEAR BOS Directory' }}
    />
  );
};

GatewaysPage.getLayout = useDefaultLayout;

export default GatewaysPage;
