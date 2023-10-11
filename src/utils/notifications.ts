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
const GATEWAY_URL = 'https://near.org';

// min version for iOS to support notifications
export const recommendedIosVersionForNotifications = 16.4;

const handleRequestPermission = () => {
  try {
    return Notification.requestPermission();
  } catch (error) {
    console.error('Error while requesting permission.', error);
  }
};

const registerServiceWorker = () => {
  try {
    return navigator.serviceWorker.register('/service-worker.js');
  } catch (error) {
    console.error('Error while registering service-worker.', error);
  }
};

const unregisterServiceWorker = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();
  for (const registration of registrations) {
    await registration.unregister();
  }
};

const handlePushManagerSubscribe = async () => {
  const serviceWorker = await navigator.serviceWorker.ready;
  try {
    return await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    });
  } catch (e) {
    console.error('Error while subscribing to service-worker.', e);
    throw e;
  }
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
  const grantedPermission = isPermisionGranted();
  const { permission: initialPermissionGrantedByUser } = getNotificationLocalStorage() ?? {};
  if (grantedPermission && initialPermissionGrantedByUser) {
    return false;
  }

  const state = getNotificationLocalStorage() || {};

  if ((isLocalStorageSupported() && !state.showOnTS) || state.showOnTS < Date.now()) {
    return true;
  }

  return false;
};
