import { isPassKeyAvailable } from '@near-js/biometric-ed25519';
import { openToast } from '@near-pagoda/ui';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { NotificationsAlert } from '@/components/NotificationsAlert';
import { useSidebarLayoutEnabled } from '@/components/sidebar-navigation/hooks';
import { NearContext } from '@/components/WalletSelector';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useGatewayEvents } from '@/hooks/useGatewayEvents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useCurrentComponentStore } from '@/stores/current-component';
import { useTermsOfServiceStore } from '@/stores/terms-of-service';
import { localStorageAccountIdKey, privacyDomainName, termsDomainName } from '@/utils/config';
import { fetchLumaEvents } from '@/utils/events';
import type { NextPageWithLayout } from '@/utils/types';

const HomePage: NextPageWithLayout = () => {
  const router = useRouter();
  const [signedInOptimistic, setSignedInOptimistic] = useState(false);
  const { signedAccountId, wallet } = useContext(NearContext);
  const components = useBosComponents();
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);
  const setTosData = useTermsOfServiceStore((store) => store.setTosData);
  const { sidebarLayoutEnabled } = useSidebarLayoutEnabled();
  const { emitGatewayEvent } = useGatewayEvents();

  useEffect(() => {
    const optimisticAccountId = window.localStorage.getItem(localStorageAccountIdKey);
    setSignedInOptimistic(!!optimisticAccountId);
  }, []);

  useEffect(() => {
    if (!signedAccountId) {
      setComponentSrc(null);
    }
  }, [signedAccountId, setComponentSrc]);

  useEffect(() => {
    if (signedAccountId) {
      isPassKeyAvailable().then((passKeyAvailable: boolean) => {
        if (!passKeyAvailable) {
          openToast({
            title: 'Limited Functionality',
            type: 'error',
            description: 'To access all account features, try using a browser that supports passkeys',
            duration: 5000,
          });
        }
      });
    }
  }, [signedAccountId]);

  if (sidebarLayoutEnabled) {
    return (
      <>
        {(signedAccountId || signedInOptimistic) && <NotificationsAlert />}

        <ComponentWrapperPage
          src={components.wrapper}
          componentProps={{
            emitGatewayEvent,
            logOut: wallet?.signOut,
            targetProps: router.query,
            targetComponent: components.gateway.homePage,
            termsDomainName,
            privacyDomainName,
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
        title: `NEAR | Blockchains, Abstracted`,
        description: `"NEAR is the chain abstraction stack, empowering builders to create apps that scale to billions of users and across all blockchains."`,
      }}
      componentProps={{
        fetchEventsList: fetchLumaEvents,
      }}
    />
  );
};

HomePage.getLayout = useDefaultLayout;

export default HomePage;
