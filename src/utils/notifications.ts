import { notificationApplicationServerKey, notificationsGatewayUrl, notificationsHostName } from './config';
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
import type { NotificationSubscriptionData } from './types';
import { recordHandledError } from './analytics';

// min version for iOS to support notifications
export const recommendedIosVersionForNotifications = 16.4;

const handleRequestPermission = () => {
  try {
    return Notification.requestPermission();
  } catch (error: any) {
    const scope = 'Error while requesting Notification permission.';
    console.error(scope, error);
    recordHandledError({ scope, message: error.message || error });
  }
};

const registerServiceWorker = () => {
  try {
    return navigator.serviceWorker.register('/service-worker.js');
  } catch (e: any) {
    const scope = 'Error while registering the push notification service-worker';
    console.error(scope, e);
    recordHandledError({ scope, message: e.message || e });
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
      applicationServerKey: notificationApplicationServerKey,
    });
  } catch (e: any) {
    const scope = 'Error while subscribing to the push notification service-worker.';
    recordHandledError({ scope, message: e.message || e });
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
  } catch (e: any) {
    const scope = 'Error while handling push notification unsubscribe';
    console.error(scope, e);
    recordHandledError({ scope, message: e.message || e });
  } finally {
    hide();
  }
};

export const manageNotification = async (accountId: string, notificationType: string, block: boolean) => {
  const serviceWorker = await navigator.serviceWorker.ready;
  const subscription = await serviceWorker.pushManager.getSubscription();
  const endpoint = '/preferences/set';

  const data = {
    accountId: accountId,
    endpoint: subscription?.endpoint,
    dapp: notificationType,
    block: block,
  };

  await fetch(`${notificationsHostName}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const sendToPushServer = (subscriptionData: NotificationSubscriptionData) =>
  fetch(`${notificationsHostName}/subscriptions/create`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(subscriptionData),
  });

const pushServerUnsubscribe = (subscription: PushSubscription | null) =>
  fetch(`${notificationsHostName}/subscriptions/delete`, {
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
      gateway: notificationsGatewayUrl,
    });

    setProcessSuccess();
  } catch (error: any) {
    setProcessError(error);
    recordHandledError({
      scope: 'Error in the attempt to turn on Push Notifications',
      message: error.message || error,
    });
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

  if ((isLocalStorageSupported() && !state.showOnTS) || (state && state.showOnTS && state.showOnTS < Date.now())) {
    return true;
  }

  return false;
};
