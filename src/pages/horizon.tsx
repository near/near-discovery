import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const HorizonPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.horizon.homePage}
      meta={{ title: 'Horizon', description: 'Discover NEAR Horizon' }}
    />
  );
};

HorizonPage.getLayout = useDefaultLayout;

export default HorizonPage;
