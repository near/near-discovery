import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const EcosystemCommunityPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.nearOrg.ecosystemCommunityPage}
      meta={{
        title: 'NEAR | Join the Community',
        description:
          'he NEAR community is a globally distributed home to builders, founders, and contributors. Get started supporting the Blockchain Operating System and protocol’s ecosystem of applications and experiences.',
      }}
    />
  );
};

EcosystemCommunityPage.getLayout = useDefaultLayout;

export default EcosystemCommunityPage;
