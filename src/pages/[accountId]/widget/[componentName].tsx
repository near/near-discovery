import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { RootContentContainer } from '@/components/RootContentContainer';
import { VmComponent } from '@/components/vm/VmComponent';
import { NearContext } from '@/components/wallet-selector/WalletSelector';
import { privacyDomainName, termsDomainName } from '@/config';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useGatewayEvents } from '@/hooks/useGatewayEvents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import type { NextPageWithLayout } from '@/utils/types';

const ViewComponentPage: NextPageWithLayout = () => {
  const router = useRouter();
  const componentSrc = `${router.query.accountId}/widget/${router.query.componentName}`;
  const [componentProps, setComponentProps] = useState<Record<string, unknown>>({});
  const { wallet, signedAccountId } = useContext(NearContext);
  const components = useBosComponents();
  const { requestAuthentication } = useSignInRedirect();
  const { emitGatewayEvent, shouldPassGatewayEventProps } = useGatewayEvents();

  useEffect(() => {
    const { requestAuth, createAccount } = componentProps;
    if (requestAuth && !signedAccountId) {
      requestAuthentication(!!createAccount);
    }
  }, [signedAccountId, componentProps, requestAuthentication]);

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
