// PWA Support

(async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        './pwa.js');
    } catch (error) {
      console.error(`PWA Registration failed with ${error}`);
    }
  }
})();


const addResourcesToCache = async (resources) => {
  const cache = await caches.open('v1');
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  if(request.method !== "POST" && request.url.indexOf("chrome-extension") === -1) {
    const cache = await caches.open('v1');
    try { 
      await cache.put(request, response);
    } catch(e) {console.log('caught error while adding to cache for request %s ', request)}
  }
};

const cacheFirst = async ({ request, preloadResponsePromise }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    console.log('returning %s from cache for request %s ', responseFromCache, request)
    return responseFromCache;
  }

  // Next try to use the preloaded response, if it's there
  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    console.info('using preload response', preloadResponse);
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }

  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request.clone());
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    // in the case when the network request fails,
    // there is nothing we can do, but we must always
    // return a Response object
    return fetch(request.clone());
  }
};

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener('activate', (event) => {
  console.log('PWA service worker activated')
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('beforeinstallprompt', event => {
  console.log('install will be prompted', event);

})

self.addEventListener('install', (event) => {
  console.log('PWA service worker Installing')
  event.waitUntil(
    addResourcesToCache([
      './favicon.ico'
    ])
  );
});

self.addEventListener('fetch', (event) => {
  console.log('received fetch event ')
  event.respondWith(
    cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
    })
  );
});