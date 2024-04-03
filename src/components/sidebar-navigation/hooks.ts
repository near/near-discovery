import { useRouter } from 'next/router';

import { sidebarLayoutEnabled as sidebarLayoutFeatureFlagEnabled } from '@/utils/config';

export function useSidebarLayoutEnabled() {
  const router = useRouter();
  const sidebarLayoutTestOverrideEnabled = router.query.sidebar === 'true';
  const sidebarLayoutEnabled = sidebarLayoutTestOverrideEnabled || sidebarLayoutFeatureFlagEnabled;

  /*
    The sidebarLayoutTestOverrideEnabled logic is only needed for short term testing.
    Add "?sidebar=true" to any URL to temporarily enable the sidebar layout.
  */

  return {
    sidebarLayoutEnabled,
  };
}
