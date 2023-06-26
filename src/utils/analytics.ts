import { get, split, truncate } from 'lodash';
import type { UIEvent } from 'react';

import * as RudderAnalytics from './rudder-analytics';
import * as Segment from './segment-analytics';

export async function init() {
  await Segment.init();
  await RudderAnalytics.init();
}

export function recordPageView(pageName: string) {
  Segment.recordPageView(pageName);
  RudderAnalytics.recordPageView(pageName);
}

function isStringAllowed(str: string) {
  const denyList = ['account_id', 'public_key', 'all_keys', 'publicKey', 'apiKey', 'accountId', 'email'];
  return !str || !denyList.some((param) => str.indexOf(param) !== -1);
}

function filterURL(url: string) {
  const [urlTrim, params] = split(url, '?');
  return isStringAllowed(params) ? url : urlTrim;
}

const record = (eventType: string, e: UIEvent) => {
  const key = get(e.target, 'placeholder', get(e.target, 'innerText', get(e.target, 'href')));
  Segment.recordEventWithProps(eventType, {
    element: truncate(key, { length: 255 }),
    url: e.target ? filterURL((e.target as HTMLElement).baseURI) : '',
    xPath: getXPath(e.target as HTMLElement),
  });

  RudderAnalytics.recordEventWithProps(eventType, {
    element: truncate(key, { length: 255 }),
    url: e.target ? filterURL((e.target as HTMLElement).baseURI) : '',
    xPath: getXPath(e.target as HTMLElement),
  });
};

export const recordClick = (e: UIEvent) => record('click', e);
export const recordMouseEnter = (e: UIEvent) => record('mouseover', e);
export const recordTouchStart = (e: UIEvent) => record('touchstart', e);

export function recordWalletConnect(accountId: string) {
  Segment.recordWalletConnect(accountId);
  RudderAnalytics.recordWalletConnect(accountId);
}

export function reset() {
  Segment.reset();
  RudderAnalytics.reset();
}

export function flushEvents() {
  Segment.flushEvents();
}

export function recordEvent(eventLabel: string) {
  Segment.recordEvent(eventLabel);
  RudderAnalytics.recordEvent(eventLabel);
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
