import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useWidgets } from '@/hooks/useWidgets';
import type { NextPageWithLayout } from '@/utils/types';

const HorizonPage: NextPageWithLayout = () => {
  const widgets = useWidgets();

  return (
    <ComponentWrapperPage
      src={widgets.horizon.homePage}
      meta={{ title: 'Horizon', description: 'Discover NEAR Horizon' }}
    />
  );
};

HorizonPage.getLayout = useDefaultLayout;

export default HorizonPage;
