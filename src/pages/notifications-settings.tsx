import { useContext } from 'react';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { NearContext } from '@/components/WalletSelector';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useIosDevice } from '@/hooks/useIosDevice';
import { useDefaultLayout } from '@/hooks/useLayout';
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
  const { signedAccountId } = useContext(NearContext);
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
        accountId: signedAccountId,
        handleTurnOn,
        handlePushManagerUnsubscribe,
        iOSDevice: isIosDevice,
        loading: subscribeStarted,
        disabled: !signedAccountId || subscribeStarted,
      }}
    />
  );
};

NotificationsSettingsPage.getLayout = useDefaultLayout;

export default NotificationsSettingsPage;
