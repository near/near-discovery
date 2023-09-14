
self.addEventListener('install', (event) => console.log('SW - installing in progress.', event));

self.addEventListener('activate', (event) => console.log('SW - activateing in progress.', event));


const getOptions = ({ path, id }) => ({
  body: '',
  icon: './favicon.png',
  tag: id,
  timestamp: Date.now(),
  data: {
    path, // TODO: at this step change to full url
  },
});
