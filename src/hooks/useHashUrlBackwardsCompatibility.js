import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useHashUrlBackwardsCompatibility() {
  const router = useRouter();

  function onHashChange(event) {
    const url = event.newURL.split('#').pop() ?? '/';

    if (url[0] === '/') {
      router.replace(url);
    }
  }

  useEffect(() => {
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const url = window.location.href.split('#').pop() ?? '/';

      if (url[0] === '/') {
        router.replace(url);
      }
    }
  }, []);
}
