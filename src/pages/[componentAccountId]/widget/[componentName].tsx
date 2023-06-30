import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDevice } from '@/hooks/useDevice';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import { useCurrentComponentStore } from '@/stores/current-component';
import { recordClick, recordTouchStart } from '@/utils/analytics';
import type { NextPageWithLayout } from '@/utils/types';

const ViewComponentPage: NextPageWithLayout = () => {
  const router = useRouter();
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);
  const componentSrc = `${router.query.componentAccountId}/widget/${router.query.componentName}`;
  const [componentProps, setComponentProps] = useState<Record<string, unknown>>({});
  const authStore = useAuthStore();
  const components = useBosComponents();
  const device = useDevice();

  useEffect(() => {
    setComponentSrc(componentSrc);
  }, [setComponentSrc, componentSrc]);

  useEffect(() => {
    setComponentProps(router.query);
  }, [router.query]);

  const handleAnalyticsTrack = (e: React.MouseEvent) => device === 'desktop' ? recordClick(e) : recordTouchStart(e);

  return (
    <div className="container-xl" onPointerUp={handleAnalyticsTrack}>
      <div className="row">
        <div
          className="d-inline-block position-relative overflow-hidden"
          style={{
            paddingTop: 'var(--body-top-padding)',
          }}
        >
          <VmComponent
            key={components.tosCheck}
            src={components.tosCheck}
            props={{
              logOut: authStore.logOut,
              targetProps: componentProps,
              targetComponent: componentSrc,
              tosName: components.tosContent,
            }}
          />
        </div>
      </div>
    </div>
  );
};

ViewComponentPage.getLayout = useDefaultLayout;

export default ViewComponentPage;
