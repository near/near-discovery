import {
  isLocalStorageSupported,
  isNotificationSupported,
  isPermisionGranted,
  isPushManagerSupported,
} from './notificationsHelpers';
import {
  getNotificationLocalStorage,
  NOTIFICATIONS_STORAGE,
  setProcessEnded,
  setProcessError,
  setProcessStarted,
  setProcessSuccess,
} from './notificationsLocalStorage';

const applicationServerKey = 'BH_QFHjBU9x3VlmE9_XM4Awhm5vj2wF9WNQIz5wdlO6hc5anwEHLu6NLW521kCom7o9xChL5xvwTsHLK4dZpVVc';
const HOST = 'https://notification-server-mainnet-7tk2cmmtcq-ew.a.run.app/subscriptions/create';

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

export const handleTurnOn = async (accountId: string, hideModal: () => void) => {
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
  } catch (error: unknown) {
    setProcessError(error);
  } finally {
    hideModal();
    setProcessEnded();
  }
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
