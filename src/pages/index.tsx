import { MetaTags } from '@/components/MetaTags';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { NearOrgHomePage } from '@/components/near-org/NearOrg.HomePage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import type { NextPageWithLayout } from '@/utils/types';

const HomePage: NextPageWithLayout = () => {
  const signedIn = useAuthStore((store) => store.signedIn);
  const components = useBosComponents();

  if (signedIn) {
    return <ComponentWrapperPage src={components.default} />;
  }

  return (
    <>
      <MetaTags
        title={`NEAR | The OS for an Open Web`}
        description={`"NEAR isn’t just a Layer 1 blockchain — it’s the Blockchain Operating System for an  Open Web. Create and discover decentralized apps, and help build the future of the web, today."`}
      />
      <NearOrgHomePage />
    </>
  );
};

HomePage.getLayout = useDefaultLayout;

export default HomePage;
