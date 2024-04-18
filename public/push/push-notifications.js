const NOTIFICATIONS_SCHEMA = {
  like: {
    title: (accountId) => `${accountId} liked your post`,
    options: (props) => ({
      ...getOptions(props),
      // optional
    }),
  },
  fork: {
    title: (accountId) => `${accountId} forked your component`,
    options: (props) => ({
      ...getOptions(props),
      // optional
    }),
  },
  replyComponent: {
    title: (accountId) => `${accountId} replied to discussion on your component`,
    options: (props) => ({
      ...getOptions(props),
      // optional
    }),
  },
  follow: {
    title: (accountId) => `${accountId} followed you`,
    options: (props) => ({
      ...getOptions(props),
      // optional
    }),
  },
  unfollow: {
    title: (accountId) => `${accountId} unfollowed you`,
    options: (props) => ({
      ...getOptions(props),
      // optional
    }),
  },
  comment: {
    title: (accountId) => `${accountId} replied to your post`,
    options: (props) => ({
      ...getOptions(props),
      // optional
    }),
  },
  mention: {
    title: (accountId) => `${accountId} mentioned you in their post`,
    options: (props) => ({
      ...getOptions(props),
      // optional
    }),
  },
  poke: {
    title: (accountId) => `${accountId} poked you`,
    options: (props) => ({
      ...getOptions(props),
      // optional
    }),
  },
};

const getOptions = (props) => ({
  body: '',
  icon: './favicon.png',
  tag: props.id,
  timestamp: Date.now(),
  data: {
    ...props,
    link: getLink(props),
  },
});

const getLink = (props) => {
  if (props.valueType.includes('devgovgigs') && props.devhubPostId) {
    return `https://near.org/devhub.near/widget/app?page=post&id=${props.devhubPostId}`;
  } else if (props.receiver && props.actionAtBlockHeight) {
    return `https://near.org/s/p?a=${props.receiver}&b=${props.actionAtBlockHeight}`;
  }
  return `https://near.org/notifications`;
};

function handlePushEvent(event) {
  const notification = event.data.json();

  console.log('SW - push event received', notification);

  const { initiatedBy, valueType } = notification;

  if (!initiatedBy || !valueType) {
    console.error(
      `handlePushEvent received event with an undefined required value valueType=${valueType}, initiatedBy=${initiatedBy}`,
    );
    return;
  }

  const title = getNotificationTitle({ accountId: initiatedBy, notificationType: valueType });
  const options = getNotificationOptions({ notificationType: valueType, ...notification });

  console.log('SW - triggering notification with', title, options);

  try {
    event.waitUntil(self.registration.showNotification(title, options));
  } catch (e) {
    console.error('Error during an attempt to show a notification', e);
  }
}

const handlePushClick = (event) => {
  console.log('SW - click event received', event);

  const { notification } = event;

  console.log('SW - push event received', notification);

  notification.close();

  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(notification.data.link);
      }),
  );
};

const getNotificationTitle = ({ accountId, notificationType }) => {
  return NOTIFICATIONS_SCHEMA[notificationType].title(accountId);
};

const getNotificationOptions = ({ notificationType, ...rest }) => {
  return NOTIFICATIONS_SCHEMA[notificationType].options(rest);
};

self.addEventListener('install', (event) => console.log('SW - installing in progress.', event));

self.addEventListener('activate', (event) => console.log('SW - activating in progress.', event));

self.addEventListener('push', handlePushEvent);

self.addEventListener('notificationclick', handlePushClick);
