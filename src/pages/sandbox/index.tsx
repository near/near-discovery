import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Sandbox } from '@/components/sandbox';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useCurrentComponentStore } from '@/stores/current-component';
import type { NextPageWithLayout } from '@/utils/types';

const SandboxPage: NextPageWithLayout = () => {
  const router = useRouter();
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);

  useEffect(() => {
    if (Array.isArray(router.query.componentSrc)) {
      const accountId = router.query.componentSrc.shift();
      const componentName = router.query.componentSrc.pop();
      const componentSrc = `${accountId}/widget/${componentName}`;
      setComponentSrc(componentSrc);
    } else {
      setComponentSrc(null);
    }
  }, [setComponentSrc, router]);

  return <Sandbox onboarding={false} />;
};

SandboxPage.getLayout = useDefaultLayout;

export default SandboxPage;
