import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { useRouter } from 'next/router';

import type { NextPageWithLayout } from '../types';

const signedOutRoute = (Component: NextPageWithLayout) => {
  const SignedOut = (props: NextPageWithLayout) => {
    const { signedAccountId } = useWalletSelector();
    const router = useRouter();

    if (signedAccountId && router) {
      router.push('/');
    }
    return <Component {...props} />;
  };

  return SignedOut;
};

export default signedOutRoute;
