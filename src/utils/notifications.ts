const applicationServerKey = '';
const HOST = '/subscriptions/create';
const NOTIFICATIONS_STORAGE = 'push-notifications-v0';

export const isNotificationSupported = () => typeof window !== 'undefined' && 'Notification' in window;

export const isPushManagerSupported = () => typeof window !== 'undefined' && 'PushManager' in window;

export const isPermisionGranted = () => Notification.permission === 'granted';

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

export const handleTurnOn = async (accountId: string) => {
  if (!isNotificationSupported() && !isPushManagerSupported() && isPermisionGranted()) {
    return;
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
