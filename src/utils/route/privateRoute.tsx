import type { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { NearContext } from '@/components/wallet-selector/WalletSelector';

const privateRoute = (Component: NextComponentType) => {
  const Private = (props: any) => {
    const { signedAccountId } = useContext(NearContext);
    const router = useRouter();

    if (!signedAccountId && router) {
      // `signin` or `signup`?
      router.push('/signup');
    }
    return <Component {...props} />;
  };

  return Private;
};

export default privateRoute;
