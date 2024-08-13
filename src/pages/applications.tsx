import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { NearContext } from '@/components/WalletSelector';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import type { NextPageWithLayout } from '@/utils/types';

const ApplicationsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const router = useRouter();
  const { requestAuthentication } = useSignInRedirect();
  const { signedAccountId } = useContext(NearContext);

  useEffect(() => {
    const { requestAuth, createAccount } = router.query;
    if (requestAuth && !signedAccountId) {
      requestAuthentication(!!createAccount);
    }
  }, [signedAccountId, requestAuthentication, router.query]);

  return (
    <ComponentWrapperPage
      src={components.applicationsPage}
      meta={{ title: 'NEAR | Applications', description: 'Featured applications built on NEAR' }}
    />
  );
};

ApplicationsPage.getLayout = useDefaultLayout;

export default ApplicationsPage;
