import { useEffect } from 'react';

import { MetaTags } from '@/components/MetaTags';
import { NearOrgEcosystemCommunityPage } from '@/components/near-org/NearOrg.Ecosystem.CommunityPage';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useCurrentComponentStore } from '@/stores/current-component';
import type { NextPageWithLayout } from '@/utils/types';

const EcosystemCommunityPage: NextPageWithLayout = () => {
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);

  useEffect(() => {
    setComponentSrc(null);
  }, [setComponentSrc]);

  return (
    <>
      <MetaTags
        title="NEAR | Join the Community"
        description="The NEAR community is a globally distributed home to builders, founders, and contributors. Get started supporting the Blockchain Operating System and protocol’s ecosystem of applications and experiences."
      />
      <NearOrgEcosystemCommunityPage />
    </>
  );
};

EcosystemCommunityPage.getLayout = useDefaultLayout;

export default EcosystemCommunityPage;
