import { useRouter } from 'next/router';
import { useContext } from 'react';

import { NearContext } from '@/components/WalletSelector';

import type { NextPageWithLayout } from '../types';

const signedOutRoute = (Component: NextPageWithLayout) => {
  const SignedOut = (props: NextPageWithLayout) => {
    const { signedAccountId } = useContext(NearContext);
    const router = useRouter();

    if (signedAccountId && router) {
      router.push('/');
    }
    return <Component {...props} />;
  };

  return SignedOut;
};

export default signedOutRoute;
