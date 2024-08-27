import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import { RootContentContainer } from '@/components/RootContentContainer';
import { VmComponent } from '@/components/vm/VmComponent';
import { NearContext } from '@/components/WalletSelector';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useGatewayEvents } from '@/hooks/useGatewayEvents';
import { useSimpleLayout } from '@/hooks/useLayout';
import { useCurrentComponentStore } from '@/stores/current-component';
import { privacyDomainName, termsDomainName } from '@/utils/config';
import type { NextPageWithLayout } from '@/utils/types';

const EmbedComponentPage: NextPageWithLayout = () => {
  const router = useRouter();
  const components = useBosComponents();
  const { wallet } = useContext(NearContext);
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
          logOut: wallet?.signOut,
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
