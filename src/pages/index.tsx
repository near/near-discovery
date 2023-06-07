import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { MainLoader } from '@/components/MainLoader';
import { MetaTags } from '@/components/MetaTags';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { NearOrgHomePage } from '@/components/near-org/NearOrg.HomePage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { selectIsSignedIn, selectShowContent } from '@/redux/slices/account';
import { useCurrentComponentStore } from '@/stores/current-component';
import type { NextPageWithLayout } from '@/utils/types';

const HomePage: NextPageWithLayout = () => {
  const signedIn = useSelector(selectIsSignedIn);
  const showContent = useSelector(selectShowContent);
  const components = useBosComponents();
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);

  useEffect(() => {
    if (!signedIn) {
      setComponentSrc(null);
    }
  }, [signedIn, setComponentSrc]);

  if (!showContent) {
    return <MainLoader />;
  }

  if (!signedIn) {
    return (
      <>
        <MetaTags
          title={`NEAR | The OS for an Open Web`}
          description={`"NEAR isn’t just a Layer 1 blockchain — it’s the Blockchain Operating System for an  Open Web. Create and discover decentralized apps, and help build the future of the web, today."`}
        />
        <NearOrgHomePage />
      </>
    );
  }

  return <ComponentWrapperPage src={components.default} />;
};

HomePage.getLayout = useDefaultLayout;

export default HomePage;
