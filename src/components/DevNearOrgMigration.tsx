import { useEffect } from 'react';

import { openToast } from '@/components/lib/Toast';
import { useAuthStore } from '@/stores/auth';

export const MigrationAlert = () => {
  const signedIn = useAuthStore((store) => store.signedIn);

  useEffect(() => {
    if (signedIn) {
      openToast({
        title: "We're moving!",
        type: 'WARNING',
        description: (
          <p>
            Bookmark the new wallet-connected experience at{' '}
            <a href="https://dev.near.org" target="_blank">
              dev.near.org
            </a>
          </p>
        ),
        duration: 50000,
      });
    }
  }, [signedIn]);

  return <></>;
};
