import { isPassKeyAvailable } from '@near-js/biometric-ed25519';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { openToast } from '@/components/lib/Toast';
import { MetaTags } from '@/components/MetaTags';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { NearOrgHomePage } from '@/components/near-org/NearOrg.HomePage';
import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import { useCurrentComponentStore } from '@/stores/current-component';
import { handleOnCancel, handleTurnOn, showNotificationModal } from '@/utils/notifications';
import { isNotificationSupported, isPermisionGranted, isPushManagerSupported } from '@/utils/notificationsHelpers';
import { setNotificationsSessionStorage, getNotificationLocalStorage } from '@/utils/notificationsLocalStorage';
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
  const [showNotificationModalState, setShowNotificationModalState] = useState(false);
  const accountId = useAuthStore((store) => store.accountId);
  const [tosData, setTosData] = useState<TosData | null>(null);
  const cacheTosData = useMemo(() => tosData, [tosData?.latestTosVersion]);

  const handleModalCloseOnEsc = useCallback(() => {
    setShowNotificationModalState(false);
  }, []);

  const turnNotificationsOn = useCallback(
    () =>
      handleTurnOn(accountId, () => {
        setShowNotificationModalState(false);
      }),
    [],
  );

  const pauseNotifications = useCallback(() => {
    handleOnCancel();
    setShowNotificationModalState(false);
  }, []);

  const checkNotificationModal = useCallback(() => {
    if (tosData && tosData.agreementsForUser.length > 0) {
      // show notification modal for new users
      const tosAccepted =
        tosData.agreementsForUser[tosData.agreementsForUser.length - 1].value === tosData.latestTosVersion;
      // check if user has already turned on notifications
      const { showOnTS } = getNotificationLocalStorage() || {};

      if ((tosAccepted && !showOnTS) || (tosAccepted && showOnTS < Date.now())) {
        setTimeout(() => {
          setShowNotificationModalState(showNotificationModal());
        }, 10000);
      }
    }
  }, [cacheTosData]);

  useEffect(() => {
    if (!signedIn) {
      return;
    }
    checkNotificationModal();
  }, [signedIn, cacheTosData]);

  useEffect(() => {
    const optimisticAccountId = window.localStorage.getItem(LS_ACCOUNT_ID);
    setSignedInOptimistic(!!optimisticAccountId);
  }, []);

  useEffect(() => {
    if (!signedIn) {
      setComponentSrc(null);
    }
  }, [signedIn, setComponentSrc]);

  // if we are loading the ActivityPage, process the query params into componentProps
  useEffect(() => {
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
        <VmComponent
          src={components.nearOrg.notifications.alert}
          props={{
            open: showNotificationModalState,
            handleTurnOn: turnNotificationsOn,
            handleOnCancel: pauseNotifications,
            isNotificationSupported,
            isPermisionGranted,
            isPushManagerSupported,
            setNotificationsSessionStorage,
            onOpenChange: handleModalCloseOnEsc,
          }}
        />
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
