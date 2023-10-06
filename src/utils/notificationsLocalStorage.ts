import {
  isLocalStorageSupported,
  isNotificationSupported,
  isPermisionGranted,
  isPushManagerSupported,
} from './notificationsHelpers';

export const NOTIFICATIONS_STORAGE = 'push-notifications-v0';
const LS_ACCOUNT_ID = 'near-social-vm:v01::accountId:';

const getLSAccountId = (): string => {
  return localStorage.getItem(LS_ACCOUNT_ID) || '';
};

export const setHandleOnCancel = () => {
  const accountIdLS = getLSAccountId();
  const localStorageByAccountId = getNotificationLocalStorage();

  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {
        ...localStorageByAccountId,
        showOnTS: Date.now() + 86400000, // 14 days
        notNowTS: Date.now(),
        bannerNotNowTS: undefined,
      },
      showOnTS: Date.now() + 86400000, // 14 days
      notNowTS: Date.now(),
      bannerNotNowTS: undefined,
    }),
  );
};

export const setHandleOnCancelBanner = () => {
  const accountIdLS = getLSAccountId();
  const localStorageByAccountId = getNotificationLocalStorage();

  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {
        ...localStorageByAccountId,
        bannerNotNowTS: Date.now(),
      },
      bannerNotNowTS: Date.now(),
    }),
  );
};

export const setProcessSuccess = () => {
  const accountIdLS = getLSAccountId();
  const localStorageByAccountId = getNotificationLocalStorage();

  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {
        ...localStorageByAccountId,
        permission: true,
        subscribeStarted: false,
        subscribeError: '',
        isPermisionGranted: true,
      },
      permission: true,
      subscribeStarted: false,
      subscribeError: '',
      isPermisionGranted: true,
    }),
  );
};

export const setProcessError = (error: any) => {
  const accountIdLS = getLSAccountId();
  const localStorageByAccountId = getNotificationLocalStorage();
  const errorMessage = error.message ? error.message : 'unknown';
  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {
        ...localStorageByAccountId,
        permission: false,
        subscribeStarted: false,
        subscribeError: errorMessage,
      },
      permission: false,
      subscribeStarted: false,
      subscribeError: errorMessage,
    }),
  );
};

export const setProcessEnded = () => {
  const accountIdLS = getLSAccountId();
  const localStorageByAccountId = getNotificationLocalStorage();

  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {
        ...localStorageByAccountId,
        subscribeStarted: false,
      },
      subscribeStarted: false,
    }),
  );
};

export const setProcessStarted = () => {
  const accountIdLS = getLSAccountId();
  const localStorageByAccountId = getNotificationLocalStorage();

  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {
        ...localStorageByAccountId,
        permission: false,
        subscribeStarted: true,
      },
      permission: false,
      subscribeStarted: true,
    }),
  );
};

export const setClearData = () => {
  const accountIdLS = getLSAccountId();

  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {},
    }),
  );
};

export const setNotificationsSessionStorage = () => {
  const accountIdLS = getLSAccountId();
  const localStorageByAccountId = getNotificationLocalStorage();

  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorageFull(),
      [accountIdLS]: {
        ...localStorageByAccountId,
        isNotificationSupported: isNotificationSupported(),
        isPushManagerSupported: isPushManagerSupported(),
        isPermisionGranted: isPermisionGranted(),
      },
      isNotificationSupported: isNotificationSupported(),
      isPushManagerSupported: isPushManagerSupported(),
      isPermisionGranted: isPermisionGranted(),
    }),
  );
};

export const getNotificationLocalStorageFull = () =>
  isLocalStorageSupported() && JSON.parse(localStorage.getItem(NOTIFICATIONS_STORAGE) || '{}');

export const getNotificationLocalStorage = () => {
  if (!isLocalStorageSupported()) {
    return {};
  }

  const accountIdLS = getLSAccountId();

  const notificationsLS = JSON.parse(localStorage.getItem(NOTIFICATIONS_STORAGE) || '{}');
  return notificationsLS[accountIdLS];
};
