import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const EcosystemOverviewPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.nearOrg.ecosystemOverviewPage}
      meta={{
        title: 'NEAR | Ecosystem Overview',
        description:
          'Projects building on NEAR are at the center. The Ecosystem is supporting them with everything they need to succeed.	DAOs: A new way to organize, fund, and empower communities · Explore DAOs, participate or get funding · NEARWEEK · Human Guild · TenK DAO.',
      }}
    />
  );
};

EcosystemOverviewPage.getLayout = useDefaultLayout;

export default EcosystemOverviewPage;
