import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { RootContentContainer } from '@/components/RootContentContainer';
import { VmComponent } from '@/components/vm/VmComponent';
import { privacyDomainName, termsDomainName } from '@/config';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useGatewayEvents } from '@/hooks/useGatewayEvents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ViewComponentPage: NextPageWithLayout = () => {
  const router = useRouter();
  const componentSrc = `${router.query.accountId}/widget/${router.query.componentName}`;
  const [componentProps, setComponentProps] = useState<Record<string, unknown>>({});
  const { signIn, signOut, signedAccountId } = useWalletSelector();
  const components = useBosComponents();
  const { emitGatewayEvent, shouldPassGatewayEventProps } = useGatewayEvents();

  useEffect(() => {
    const { requestAuth } = componentProps;
    if (requestAuth && !signedAccountId) {
      signIn();
    }
  }, [signedAccountId, componentProps, signIn]);

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
          logOut: signOut,
          targetProps: componentProps,
          targetComponent: componentSrc,
          termsDomainName,
          privacyDomainName,
        }}
      />
    </RootContentContainer>
  );
};

ViewComponentPage.getLayout = useDefaultLayout;

export default ViewComponentPage;
