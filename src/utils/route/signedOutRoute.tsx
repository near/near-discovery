import { useAuthStore } from '@/stores/auth';
import type { NextComponentType } from 'next';
import { useRouter } from 'next/router';

const signedOutRoute = (Component: NextComponentType) => {
  const SignedOut = (props: any) => {
    const signedIn = useAuthStore((store) => store.signedIn);
    const router = useRouter();

    if (signedIn && router) {
      router.push('/');
    }
    return <Component {...props} />;
  };

  return SignedOut;
};

export default signedOutRoute;
