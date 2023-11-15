import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const PeoplePage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.peoplePage}
      meta={{ title: 'Connect with the NEAR community.', description: 'Become part of the NEAR community.' }}
    />
  );
};

PeoplePage.getLayout = useDefaultLayout;

export default PeoplePage;
