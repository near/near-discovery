import RudderAnalytics from 'rudder-sdk-js';
import type Analytics from '../../types/rudderstack-analytics';
import { createHash } from 'crypto';
import { get, split, truncate } from 'lodash';
import { nanoid } from 'nanoid';
import type { UIEvent } from 'react';

import { networkId } from './config';

let segment: Analytics | null = null;
let hashId = '';

declare global {
    interface Window {
        rudderanalytics: any;
    }
}

export function setAccountIdHash(accountId: string) {
  const hash = createHash('sha512');
  hash.update(accountId);
  hashId = hash.digest('hex');
  localStorage.setItem('hashId', hashId);
}

export async function init() {
  if (window?.rudderanalytics) return; // already initialized


  const segmentKey = networkId === 'testnet' ? '2R7K9phhzpFzk2zFIq2EFBtJ8BM' : '2R7K9phhzpFzk2zFIq2EFBtJ8BM';
  const rudderStackOptions = {
    dataPlaneUrl: "https://nearpavelsqp.dataplane.rudderstack.com",
  }

  const options =
    typeof window === 'undefined'
      ? rudderStackOptions
      : {
          ...rudderStackOptions,
          host: `${window.location.protocol}//${window.location.host}`,
          path: '/api/segment',
        };

  try {
    window.rudderanalytics = await import("rudder-sdk-js");
    window.rudderanalytics.load(segmentKey, "https://nearpavelsqp.dataplane.rudderstack.com", {
      anonymousIdOptions: {
        autoCapture: {
          enabled: true,
          source: "segment"
        }
      });
    segment = window.rudderanalytics;
  } catch (e) {
    console.error(e);
  }
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
  if (!segment) return;
  try {
    segment.page(
      'category',
      pageName,
      {
        hashId: localStorage.getItem('hashId'),
        url: filterURL(window.location.href),
        ref: filterURL(document.referrer),
      }
    );
  } catch (e) {
    console.error(e);
  }
}

const record = (eventType: string, e: UIEvent) => {
  const key = get(e.target, 'placeholder', get(e.target, 'innerText', get(e.target, 'href')));
  recordEventWithProps(eventType, {
    element: truncate(key, { length: 255 }),
    url: e.target ? filterURL((e.target as HTMLElement).baseURI) : '',
    xPath: getXPath(e.target as HTMLElement),
  });
};
export const recordClick = (e: UIEvent) => record('click', e);
export const recordMouseEnter = (e: UIEvent) => record('mouseover', e);
export const recordTouchStart = (e: UIEvent) => record('touchstart', e);

export function recordWalletConnect(accountId: string) {
  if (!localStorage.getItem('hashId')) {
    setAccountIdHash(accountId);
    recordEvent('wallet-connected');
  }
}

export function reset() {
  if (!segment) return;
  try {
    recordEvent('wallet-logout');
    localStorage.removeItem('hashId');
    segment.reset();
  } catch (e) {
    console.error(e);
  }
}

export function flushEvents() {
  if (!segment) return;
  return segment.reset();
}

function recordEventWithProps(eventLabel: string, properties: Record<string, string>) {
  if (!segment) return;
  try {
    segment.track(
      eventLabel,
      {
        ...properties,
        hashId: localStorage.getItem('hashId'),
      }
    );
  } catch (e) {
    console.error(e);
  }
}

export function recordEvent(eventLabel: string) {
  if (!segment) return;
  try {
    segment.track(
      eventLabel,
      {
        hashId: localStorage.getItem('hashId'),
        url: window.location.href,
      }
    );
} catch (e) {
  console.error(e);
}
}

function getXPath(element: HTMLElement | null): string {
  if (!element) return '';
  if (element.id !== '') return 'id("' + element.id + '")';
  if (element === document.body) return element.tagName;

  let ix = 0;
  const siblings = element.parentNode?.children || new HTMLCollection();

  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === element) return getXPath(element.parentElement) + '/' + element.tagName + '[' + (ix + 1) + ']';
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
  }

  return '';
}
