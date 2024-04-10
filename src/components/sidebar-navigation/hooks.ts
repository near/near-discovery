import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { sidebarLayoutEnabled as sidebarLayoutFeatureFlagEnabled } from '@/utils/config';

export function useSidebarLayoutEnabled() {
  const router = useRouter();
  const overrideQueryParamEnabled = router.query.sidebar === 'true';
  const [sidebarLayoutTestOverrideEnabled, setSidebarLayoutTestOverrideEnabled] = useState(false);
  const sidebarLayoutEnabled = sidebarLayoutTestOverrideEnabled || sidebarLayoutFeatureFlagEnabled;

  useEffect(() => {
    /*
      If the override query param is provided, we want to keep the layout enabled until they close
      their browser tab.
    */

    if (overrideQueryParamEnabled) {
      setSidebarLayoutTestOverrideEnabled(true);
    }
  }, [overrideQueryParamEnabled]);

  /*
    The sidebarLayoutTestOverrideEnabled logic is only needed for short term testing.
    Add "?sidebar=true" to any URL to temporarily enable the sidebar layout.
  */

  return {
    sidebarLayoutEnabled,
  };
}
