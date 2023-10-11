import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useIosDevice } from '@/hooks/useIosDevice';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import {
  handleOnCancel,
  handleOnCancelBanner,
  handlePushManagerUnsubscribe,
  handleTurnOn,
} from '@/utils/notifications';
import {
  isLocalStorageSupported,
  isNotificationSupported,
  isPermisionGranted,
  isPushManagerSupported,
} from '@/utils/notificationsHelpers';
import { getNotificationLocalStorage } from '@/utils/notificationsLocalStorage';
import type { NextPageWithLayout } from '@/utils/types';

const NotificationsSettingsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const accountId = useAuthStore((store) => store.accountId);
  const { isIosDevice } = useIosDevice();
  const { subscribeStarted } = getNotificationLocalStorage() || {};

  return (
    <ComponentWrapperPage
      src={components.nearOrg.notifications.settings}
      meta={{ title: 'NEAR | Notification Settings', description: '' }}
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
        handlePushManagerUnsubscribe,
        iOSDevice: isIosDevice,
        loading: subscribeStarted,
        disabled: !accountId || subscribeStarted,
      }}
    />
  );
};

NotificationsSettingsPage.getLayout = useDefaultLayout;

export default NotificationsSettingsPage;
