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
import { handleOnCancel, handleTurnOn, isIOS, showNotificationModal } from '@/utils/notifications';
import { isNotificationSupported, isPermisionGranted, isPushManagerSupported } from '@/utils/notificationsHelpers';
import { getNotificationLocalStorage, setNotificationsSessionStorage } from '@/utils/notificationsLocalStorage';
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
  const [isHomeScreenApp, setHomeScreenApp] = useState(false);
  const [iosHomeScreenPrompt, setIosHomeScreenPrompt] = useState(false);
  const iOSDevice = useMemo(() => {
    if (typeof window !== 'undefined') {
      return isIOS();
    }
    return false;
  }, []);

  const handleModalCloseOnEsc = useCallback(() => {
    setShowNotificationModalState(false);
  }, []);

  const handleHomeScreenClose = useCallback(() => {
    setIosHomeScreenPrompt(false);
  }, []);

  const turnNotificationsOn = useCallback(() => {
    // for iOS devices, show a different modal asking the user to add the app to their home screen
    // if the user has already added the app to their home screen, show the regular notification modal
    if (iOSDevice && !isHomeScreenApp) {
      setIosHomeScreenPrompt(true);
      setShowNotificationModalState(false);
      return;
    }
    return handleTurnOn(accountId, () => {
      setShowNotificationModalState(false);
    });
  }, [accountId, iOSDevice, isHomeScreenApp]);

  const pauseNotifications = useCallback(() => {
    handleOnCancel();
    setShowNotificationModalState(false);
  }, []);

  const checkNotificationModal = useCallback(() => {
    if (cacheTosData && cacheTosData.agreementsForUser.length > 0) {
      // show notification modal for new users
      const tosAccepted =
        cacheTosData.agreementsForUser[cacheTosData.agreementsForUser.length - 1].value ===
        cacheTosData.latestTosVersion;
      // check if user has already turned on notifications
      const { showOnTS } = getNotificationLocalStorage() || {};

      if (!iosHomeScreenPrompt && ((tosAccepted && !showOnTS) || (tosAccepted && showOnTS < Date.now()))) {
        setTimeout(() => {
          setShowNotificationModalState(showNotificationModal());
        }, 3000);
      }
    }
  }, [cacheTosData, iosHomeScreenPrompt]);

  useEffect(() => {
    if (!signedIn) {
      return;
    }
    checkNotificationModal();
  }, [signedIn, checkNotificationModal]);

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
  useEffect(() => {
    if (iOSDevice) {
      setHomeScreenApp(window.matchMedia('(display-mode: standalone)').matches);
    }
  }, [iOSDevice]);

  useEffect(() => {
    if (iOSDevice) {
      window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => setHomeScreenApp(e.matches));
    }
  }, [iOSDevice]);

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
            iOSDevice,
          }}
        />
        <VmComponent
          src={components.nearOrg.notifications.iosHomeScreenAlert}
          props={{
            open: iosHomeScreenPrompt,
            onOpenChange: handleHomeScreenClose,
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
