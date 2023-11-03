import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

export function useHashUrlBackwardsCompatibility() {
  const router = useRouter();

  const onHashChange = useCallback(
    (event: HashChangeEvent) => {
      const url = event.newURL.split('#').pop() ?? '/';
      if (url[0] === '/') {
        router.replace(url);
      }
    },
    [router],
  );

  useEffect(() => {
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [onHashChange]);

  useEffect(() => {
    if (window.location.hash) {
      const url = window.location.href.split('#').pop() ?? '/';

      if (url[0] === '/') {
        router.replace(url);
      }
    }
  }, [router]);
}
