import { useCallback, useEffect } from 'react';

import { useComponentRedirectMapStore } from '@/stores/component-redirect-map';

import { useFlags } from './useFlags';

export function useComponentRedirectMapInitializer() {
  const [flags] = useFlags();
  const loaderUrl = flags?.bosLoaderUrl || process.env.NEXT_PUBLIC_LOCAL_COMPONENT_LOADER;
  const setStore = useComponentRedirectMapStore((store) => store.set);

  /**
   * Fetch local component versions if a local loader
   * is provided. must be provided as {components: { <path>: { code : <code>}}}
   */
  const fetchRedirectMap = useCallback(
    async (url: string) => {
      setStore({
        loaderUrl: url,
      });

      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Network response was not OK');
        }

        const data = await res.json();

        setStore({
          hasResolved: true,
          redirectMap: data.components,
        });
      } catch (e) {
        console.error(e);

        setStore({
          failedToLoad: true,
          hasResolved: true,
        });
      }
    },
    [setStore],
  );

  useEffect(() => {
    if (loaderUrl) {
      fetchRedirectMap(loaderUrl);
    } else {
      setStore({ hasResolved: true });
    }
  }, [fetchRedirectMap, loaderUrl, setStore]);
}
