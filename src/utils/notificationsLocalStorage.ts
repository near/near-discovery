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

export const setHandleOnCancel = () => {
  const accountIdLS = getLSAccountId();
  const localStorageByAccountId = getNotificationLocalStorage();

  localStorage.setItem(
    notificationsLocalStorageKey,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {
        ...localStorageByAccountId,
        showOnTS: Date.now() + periodMiliseconds,
        notNowTS: Date.now(),
        bannerNotNowTS: undefined,
      },
    }),
  );
};

export const setHandleOnCancelBanner = () => {
  const accountIdLS = getLSAccountId();
  const localStorageByAccountId = getNotificationLocalStorage();

  localStorage.setItem(
    notificationsLocalStorageKey,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {
        ...localStorageByAccountId,
        bannerNotNowTS: Date.now(),
      },
    }),
  );
};

export const setProcessSuccess = () => {
  const accountIdLS = getLSAccountId();
  const localStorageByAccountId = getNotificationLocalStorage();

  localStorage.setItem(
    notificationsLocalStorageKey,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {
        ...localStorageByAccountId,
        permission: true,
        subscribeStarted: false,
        subscribeError: '',
        isPermisionGranted: true,
      },
    }),
  );
};

export const setProcessError = (error: any) => {
  const accountIdLS = getLSAccountId();
  const localStorageByAccountId = getNotificationLocalStorage();
  const errorMessage = error.message ? error.message : 'unknown';
  localStorage.setItem(
    notificationsLocalStorageKey,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {
        ...localStorageByAccountId,
        permission: false,
        subscribeStarted: false,
        subscribeError: errorMessage,
      },
    }),
  );
  openToast({
    id: 'notifications-subscription-error',
    type: 'ERROR',
    title: 'Push notification error',
    description: `${errorMessage}. Please try again later or send us a message if the problem persists.`,
    duration: 5000,
  });
};

export const setProcessEnded = () => {
  const accountIdLS = getLSAccountId();
  const localStorageByAccountId = getNotificationLocalStorage();

  localStorage.setItem(
    notificationsLocalStorageKey,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {
        ...localStorageByAccountId,
        subscribeStarted: false,
      },
    }),
  );
};

export const setProcessStarted = () => {
  const accountIdLS = getLSAccountId();
  const localStorageByAccountId = getNotificationLocalStorage();

  localStorage.setItem(
    notificationsLocalStorageKey,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {
        ...localStorageByAccountId,
        permission: false,
        subscribeStarted: true,
      },
    }),
  );
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

export const setNotificationsLocalStorage = () => {
  const accountIdLS = getLSAccountId();
  const localStorageByAccountId = getNotificationLocalStorage();

  localStorage.setItem(
    notificationsLocalStorageKey,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {
        ...localStorageByAccountId,
        isNotificationSupported: isNotificationSupported(),
        isPushManagerSupported: isPushManagerSupported(),
        isPermisionGranted: isPermisionGranted(),
      },
    }),
  );
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
