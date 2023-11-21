// Customized PWA Support, this content will be injected into the next-pwa generated public/next-pwa-sw.js
// useful if we decide to offer a custom install prompt UI
// using next-pwa's default caching strategy: https://github.com/shadowwalker/next-pwa/blob/master/cache.js
// PWA Tips: https://github.com/shadowwalker/next-pwa#tips


// To disable all workbox logging during development, set self.__WB_DISABLE_DEV_LOGS to true
//self.__WB_DISABLE_DEV_LOGS = true

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads
    await self.registration.navigationPreload.enable();
  }
};

const promptNewVersionAvailable = event => {
  // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
  // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
  // You may want to customize the UI prompt accordingly.
  if (confirm('A newer version of near.org is available, reload to update?')) {
    self.addEventListener('controlling', event => {
      window.location.reload()
    })

    // Send a message to the waiting service worker, instructing it to activate.
    self.messageSkipWaiting()
  } else {
    console.log(
      'User rejected to reload near.org, keep using old version. New version will be automatically load when user opens the app next time.'
    )
  }
}

self.addEventListener('waiting', promptNewVersionAvailable)

self.addEventListener('activate', (event) => {
  console.log('PWA service worker activated')
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('beforeinstallprompt', event => {
  console.log('install will be prompted', event);
})

self.addEventListener('install', () => {
  console.log('PWA service worker Installing')
});
