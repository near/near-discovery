import {
  isLocalStorageSupported,
  isNotificationSupported,
  isPermisionGranted,
  isPushManagerSupported,
} from './notificationsHelpers';

export const NOTIFICATIONS_STORAGE = 'push-notifications-v0';

export const setHandleOnCancel = () => {
  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorage(),
      showOnTS: Date.now() + 86400000, // 14 days
      notNowTS: Date.now(),
      bannerNotNowTS: undefined,
    }),
  );
};

export const setProcessSuccess = () => {
  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorage(),
      permission: true,
      subscribeStarted: false,
      subscribeError: '',
    }),
  );
};

export const setProcessError = (error: unknown) => {
  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorage(),
      permission: false,
      subscribeStarted: false,
      subscribeError: error,
    }),
  );
};

export const setProcessEnded = () => {
  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorage(),
      subscribeStarted: false,
    }),
  );
};

export const setProcessStarted = () => {
  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorage(),
      permission: false,
      subscribeStarted: true,
    }),
  );
};

export const setClearData = () => {
  localStorage.setItem(NOTIFICATIONS_STORAGE, JSON.stringify({}));
};

export const setNotificationsSessionStorage = () => {
  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorage(),
      isNotificationSupported: isNotificationSupported(),
      isPushManagerSupported: isPushManagerSupported(),
      isPermisionGranted: isPermisionGranted(),
    }),
  );
};

export const getNotificationLocalStorage = () =>
  isLocalStorageSupported() && JSON.parse(localStorage.getItem(NOTIFICATIONS_STORAGE) || '{}');
