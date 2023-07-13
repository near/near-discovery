import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { recordPageView } from '@/utils/analytics';

export function usePageAnalytics() {
  const router = useRouter();
  const { asPath } = router;
  useEffect(() => {
    const justPath = asPath.split('?')[0];
    // wait for analytics library to initilize on initial page load before sending event
    if (window.analyticsInitialized) {
      recordPageView(justPath);
    } else {
      const checkInterval = setInterval(() => {
        if (window.analyticsInitialized) {
          recordPageView(justPath);
          clearInterval(checkInterval);
        }
      }, 100);
    }
  }, [asPath]);
}
