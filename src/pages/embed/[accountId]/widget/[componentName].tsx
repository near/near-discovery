import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { VmComponent } from '@/components/client/VmComponent';
import { useSimpleLayout } from '@/hooks/useLayout';
import { useWidgets } from '@/hooks/useWidgets';
import { useAuthStore } from '@/stores/auth';
import { useCurrentComponentStore } from '@/stores/current-component';
import { recordClick, recordPageView } from '@/utils/analytics';
import type { NextPageWithLayout } from '@/utils/types';

const EmbedComponentPage: NextPageWithLayout = () => {
  const router = useRouter();
  const widgets = useWidgets();
  const authStore = useAuthStore();
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);
  const componentSrc = `${router.query.accountId}/widget/${router.query.componentName}`;
  const [widgetProps, setWidgetProps] = useState<Record<string, unknown>>({});

  useEffect(() => {
    setComponentSrc(componentSrc);
  }, [setComponentSrc, componentSrc]);

  useEffect(() => {
    setWidgetProps(router.query);
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
        key={widgets.tosCheck}
        src={widgets.tosCheck}
        props={{
          logOut: authStore.logOut,
          tosName: widgets.tosContent,
          targetComponent: componentSrc,
          targetProps: widgetProps,
        }}
      />
    </div>
  );
};

EmbedComponentPage.getLayout = useSimpleLayout;

export default EmbedComponentPage;
