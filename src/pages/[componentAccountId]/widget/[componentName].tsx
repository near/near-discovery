import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { RootContentContainer } from '@/components/lib/Container';
import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';
import { useCurrentComponentStore } from '@/stores/current-component';
import { privacyDomainName, termsDomainName } from '@/utils/config';
import type { NextPageWithLayout } from '@/utils/types';

const ViewComponentPage: NextPageWithLayout = () => {
  const router = useRouter();
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);
  const componentSrc = `${router.query.componentAccountId}/widget/${router.query.componentName}`;
  const [componentProps, setComponentProps] = useState<Record<string, unknown>>({});
  const authStore = useAuthStore();
  const components = useBosComponents();
  const { requestAuthentication } = useSignInRedirect();

  useEffect(() => {
    const { requestAuth, createAccount } = componentProps;
    if (requestAuth && !authStore.account) {
      requestAuthentication(!!createAccount);
    }
  }, [authStore, componentProps, requestAuthentication]);

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
          logOut: authStore.logOut,
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
