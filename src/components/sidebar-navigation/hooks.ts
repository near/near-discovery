import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { sidebarLayoutEnabled as sidebarLayoutFeatureFlagEnabled } from '@/utils/config';

export function useSidebarLayoutEnabled() {
  const router = useRouter();
  const [sidebarLayoutTestOverrideEnabled, setSidebarLayoutTestOverrideEnabled] = useState(false);
  const sidebarLayoutEnabled = sidebarLayoutTestOverrideEnabled || sidebarLayoutFeatureFlagEnabled;

  useEffect(() => {
    /*
      We only evaluate this once on page load so that we keep it enabled until they close
      their browser tab.
    */

    setSidebarLayoutTestOverrideEnabled(router.query.sidebar === 'true');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
    The sidebarLayoutTestOverrideEnabled logic is only needed for short term testing.
    Add "?sidebar=true" to any URL to temporarily enable the sidebar layout.
  */

  return {
    sidebarLayoutEnabled,
  };
}
