export const isNotificationSupported = () => typeof window !== 'undefined' && 'Notification' in window;

export const isPushManagerSupported = () => typeof window !== 'undefined' && 'PushManager' in window;

export const isPermisionGranted = () => typeof Notification !== 'undefined' && Notification.permission === 'granted';

export const isLocalStorageSupported = () => typeof localStorage !== 'undefined';
