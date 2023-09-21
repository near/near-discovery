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
  replyPost: {
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

const getOptions = ({ path, id }) => ({
  body: '',
  icon: './favicon.png',
  tag: id,
  timestamp: Date.now(),
  data: {
    path, // TODO: at this step change to full url
  },
});

const getPath = ({ path }) => {
  return `http://near.org/notifications/${path || ''}`;
};

function handlePushEvent(event) {
  console.log('SW -  push event received', event);

  const notificationText = event.data.text();

  const { initiatedBy = '', valueType = '', path = '', id = '' } = JSON.parse(notificationText);

  const title = getNotificationTitle({ accountId: initiatedBy, notificationType: valueType });
  const options = getNotificationOptions({ path, id, notificationType: valueType });

  event.waitUntil(self.registration.showNotification(title, options));
}

const handlePushClick = (event) => {
  console.log('SW -  click event received', event);

  const { notification } = event;

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
        if (clients.openWindow) return clients.openWindow(notification.data.path);
      }),
  );
};

const getNotificationTitle = ({ accountId, notificationType }) => {
  return NOTIFICATIONS_SCHEMA[notificationType].title(accountId);
};

const getNotificationOptions = ({ notificationType, ...rest }) => {
  return NOTIFICATIONS_SCHEMA[notificationType].options({ ...rest });
};

self.addEventListener('install', (event) => console.log('SW - installing in progress.', event));

self.addEventListener('activate', (event) => console.log('SW - activateing in progress.', event));

self.addEventListener('push', handlePushEvent);

self.addEventListener('notificationclick', handlePushClick);
