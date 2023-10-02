import {
  isLocalStorageSupported,
  isNotificationSupported,
  isPermisionGranted,
  isPushManagerSupported,
} from './notificationsHelpers';
import {
  getNotificationLocalStorage,
  setClearData,
  setHandleOnCancel,
  setHandleOnCancelBanner,
  setProcessEnded,
  setProcessError,
  setProcessStarted,
  setProcessSuccess,
} from './notificationsLocalStorage';

const applicationServerKey = 'BH_QFHjBU9x3VlmE9_XM4Awhm5vj2wF9WNQIz5wdlO6hc5anwEHLu6NLW521kCom7o9xChL5xvwTsHLK4dZpVVc';
const HOST = 'https://discovery-notifications-mainnet.near.org';
const GATEWAY_URL = 'https://beta.near.org';

// Will be used for error handling in future works
const isIOS = () => {
  const browserInfo = navigator.userAgent.toLowerCase();

  return (
    browserInfo.match('iphone') ||
    browserInfo.match('ipad') ||
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform)
  );
};

const handleRequestPermission = () => Notification.requestPermission();

const registerServiceWorker = () => navigator.serviceWorker.register('/service-worker.js');

const unregisterServiceWorker = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();
  for (const registration of registrations) {
    await registration.unregister();
  }
};

const handlePushManagerSubscribe = async () => {
  const serviceWorker = await navigator.serviceWorker.ready;

  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  });
};

export const handlePushManagerUnsubscribe = async (hide: () => void) => {
  const serviceWorker = await navigator.serviceWorker.ready;
  const subscription = await serviceWorker.pushManager.getSubscription();

  try {
    setClearData();
    await pushServerUnsubscribe(subscription);
    await unregisterServiceWorker();
    await subscription?.unsubscribe();
  } catch (error) {
    // TODO: handle
  } finally {
    hide();
  }
};

const sendToPushServer = (subscriptionData: object) =>
  fetch(`${HOST}/subscriptions/create`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(subscriptionData),
  });

const pushServerUnsubscribe = (subscription: any) =>
  fetch(`${HOST}/subscriptions/delete`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ endpoint: subscription?.endpoint }),
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
      gateway: GATEWAY_URL,
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
  setHandleOnCancel();
};
export const handleOnCancelBanner = () => {
  setHandleOnCancelBanner();
};

export const showNotificationModal = () => {
  if (isPermisionGranted() && getNotificationLocalStorage()?.permission) {
    return false;
  }

  const state = getNotificationLocalStorage();

  if ((isLocalStorageSupported() && !state.showOnTS) || state.showOnTS < Date.now()) {
    return true;
  }

  return false;
};
