import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const EcosystemPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.nearOrg.ecosystemPage}
      meta={{
        title: 'NEAR | Ecosystem',
        description: 'Explore a vibrant ecosystem that supports developers, founders, and contributors.',
      }}
    />
  );
};

EcosystemPage.getLayout = useDefaultLayout;

export default EcosystemPage;
