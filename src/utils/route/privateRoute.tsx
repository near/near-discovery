import { useWalletSelector } from '@near-wallet-selector/react-hook';
import type { NextComponentType } from 'next';
import { useRouter } from 'next/router';

const privateRoute = (Component: NextComponentType) => {
  const Private = (props: any) => {
    const { signedAccountId } = useWalletSelector();
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
