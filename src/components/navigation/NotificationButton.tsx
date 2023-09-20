import React from 'react';

import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { handleOnCancel, handleOnCancelBanner, handleTurnOn } from '@/utils/notifications';
import {
  isLocalStorageSupported,
  isNotificationSupported,
  isPermisionGranted,
  isPushManagerSupported,
} from '@/utils/notificationsHelpers';
import { getNotificationLocalStorage } from '@/utils/notificationsLocalStorage';

export function NotificationButton() {
  const components = useBosComponents();

  return (
    <VmComponent
      src={components.nearOrg.notifications.button}
      props={{
        isLocalStorageSupported,
        isNotificationSupported,
        isPermisionGranted,
        isPushManagerSupported,
        handleOnCancel,
        getNotificationLocalStorage,
        handleOnCancelBanner,
        handleTurnOn,
      }}
    />
  );
}
