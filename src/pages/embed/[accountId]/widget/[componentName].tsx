import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { RootContentContainer } from '@/components/lib/Container';
import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useGatewayEvents } from '@/hooks/useGatewayEvents';
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
  const { emitGatewayEvent, shouldPassGatewayEventProps } = useGatewayEvents();

  useEffect(() => {
    setComponentSrc(componentSrc);
  }, [setComponentSrc, componentSrc]);

  useEffect(() => {
    setComponentProps(router.query);
  }, [router.query]);

  return (
    <RootContentContainer>
      <VmComponent
        key={components.wrapper}
        src={components.wrapper}
        props={{
          emitGatewayEvent: shouldPassGatewayEventProps(router.query.accountId as string)
            ? emitGatewayEvent
            : undefined,
          logOut: authStore.logOut,
          targetComponent: componentSrc,
          targetProps: componentProps,
          termsDomainName,
          privacyDomainName,
        }}
      />
    </RootContentContainer>
  );
};

EmbedComponentPage.getLayout = useSimpleLayout;

export default EmbedComponentPage;
