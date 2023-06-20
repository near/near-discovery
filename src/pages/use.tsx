import { MetaTags } from '@/components/MetaTags';
import { NearOrgUsePage } from '@/components/near-org/NearOrg.UsePage';
import { useClearCurrentComponent } from '@/hooks/useClearCurrentComponent';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const UsePage: NextPageWithLayout = () => {
  useClearCurrentComponent();

  return (
    <>
      <MetaTags
        title="NEAR | Get Started"
        description="Set up your NEAR account and start exploring apps built on the Blockchain Operating System and NEAR Protocol."
      />
      <NearOrgUsePage />
    </>
  );
};

UsePage.getLayout = useDefaultLayout;

export default UsePage;
