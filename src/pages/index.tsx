import { isPassKeyAvailable } from '@near-js/biometric-ed25519';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { openToast } from '@/components/lib/Toast';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { NotificationsAlert } from '@/components/NotificationsAlert';
import { useSidebarLayoutEnabled } from '@/components/sidebar-navigation/hooks';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useGatewayEvents } from '@/hooks/useGatewayEvents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import { useCurrentComponentStore } from '@/stores/current-component';
import { useTermsOfServiceStore } from '@/stores/terms-of-service';
import { localStorageAccountIdKey, privacyDomainName, termsDomainName } from '@/utils/config';
import type { NextPageWithLayout } from '@/utils/types';

const HomePage: NextPageWithLayout = () => {
  const router = useRouter();
  const [signedInOptimistic, setSignedInOptimistic] = useState(false);
  const signedIn = useAuthStore((store) => store.signedIn);
  const components = useBosComponents();
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);
  const logOut = useAuthStore((store) => store.logOut);
  const setTosData = useTermsOfServiceStore((store) => store.setTosData);
  const { sidebarLayoutEnabled } = useSidebarLayoutEnabled();
  const { emitGatewayEvent } = useGatewayEvents();

  useEffect(() => {
    const optimisticAccountId = window.localStorage.getItem(localStorageAccountIdKey);
    setSignedInOptimistic(!!optimisticAccountId);
  }, []);

  useEffect(() => {
    if (!signedIn) {
      setComponentSrc(null);
    }
  }, [signedIn, setComponentSrc]);

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

  return (
    <>
      {(signedIn || signedInOptimistic) && <NotificationsAlert />}

      <ComponentWrapperPage
        src={components.wrapper}
        componentProps={{
          emitGatewayEvent,
          logOut,
          targetProps: router.query,
          targetComponent: sidebarLayoutEnabled ? components.gateway.homePage : components.default,
          termsDomainName,
          privacyDomainName,
          recordToC: setTosData,
        }}
      />
    </>
  );
};

HomePage.getLayout = useDefaultLayout;

export default HomePage;
