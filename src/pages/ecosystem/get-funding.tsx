import { MetaTags } from '@/components/MetaTags';
import { NearOrgEcosystemGetFundingPage } from '@/components/near-org/NearOrg.Ecosystem.GetFundingPage';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const EcosystemGetFundingPage: NextPageWithLayout = () => {
  return (
    <>
      <MetaTags
        title="NEAR | Get Funding"
        description="Get funded while building on the Blockchain Operating System for an Open Web. The NEAR ecosystem offers multiple funding options to support initiatives aimed at decentralizing, growing, and innovating on NEAR."
      />
      <NearOrgEcosystemGetFundingPage />
    </>
  );
};

EcosystemGetFundingPage.getLayout = useDefaultLayout;

export default EcosystemGetFundingPage;
