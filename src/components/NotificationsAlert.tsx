import { useCallback, useEffect, useState } from 'react';

import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useIosDevice } from '@/hooks/useIosDevice';
import { useAuthStore } from '@/stores/auth';
import {
  handleOnCancel,
  handleTurnOn,
  recommendedIosVersionForNotifications,
  showNotificationModal,
} from '@/utils/notifications';
import { isNotificationSupported, isPermisionGranted, isPushManagerSupported } from '@/utils/notificationsHelpers';
import { getNotificationLocalStorage, setNotificationsSessionStorage } from '@/utils/notificationsLocalStorage';
import type { TosData } from '@/utils/types';

type Props = {
  tosData: TosData | null;
};

export const NotificationsAlert = ({ tosData }: Props) => {
  const signedIn = useAuthStore((store) => store.signedIn);
  const components = useBosComponents();
  const [showNotificationModalState, setShowNotificationModalState] = useState(false);
  const accountId = useAuthStore((store) => store.accountId);
  const [isHomeScreenApp, setHomeScreenApp] = useState(false);
  const [iosHomeScreenPrompt, setIosHomeScreenPrompt] = useState(false);
  const { isIosDevice, versionOfIos } = useIosDevice();
  const { showOnTS, subscribeStarted, subscribeError } = getNotificationLocalStorage() || {};

  const handleModalCloseOnEsc = useCallback(() => {
    setShowNotificationModalState(false);
  }, []);

  const handleHomeScreenClose = useCallback(() => {
    setIosHomeScreenPrompt(false);
  }, []);

  const turnNotificationsOn = useCallback(() => {
    // for iOS devices, show a different modal asking the user to add the app to their home screen
    // if the user has already added the app to their home screen, show the regular notification modal
    if (isIosDevice && !isHomeScreenApp) {
      setIosHomeScreenPrompt(true);
      setShowNotificationModalState(false);
      return;
    }
    return handleTurnOn(accountId, () => {
      setShowNotificationModalState(false);
    });
  }, [accountId, isIosDevice, isHomeScreenApp]);

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
      const showNotificationPrompt = showNotificationModal();

      if (!subscribeError && showNotificationPrompt && tosAccepted && (!showOnTS || !iosHomeScreenPrompt)) {
        setTimeout(() => {
          setShowNotificationModalState(showNotificationPrompt);
        }, 3000);
      }
    }
  }, [tosData, subscribeError, showOnTS, iosHomeScreenPrompt]);

  useEffect(() => {
    if (!signedIn) {
      return;
    }
    checkNotificationModal();
  }, [signedIn, checkNotificationModal]);

  useEffect(() => {
    if (isIosDevice) {
      setHomeScreenApp(window.matchMedia('(display-mode: standalone)').matches);
    }
  }, [isIosDevice]);

  useEffect(() => {
    if (isIosDevice) {
      window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => setHomeScreenApp(e.matches));
      // Remove event listener
      return () => {
        window.matchMedia('(display-mode: standalone)').removeEventListener('change', () => setHomeScreenApp(false));
      };
    }
  }, [isIosDevice]);

  if (!signedIn) return null;

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
          iOSDevice: isIosDevice,
          iOSVersion: versionOfIos,
          recomendedIOSVersion: recommendedIosVersionForNotifications,
          loading: subscribeStarted,
        }}
      />
      <VmComponent
        src={components.nearOrg.notifications.iosHomeScreenAlert}
        props={{
          open: iosHomeScreenPrompt,
          onOpenChange: handleHomeScreenClose,
        }}
      />
    </>
  );
};
