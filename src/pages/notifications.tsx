import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useIosDevice } from '@/hooks/useIosDevice';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import {
  manageNotification,
  handleOnCancel,
  handleOnCancelBanner,
  handleTurnOn,
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
  const accountId = useAuthStore((store) => store.accountId);
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
        accountId,
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
