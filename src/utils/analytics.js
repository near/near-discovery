import Analytics from "analytics-node";
import { nanoid } from "nanoid";
import { get, split, truncate } from "lodash";
import { createHash } from "crypto";
import { NetworkId } from "../data/widgets";

let segment;
let anonymousUserId;
let hashId;
let anonymousUserIdCreatedAt;

export function setAccountIdHash(accountId) {
  const hash = createHash("sha512");
  hash.update(accountId);
  hashId = hash.digest("hex");
  localStorage.setItem("hashId", hashId);
}

function getAnonymousId() {
  if (anonymousUserId) {
    return anonymousUserId;
  }

  const storageId = localStorage.getItem("anonymousUserId");
  anonymousUserIdCreatedAt = localStorage.getItem("anonymousUserIdCreatedAt");

  if (storageId) {
    anonymousUserId = storageId;
  } else {
    anonymousUserId = nanoid();
    anonymousUserIdCreatedAt = new Date().toUTCString();
    localStorage.setItem("anonymousUserId", anonymousUserId);
    localStorage.setItem("anonymousUserIdCreatedAt", anonymousUserIdCreatedAt);
  }

  return anonymousUserId;
}

export function init() {
  if (segment) return; // already initialized

  getAnonymousId();
  const segmentKey =
    NetworkId === "testnet"
      ? "diA7hiO28gGeb9fxn615Xs91uX3GyYhL"
      : "gVheHtpTIWpmstSvXjGkSY80nGEXgHX4";
  try {
    segment = new Analytics(segmentKey, {});
  } catch (e) {
    console.error(e);
  }
}

function isStringAllowed(str) {
  const denyList = [
    "account_id",
    "public_key",
    "all_keys",
    "publicKey",
    "apiKey",
    "accountId",
    "email",
  ];
  return !str || !denyList.some((param) => str.indexOf(param) !== -1);
}

function filterURL(url) {
  const [urlTrim, params] = split(url, "?");
  return isStringAllowed(params) ? url : urlTrim;
}

export function recordPageView(pageName) {
  try {
    segment.page({
      name: pageName || split(window.location.href, "?")[0],
      anonymousId: getAnonymousId(),
      properties: {
        hashId: localStorage.getItem("hashId"),
        url: filterURL(window.location.href),
        ref: filterURL(document.referrer),
      },
    });
  } catch (e) {
    console.error(e);
  }
}

const record = (eventType, e) => {
  const key = get(
    e.target,
    "placeholder",
    get(e.target, "innerText", get(e.target, "href"))
  );
  recordEventWithProps(eventType, {
    element: truncate(key, { length: 255 }),
    url: filterURL(e.target.baseURI),
  });
};
export const recordClick = (e) => record("click", e);
export const recordMouseEnter = (e) => record("mouseover", e);
export const recordTouchStart = (e) => record("touchstart", e);

export function recordWalletConnect(accountId) {
  if (!localStorage.getItem("hashId")) {
    setAccountIdHash(accountId);
    recordEvent("wallet-connected");
  }
}

export function reset() {
  try {
    recordEvent("wallet-logout");
    localStorage.removeItem("hashId");
    localStorage.removeItem("anonymousUserId");
    localStorage.removeItem("anonymousUserIdCreatedAt");
    segment.flush();
  } catch (e) {
    console.error(e);
  }
}

export function flushEvents() {
  return segment.flush();
}

function recordEventWithProps(eventLabel, properties) {
  try {
    segment.track({
      anonymousId: getAnonymousId(),
      event: eventLabel,
      properties: {
        ...properties,
        hashId: localStorage.getItem("hashId"),
        anonymousUserIdCreatedAt,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

export function recordEvent(eventLabel) {
  try {
    segment.track({
      anonymousId: getAnonymousId(),
      event: eventLabel,
      properties: {
        hashId: localStorage.getItem("hashId"),
        url: window.location.href,
        anonymousUserIdCreatedAt,
      },
    });
  } catch (e) {
    console.error(e);
  }
}
