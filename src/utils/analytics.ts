import { createHash } from 'crypto';
import { get, split, truncate } from 'lodash';
import { nanoid } from 'nanoid';
import type { UIEvent } from 'react';

import type Analytics from '../../types/rudderstack-analytics';
import { networkId } from './config';

let rudderAnalytics: Analytics | null = null;
let anonymousUserId = '';
let userAgentDetail = '';
let hashId = '';
let anonymousUserIdCreatedAt = '';
let pendingEvents: any = [];

declare global {
  interface Window {
    rudderAnalytics: Analytics | undefined;
  }
}

export function setAccountIdHash(accountId: string) {
  const hash = createHash('sha512');
  hash.update(accountId);
  hashId = hash.digest('hex');
  localStorage.setItem('hashId', hashId);
}

function getAnonymousId() {
  if (anonymousUserId) {
    return anonymousUserId;
  }

  const storageId = localStorage.getItem('anonymousUserId');
  anonymousUserIdCreatedAt = localStorage.getItem('anonymousUserIdCreatedAt') || '';

  if (storageId) {
    anonymousUserId = storageId;
  } else {
    anonymousUserId = nanoid();
    anonymousUserIdCreatedAt = new Date().toUTCString();
    localStorage.setItem('anonymousUserId', anonymousUserId);
    localStorage.setItem('anonymousUserIdCreatedAt', anonymousUserIdCreatedAt);
  }

  return anonymousUserId;
}

function getUserAgent() {
  if (!userAgentDetail) {
    const nav: ExperimentalNaviagtor = navigator;
    nav.userAgentData &&
      nav.userAgentData.getHighEntropyValues(['platformVersion', 'model']).then((ua: any) => {
        userAgentDetail = ua;
      });
  }
  return userAgentDetail;
}

export async function init() {
  getUserAgent();

  if (window?.rudderAnalytics) return;

  getAnonymousId();

  const rudderAnalyticsKey = networkId === 'testnet' ? '2R7K9phhzpFzk2zFIq2EFBtJ8BM' : '2RIih8mrVPUTQ9uWe6TFfwXzcMe';
  const rudderStackDataPlaneUrl = 'https://near.dataplane.rudderstack.com';

  let analyticsUrl = rudderStackDataPlaneUrl;
  if (typeof window !== 'undefined') {
    analyticsUrl = `${window.location.protocol}//${window.location.host}/api/analytics`;
  }

  try {
    window.rudderAnalytics = await import('rudder-sdk-js');
    window.rudderAnalytics.load(rudderAnalyticsKey, analyticsUrl);
    rudderAnalytics = window.rudderAnalytics;
    if (rudderAnalytics) rudderAnalytics.setAnonymousId(getAnonymousId());
    for (const event of pendingEvents) {
      event();
    }
    pendingEvents = [];
  } catch (e) {
    console.error(e);
  }
}

function isStringAllowed(str: string) {
  const denyList = ['account_id', 'public_key', 'all_keys', 'publicKey', 'apiKey', 'accountId', 'email'];
  return !str || !denyList.some((param) => str.indexOf(param) !== -1);
}

function filterURL(url: string) {
  const [urlTrim, params] = split(url, '?');
  return isStringAllowed(params) ? url : urlTrim;
}

export function recordPageView(pageName: string) {
  if (!rudderAnalytics) {
    pendingEvents.push(() => {
      recordPageView(pageName);
    });
    return;
  }
  try {
    rudderAnalytics.page('category', pageName, {
      hashId: localStorage.getItem('hashId'),
      url: filterURL(window.location.href),
      userAgentDetail,
      ref: filterURL(document.referrer),
    });
  } catch (e) {
    console.error(e);
  }
}

const record = (eventType: string, e: UIEvent | PointerEvent) => {
  const key = get(e.target, 'placeholder', get(e.target, 'innerText', get(e.target, 'href')));
  recordEventWithProps(eventType, {
    element: truncate(key, { length: 255 }),
    url: e.target ? filterURL((e.target as HTMLElement).baseURI) : '',
    xPath: getXPath(e.target as HTMLElement),
    componentSrc: getComponentName(e.target as HTMLElement),
  });
};
export const recordClick = (e: UIEvent | PointerEvent) => record('click', e);
export const recordMouseEnter = (e: UIEvent) => record('mouseover', e);
export const recordTouchStart = (e: UIEvent | PointerEvent) => record('touchstart', e);

export function recordWalletConnect(accountId: string) {
  if (!localStorage.getItem('hashId')) {
    setAccountIdHash(accountId);
    recordEvent('wallet-connected');
  }
}

export function reset() {
  if (!rudderAnalytics) return;
  try {
    recordEvent('wallet-logout');
    localStorage.removeItem('hashId');
    localStorage.removeItem('anonymousUserId');
    localStorage.removeItem('anonymousUserIdCreatedAt');
    rudderAnalytics.reset();
  } catch (e) {
    console.error(e);
  }
}

export function recordEventWithProps(eventLabel: string, properties: Record<string, string>) {
  if (!rudderAnalytics) return;
  try {
    rudderAnalytics.track(eventLabel, {
      ...properties,
      userAgentDetail,
      hashId: localStorage.getItem('hashId'),
      anonymousUserIdCreatedAt,
    });
  } catch (e) {
    console.error(e);
  }
}

export function recordHandledError(props: Record<string, string>) {
  recordEventWithProps('error-handled', props);
}

export function recordEvent(eventLabel: string) {
  if (!rudderAnalytics) return;
  try {
    rudderAnalytics.track(eventLabel, {
      hashId: localStorage.getItem('hashId'),
      url: window.location.href,
      userAgentDetail,
      anonymousUserIdCreatedAt,
    });
  } catch (e) {
    console.error(e);
  }
}

function getComponentName(element: HTMLElement | null): string {
  if (!element) return '';
  if (element.hasAttribute('data-component')) return element.getAttribute('data-component') || '';
  return '';
}

function getXPath(element: HTMLElement | null): string {
  if (!element) return '';
  if (element.id !== '') return 'id("' + element.id + '")';
  if (element === document.body) return element.tagName;

  let ix = 0;
  const siblings = element.parentNode?.children;
  if (!siblings) return '';

  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === element) return getXPath(element.parentElement) + '/' + element.tagName + '[' + (ix + 1) + ']';
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
  }

  return '';
}
