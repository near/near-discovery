
self.addEventListener('install', (event) => console.log('SW - installing in progress.', event));

self.addEventListener('activate', (event) => console.log('SW - activateing in progress.', event));

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
