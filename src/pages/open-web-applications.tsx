import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const OpenWebApplicationsPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.nearOrg.openWebApplicationsPage}
      meta={{
        title: 'NEAR | Open Web Applications',
        description:
          'Contribute to building a web where users own their data, voices count, and everyone can be fairly rewarded for their effort.',
      }}
    />
  );
};

OpenWebApplicationsPage.getLayout = useDefaultLayout;

export default OpenWebApplicationsPage;
