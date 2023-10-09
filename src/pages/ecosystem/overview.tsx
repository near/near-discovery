import { MetaTags } from '@/components/MetaTags';
import { NearOrgEcosystemOverviewPage } from '@/components/near-org/NearOrg.Ecosystem.OverviewPage';
import { useClearCurrentComponent } from '@/hooks/useClearCurrentComponent';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const EcosystemOverviewPage: NextPageWithLayout = () => {
  useClearCurrentComponent();

  return (
    <>
      <MetaTags
        title="Near Protocol Ecosystem"
        description="Projects building on NEAR are at the center. The Ecosystem is supporting them with everything they need to succeed.	DAOs: A new way to organize, fund, and empower communities · Explore DAOs, participate or get funding · NEARWEEK · Human Guild · TenK DAO."
      />
      <NearOrgEcosystemOverviewPage />
    </>
  );
};

EcosystemOverviewPage.getLayout = useDefaultLayout;

export default EcosystemOverviewPage;
