import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useDefaultLayout } from '@/hooks/useLayout';
import { useCurrentComponentStore } from '@/stores/current-component';
import type { NextPageWithLayout } from '@/utils/types';

const Editor = dynamic(() => import('../../components/editor/Editor'), {
  ssr: false,
});

const SandboxPage: NextPageWithLayout = () => {
  const router = useRouter();
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);

  useEffect(() => {
    if (typeof router.query.componentSrc === 'string') {
      const segments = router.query.componentSrc.split('/');
      console.log(segments);

      // const componentSrc = `${router.query.accountId}/widget/${router.query.componentName}`;
      // setComponentSrc(componentSrc);
    }
  }, [setComponentSrc, router]);

  return <Editor onboarding={false} />;
};

SandboxPage.getLayout = useDefaultLayout;

export default SandboxPage;
