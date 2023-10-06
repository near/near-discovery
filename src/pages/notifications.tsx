import { useMemo } from 'react';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import {
  detestIOSVersion,
  handleOnCancel,
  handleOnCancelBanner,
  handleTurnOn,
  isIOS,
  recomendedIOSVersion,
} from '@/utils/notifications';
import {
  isLocalStorageSupported,
  isNotificationSupported,
  isPermisionGranted,
  isPushManagerSupported,
} from '@/utils/notificationsHelpers';
import { getNotificationLocalStorage } from '@/utils/notificationsLocalStorage';
import type { NextPageWithLayout } from '@/utils/types';

const NotificationsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const accountId = useAuthStore((store) => store.accountId);
  const iOSDevice = useMemo(() => {
    if (typeof window !== 'undefined') {
      return isIOS();
    }
    return false;
  }, []);

  const iOSVersion = useMemo(() => {
    if (typeof window !== 'undefined' && iOSDevice) {
      return detestIOSVersion();
    }
    return;
  }, [iOSDevice]);

  return (
    <ComponentWrapperPage
      src={components.nearOrg.notifications.page}
      // TODO: fill
      meta={{ title: '', description: '' }}
      componentProps={{
        isLocalStorageSupported,
        isNotificationSupported,
        isPermisionGranted,
        isPushManagerSupported,
        handleOnCancel,
        getNotificationLocalStorage,
        handleOnCancelBanner,
        accountId,
        handleTurnOn,
        iOSDevice,
        iOSVersion,
        recomendedIOSVersion,
      }}
    />
  );
};

NotificationsPage.getLayout = useDefaultLayout;

export default NotificationsPage;
