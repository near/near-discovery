import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { checkAddressIsInvited, getAccessToken, insertedAccessKey } from '@/apis';
import { useEthersProviderContext } from '@/data/web3';
import * as http from '@/utils/http';
const useAuth = () => {
  const { useConnectWallet } = useEthersProviderContext();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [logging, setLogging] = useState(false);
  const router = useRouter();
  const logout = async () => {
    wallet && (await disconnect(wallet));
    window.localStorage.setItem(http.AUTH_TOKENS, '{}');
    insertedAccessKey('');
    deleteCookie('LOGIN_ACCOUNT');
    deleteCookie('AUTHED_ACCOUNT');
    router.replace(`/login?source=/`);
  };

  const login = useCallback(
    async (cb?: VoidFunction) => {
      if (!wallet || !wallet.accounts[0].address) {
        setLogging(false);
        return;
      }
      const cachedAccount = getCookie('AUTHED_ACCOUNT');
      setCookie('LOGIN_ACCOUNT', wallet.accounts[0].address);
      if (cachedAccount !== wallet.accounts[0].address) {
        setLogging(true);
        try {
          const checked = await checkAddressIsInvited(wallet.accounts[0].address);
          if (!checked) {
            deleteCookie('AUTHED_ACCOUNT');
            router.replace('/invite-code');
            return;
          }
          await getAccessToken(wallet.accounts[0].address);
          setLogging(false);
          setCookie('AUTHED_ACCOUNT', wallet.accounts[0].address);
          cb?.();
        } catch (error) {
          setLogging(false);
        }
      } else {
        setLogging(false);
        cb?.();
      }
      if (router.pathname === '/login' || router.pathname === '/invite-code') {
        router.replace((router.query?.source as string) || '/');
      }
    },
    [wallet],
  );

  return { login, connect, logout, logging, connecting };
};

export default useAuth;
