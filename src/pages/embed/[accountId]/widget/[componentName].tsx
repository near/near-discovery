import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { RootContentContainer } from '@/components/RootContentContainer';
import { VmComponent } from '@/components/vm/VmComponent';
import { privacyDomainName, termsDomainName } from '@/config';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useGatewayEvents } from '@/hooks/useGatewayEvents';
import { useSimpleLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const EmbedComponentPage: NextPageWithLayout = () => {
  const router = useRouter();
  const components = useBosComponents();
  const { wallet } = useWalletSelector();
  const componentSrc = `${router.query.accountId}/widget/${router.query.componentName}`;
  const [componentProps, setComponentProps] = useState<Record<string, unknown>>({});
  const { emitGatewayEvent, shouldPassGatewayEventProps } = useGatewayEvents();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    setComponentProps(params);
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
