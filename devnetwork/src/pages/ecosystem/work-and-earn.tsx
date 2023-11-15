import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const EcosystemWorkAndEarnPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.nearOrg.ecosystemWorkAndEarnPage}
      meta={{
        title: 'NEAR | Work and Earn',
        description:
          'Work and Earn across the NEAR ecosystem. Find a job, get a grant for your project, and earn bounties.',
      }}
    />
  );
};

EcosystemWorkAndEarnPage.getLayout = useDefaultLayout;

export default EcosystemWorkAndEarnPage;
