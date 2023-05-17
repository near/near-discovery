import { useEffect } from 'react';

import { MetaTags } from '@/components/MetaTags';
import { NearOrgEcosystemOverviewPage } from '@/components/near-org/NearOrg.Ecosystem.OverviewPage';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useCurrentComponentStore } from '@/stores/current-component';
import type { NextPageWithLayout } from '@/utils/types';

const EcosystemOverviewPage: NextPageWithLayout = () => {
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);

  useEffect(() => {
    setComponentSrc(null);
  }, [setComponentSrc]);

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
