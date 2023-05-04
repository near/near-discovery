import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { VmComponent } from '@/components/client/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useSimpleLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import { useCurrentComponentStore } from '@/stores/current-component';
import { recordClick, recordPageView } from '@/utils/analytics';
import type { NextPageWithLayout } from '@/utils/types';

const EmbedComponentPage: NextPageWithLayout = () => {
  const router = useRouter();
  const components = useBosComponents();
  const authStore = useAuthStore();
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);
  const componentSrc = `${router.query.accountId}/widget/${router.query.componentName}`;
  const [componentProps, setComponentProps] = useState<Record<string, unknown>>({});

  useEffect(() => {
    setComponentSrc(componentSrc);
  }, [setComponentSrc, componentSrc]);

  useEffect(() => {
    setComponentProps(router.query);
  }, [router.query]);

  useEffect(() => {
    // ! why?
    setTimeout(() => {
      recordPageView(componentSrc);
    }, 1);
  }, [componentSrc]);

  return (
    <div className="d-inline-block position-relative overflow-hidden" onPointerUp={recordClick}>
      <VmComponent
        key={components.tosCheck}
        src={components.tosCheck}
        props={{
          logOut: authStore.logOut,
          tosName: components.tosContent,
          targetComponent: componentSrc,
          targetProps: componentProps,
        }}
      />
    </div>
  );
};

EmbedComponentPage.getLayout = useSimpleLayout;

export default EmbedComponentPage;
