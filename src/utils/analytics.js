import Analytics from 'analytics-node';
import { nanoid } from 'nanoid';

let segment
let userId
let anonymousUserId
let userIdCreatedAt

function getAnonymousId() {
  if (anonymousUserId) {
    return anonymousUserId;
  }

  const storageId = localStorage.getItem('anonymousUserId');
  userIdCreatedAt = localStorage.getItem('anonymousUserIdCreatedAt');

  if (storageId) {
    anonymousUserId = storageId;
  } else {
    anonymousUserId = nanoid();
    userIdCreatedAt = new Date().toUTCString()
    localStorage.setItem('anonymousUserId', anonymousUserId);
    localStorage.setItem('anonymousUserIdCreatedAt', userIdCreatedAt);
  }

  return anonymousUserId;
}

function init() {
  if (segment) return; // already initialized

  try {
    const options = {
      flushAt: 1, // TODO: Update to only use flushAt=1 on Local env. It's useful for testing new events
    };
    segment = new Analytics("diA7hiO28gGeb9fxn615Xs91uX3GyYhL", options);
  } catch (e) {
    console.error(e);
  }
}

function track(eventLabel, properties) {
  try {
    const id = userId ? { userId } : { anonymousId: getAnonymousId() };
    segment.track({
      ...id,
      event: eventLabel,
      properties,
      url: window.location.href,
      userId_created_at: userIdCreatedAt
    });
  } catch (e) {
    console.error(e);
  }
}


function pageView(pageName, properties) {
  try {
    const id = userId ? { userId } : { anonymousId: getAnonymousId() };
    segment.page({
      name: pageName, 
      ...id,
      properties: {
        ...properties,
        url: window.location.href,
        userId_created_at: userIdCreatedAt,
        ref: document.referrer,
      }
    });
  } catch (e) {
    console.error(e);
  }
}

function reset() {
  try {
    track('Logout', {
      userId_created_at: userIdCreatedAt,
      message_created_at: new Date().toUTCString()
    });
    segment.flush();
  } catch (e) {
    console.error(e);
  }
}

const analytics = {
  init,
  pageView,
  reset,
  track,
};

export default analytics;
