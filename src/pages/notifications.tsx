import { useContext } from 'react';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { NearContext } from '@/components/WalletSelector';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useIosDevice } from '@/hooks/useIosDevice';
import { useDefaultLayout } from '@/hooks/useLayout';
import {
  handleOnCancel,
  handleOnCancelBanner,
  handleTurnOn,
  manageNotification,
  recommendedIosVersionForNotifications,
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
  const { signedAccountId } = useContext(NearContext);
  const { isIosDevice, versionOfIos } = useIosDevice();

  return (
    <ComponentWrapperPage
      src={components.nearOrg.notifications.page}
      meta={{ title: 'NEAR | Notifications', description: '' }}
      componentProps={{
        isLocalStorageSupported,
        isNotificationSupported,
        isPermisionGranted,
        isPushManagerSupported,
        handleOnCancel,
        getNotificationLocalStorage,
        handleOnCancelBanner,
        accountId: signedAccountId,
        handleTurnOn,
        manageNotification,
        iOSDevice: isIosDevice,
        iOSVersion: versionOfIos,
        recomendedIOSVersion: recommendedIosVersionForNotifications,
      }}
    />
  );
};

NotificationsPage.getLayout = useDefaultLayout;

export default NotificationsPage;
