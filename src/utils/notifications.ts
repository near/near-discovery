const applicationServerKey = '';
const HOST = '/subscriptions/create';
const NOTIFICATIONS_STORAGE = 'push-notifications-v0';

export const isNotificationSupported = () => typeof window !== 'undefined' && 'Notification' in window;

export const isPushManagerSupported = () => typeof window !== 'undefined' && 'PushManager' in window;

export const isPermisionGranted = () => typeof Notification !== 'undefined' && Notification.permission === 'granted';

export const isLocalStorageSupported = () => typeof localStorage !== 'undefined';

const handleRequestPermission = () => Notification.requestPermission();

const registerServiceWorker = () => navigator.serviceWorker.register('/service-worker.js');

const handlePushManagerSubscribe = async () => {
  const serviceWorker = await navigator.serviceWorker.ready;

  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  });
};

const sendToPushServer = (subscriptionData: object) =>
  fetch(HOST, {
    method: 'POST',
    body: JSON.stringify(subscriptionData),
  });

export const handleTurnOn = async (accountId: string, hideModal) => {
  if (!isNotificationSupported() && !isPushManagerSupported() && isPermisionGranted()) {
    return;
  }

  try {
    setProcessStarted();

    await handleRequestPermission();
    await registerServiceWorker();
    const subscription = await handlePushManagerSubscribe();
    await sendToPushServer({
      subscription,
      accountId,
    });

    setProcessSuccess();
  } catch (error) {
    setProcessError(error);
  } finally {
    hideModal();
    setProcessEnded();
  }
};

const setProcessSuccess = () => {
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

const setProcessError = (error) => {
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

const setProcessEnded = () => {
  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorage(),
      subscribeStarted: false,
    }),
  );
};

const setProcessStarted = () => {
  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorage(),
      permission: false,
      subscribeStarted: true,
    }),
  );
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

export const handleOnCancel = () => {
  localStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify({
      ...getNotificationLocalStorage(),
      showOnTS: Date.now() + 86400000, // 14 days
      notNowTS: Date.now(),
    }),
  );
};

const getNotificationLocalStorage = () => JSON.parse(localStorage.getItem(NOTIFICATIONS_STORAGE) || '{}');

export const showNotificationModal = () => {
  if (isPermisionGranted()) {
    return false;
  }

  const state = getNotificationLocalStorage();

  if ((isLocalStorageSupported() && !state.showOnTS) || state.showOnTS < Date.now()) {
    return true;
  }

  return false;
};
