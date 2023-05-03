import { MetaTags } from '@/components/MetaTags';
import { NearOrgEcosystemWorkAndEarnPage } from '@/components/near-org/NearOrg.Ecosystem.WorkAndEarnPage';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const EcosystemGetFundingPage: NextPageWithLayout = () => {
  return (
    <>
      <MetaTags
        title="NEAR | Work and Earn"
        description="Work and Earn across the NEAR ecosystem. Find a job, get a grant for your project, and earn bounties."
      />
      <NearOrgEcosystemWorkAndEarnPage />
    </>
  );
};

EcosystemGetFundingPage.getLayout = useDefaultLayout;

export default EcosystemGetFundingPage;
