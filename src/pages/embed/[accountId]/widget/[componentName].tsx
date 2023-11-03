import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useSimpleLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import { useCurrentComponentStore } from '@/stores/current-component';
import { privacyDomainName, termsDomainName } from '@/utils/config';
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

  return (
    <div className="d-inline-block position-relative overflow-hidden">
      <VmComponent
        key={components.wrapper}
        src={components.wrapper}
        props={{
          logOut: authStore.logOut,
          targetComponent: componentSrc,
          targetProps: componentProps,
          termsDomainName,
          privacyDomainName,
        }}
      />
    </div>
  );
};

EmbedComponentPage.getLayout = useSimpleLayout;

export default EmbedComponentPage;
