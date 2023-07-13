import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { recordPageView } from '@/utils/analytics';

export function usePageAnalytics() {
  const router = useRouter();
  const { asPath } = router;
  useEffect(() => {
    const justPath = asPath.split('?')[0];
    recordPageView(justPath);
  }, [asPath]);
}
