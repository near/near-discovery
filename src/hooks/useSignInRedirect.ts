import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useContext } from 'react';

import { NearContext } from '@/components/WalletSelector';
import { signInContractId } from '@/utils/config';

export function useSignInRedirect() {
  const router = useRouter();
  const { wallet } = useContext(NearContext);

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
      if (!wallet) return;
      wallet.selector
        .then((selector: any) => selector.wallet('fast-auth-wallet'))
        .then((fastAuthWallet: any) =>
          fastAuthWallet.signIn({
            contractId: signInContractId,
            isRecovery: !createAccount,
          }),
        );
    },
    [saveCurrentUrl, wallet],
  );

  return {
    redirect,
    requestAuthentication,
    saveCurrentUrl,
  };
}
