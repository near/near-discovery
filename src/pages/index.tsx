import { isPassKeyAvailable } from '@near-js/biometric-ed25519';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { openToast } from '@/components/lib/Toast';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { NotificationsAlert } from '@/components/NotificationsAlert';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import { useCurrentComponentStore } from '@/stores/current-component';
import type { NextPageWithLayout, TosData } from '@/utils/types';

const LS_ACCOUNT_ID = 'near-social-vm:v01::accountId:';

const HomePage: NextPageWithLayout = () => {
  const router = useRouter();
  const [signedInOptimistic, setSignedInOptimistic] = useState(false);
  const signedIn = useAuthStore((store) => store.signedIn);
  const components = useBosComponents();
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);
  const authStore = useAuthStore();
  const [componentProps, setComponentProps] = useState<Record<string, unknown>>({});
  const [tosData, setTosData] = useState<TosData | null>(null);
  const cachedTosData = useMemo(() => tosData, [tosData?.latestTosVersion]);

  useEffect(() => {
    const optimisticAccountId = window.localStorage.getItem(LS_ACCOUNT_ID);
    setSignedInOptimistic(!!optimisticAccountId);
  }, []);

  useEffect(() => {
    if (!signedIn) {
      setComponentSrc(null);
    }
  }, [signedIn, setComponentSrc]);

  useEffect(() => {
    // If we are loading the ActivityPage, process the query params into componentProps
    if (signedIn || signedInOptimistic) {
      setComponentProps(router.query);
    }
  }, [router.query, signedIn, signedInOptimistic]);

  useEffect(() => {
    if (signedIn) {
      isPassKeyAvailable().then((passKeyAvailable: boolean) => {
        if (!passKeyAvailable) {
          openToast({
            title: 'Limited Functionality',
            type: 'WARNING',
            description: 'To access all account features, try using a browser that supports passkeys',
            duration: 5000,
          });
        }
      });
    }
  }, [signedIn]);

  if (signedIn || signedInOptimistic) {
    return (
      <>
        <NotificationsAlert tosData={cachedTosData} />

        <ComponentWrapperPage
          src={components.tosCheck}
          componentProps={{
            logOut: authStore.logOut,
            targetProps: componentProps,
            targetComponent: components.default,
            tosName: components.tosContent,
            recordToC: setTosData,
          }}
        />
      </>
    );
  }

  return (
    <ComponentWrapperPage
      src={components.nearOrg.homePage}
      meta={{
        title: `NEAR | The OS for an Open Web`,
        description: `"NEAR isn’t just a Layer 1 blockchain — it’s the Blockchain Operating System for an  Open Web. Create and discover decentralized apps, and help build the future of the web, today."`,
      }}
    />
  );
};

HomePage.getLayout = useDefaultLayout;

export default HomePage;
