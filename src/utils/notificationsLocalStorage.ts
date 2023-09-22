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
  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorage(),
      permission: true,
      subscribeStarted: false,
      subscribeError: '',
      isPermisionGranted: true,
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

export const getNotificationLocalStorage = () => {
  if (!isLocalStorageSupported()) {
    return;
  }

  const accountIdLS = getLSAccountId();

  const notificationsLS = isLocalStorageSupported() && JSON.parse(localStorage.getItem(NOTIFICATIONS_STORAGE) || '{}');
  return notificationsLS[accountIdLS];
};
