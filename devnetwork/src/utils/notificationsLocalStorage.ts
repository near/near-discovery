import { openToast } from '@/components/lib/Toast';

import { localStorageAccountIdKey, notificationsLocalStorageKey } from './config';
import {
  isLocalStorageSupported,
  isNotificationSupported,
  isPermisionGranted,
  isPushManagerSupported,
} from './notificationsHelpers';
import type { NotificationLocalStorageByAccountId, NotificationLocalStorageFull } from './types';

const oneDayMiliseconds = 86400000;
const periodMiliseconds = oneDayMiliseconds * 180; // 180 days

const getLSAccountId = (): string => {
  return localStorage.getItem(localStorageAccountIdKey) || '';
};

const updateLocalStorage = (data: NotificationLocalStorageByAccountId) => {
  const accountIdLS = getLSAccountId();
  const localStorageByAccountId = getNotificationLocalStorage();
  localStorage.setItem(
    notificationsLocalStorageKey,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {
        ...localStorageByAccountId,
        ...data,
      },
    }),
  );
};

export const setHandleOnCancel = () => {
  updateLocalStorage({
    showOnTS: Date.now() + periodMiliseconds,
    notNowTS: Date.now(),
    bannerNotNowTS: undefined,
  });
};

export const setHandleOnCancelBanner = () => {
  updateLocalStorage({
    bannerNotNowTS: Date.now(),
  });
};

export const setProcessSuccess = () => {
  updateLocalStorage({
    permission: true,
    subscribeStarted: false,
    subscribeError: '',
    isPermisionGranted: true,
  });
};

export const setProcessError = (error: any) => {
  const errorMessage = error.message ? error.message : 'unknown';
  updateLocalStorage({
    permission: false,
    subscribeStarted: false,
    subscribeError: errorMessage,
  });

  openToast({
    id: 'notifications-subscription-error',
    type: 'ERROR',
    title: 'Push notification error',
    description: `${errorMessage}. Please try again later or send us a message if the problem persists.`,
    duration: 5000,
  });
};

export const setProcessEnded = () => {
  updateLocalStorage({
    subscribeStarted: false,
  });
};

export const setProcessStarted = () => {
  updateLocalStorage({
    permission: false,
    subscribeStarted: true,
  });
};

export const setClearData = () => {
  const accountIdLS = getLSAccountId();

  localStorage.setItem(
    notificationsLocalStorageKey,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {},
    }),
  );
};

// This method is called first from src/pages/_app.tsx
// which means that all other calls of updateLocalStorage
// will have isNotificationSupported, isPushManagerSupported
// and isPermisionGranted defined
export const setNotificationsLocalStorage = () => {
  updateLocalStorage({
    isNotificationSupported: isNotificationSupported(),
    isPushManagerSupported: isPushManagerSupported(),
    isPermisionGranted: isPermisionGranted(),
  });
};

export const getNotificationLocalStorageFull = (): NotificationLocalStorageFull =>
  isLocalStorageSupported() && JSON.parse(localStorage.getItem(notificationsLocalStorageKey) || '{}');

export const getNotificationLocalStorage = (): NotificationLocalStorageByAccountId => {
  if (!isLocalStorageSupported()) {
    return {} as NotificationLocalStorageFull;
  }

  const accountIdLS = getLSAccountId();
  const notificationsLS: NotificationLocalStorageFull = JSON.parse(
    localStorage.getItem(notificationsLocalStorageKey) || '{}',
  );
  return notificationsLS[accountIdLS] || {};
};
