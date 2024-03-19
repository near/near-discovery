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

import * as S from './styles';

export function LargeScreenNotificationButton() {
  const components = useBosComponents();

  return (
    <S.LargeScreenHeaderActionWrapper>
      <VmComponent
        src={components.navigation.notificationButton}
        props={{
          size: '40px',
          buttonStyles: {
            margin: 0,
          },
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
    </S.LargeScreenHeaderActionWrapper>
  );
}
