import { useEffect } from 'react';

import { openToast } from '@/components/lib/Toast';
import { useAuthStore } from '@/stores/auth';

export const MigrationAlert = () => {
  const signedIn = useAuthStore((store) => store.signedIn);
  const isNearDotOrg = ['https://near.org', 'https://beta.near.org'].some(
    (url) => process.env.NEXT_PUBLIC_HOSTNAME === url,
  );

  useEffect(() => {
    if (signedIn && isNearDotOrg) {
      openToast({
        title: "We're moving!",
        type: 'WARNING',
        description: (
          <p>
            Bookmark the new developer-focused experience at{' '}
            <a href="https://dev.near.org" target="_blank">
              dev.near.org
            </a>
          </p>
        ),
        duration: 50000,
      });
    }
  }, [isNearDotOrg, signedIn]);

  return <></>;
};
