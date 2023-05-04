import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { VmWidgetWrapper } from '@/components/client/VmWidgetWrapper';
import { useSimpleLayout } from '@/hooks/useLayout';
import { useWidgets } from '@/hooks/useWidgets';
import { useAuthStore } from '@/stores/auth';
import { useCurrentWidgetStore } from '@/stores/current-widget';
import { recordClick, recordPageView } from '@/utils/analytics';
import type { NextPageWithLayout } from '@/utils/types';

const EmbedComponentPage: NextPageWithLayout = () => {
  const router = useRouter();
  const widgets = useWidgets();
  const authStore = useAuthStore();
  const setWidgetSrc = useCurrentWidgetStore((store) => store.setWidgetSrc);
  const widgetSrc = `${router.query.accountId}/widget/${router.query.componentName}`;
  const [widgetProps, setWidgetProps] = useState<Record<string, unknown>>({});

  useEffect(() => {
    setWidgetSrc(widgetSrc);
  }, [setWidgetSrc, widgetSrc]);

  useEffect(() => {
    setWidgetProps(router.query);
  }, [router.query]);

  useEffect(() => {
    // ! why?
    setTimeout(() => {
      recordPageView(widgetSrc);
    }, 1);
  }, [widgetSrc]);

  return (
    <div className="d-inline-block position-relative overflow-hidden" onPointerUp={recordClick}>
      <VmWidgetWrapper
        key={widgets.tosCheck}
        src={widgets.tosCheck}
        props={{
          logOut: authStore.logOut,
          tosName: widgets.tosContent,
          targetComponent: widgetSrc,
          targetProps: widgetProps,
        }}
      />
    </div>
  );
};

EmbedComponentPage.getLayout = useSimpleLayout;

export default EmbedComponentPage;
