import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useAuthStore } from '@/stores/auth';

export function useSignInRedirect() {
  const router = useRouter();
  const vmNear = useAuthStore((store) => store.vmNear);

  const redirect = useCallback(
    (hardRefresh = false) => {
      if (!window) return;

      const url = localStorage.getItem('signInRedirectUrl') || '/';
      localStorage.removeItem('signInRedirectUrl');

      if (hardRefresh) {
        window.location.href = url; // We need to use hard refresh due to current Fast Auth implementation
      } else {
        router.replace(url);
      }
    },
    [router],
  );

  const saveCurrentUrl = useCallback(() => {
    if (!window) return;
    if (['/', '/signin', '/signup', '/verify-email', '/auth-callback'].includes(router.pathname)) return;
    localStorage.setItem('signInRedirectUrl', router.asPath);
  }, [router]);

  const requestAuthentication = useCallback(
    (createAccount = false) => {
      saveCurrentUrl();
      if (!vmNear) return;
      if (createAccount) {
        vmNear.selector
          .then((selector: any) => selector.wallet('fast-auth-wallet'))
          .then((fastAuthWallet: any) =>
            fastAuthWallet.signIn({
              contractId: vmNear.config.contractName,
              isRecovery: false,
            }),
          );
      } else {
        router.push('/signin');
      }
    },
    [router, saveCurrentUrl, vmNear],
  );

  return {
    redirect,
    requestAuthentication,
    saveCurrentUrl,
  };
}
