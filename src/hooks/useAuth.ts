import { deleteCookie, getCookie,setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { checkAddressIsInvited,getAccessToken, insertedAccessKey } from '@/apis';
import { useEthersProviderContext } from '@/data/web3';
import * as http from '@/utils/http';

import useAccount from './useAccount';

const useAuth = () => {
  const { account } = useAccount();
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

  const login = useCallback(async () => {
    if (!account) {
      setLogging(false);
      return;
    }
    const cachedAccount = getCookie('AUTHED_ACCOUNT');
    setCookie('LOGIN_ACCOUNT', account);
    if (cachedAccount !== account) {
      setLogging(true);
      try {
        const checked = await checkAddressIsInvited(account);
        if (!checked) {
          deleteCookie('AUTHED_ACCOUNT');
          router.replace('/invite-code');
          return;
        }
        await getAccessToken(account);
        setLogging(false);
        setCookie('AUTHED_ACCOUNT', account);
      } catch (error) {
        setLogging(false);
      }
    } else {
      setLogging(false);
    }
    if (router.pathname === '/login' || router.pathname === '/invite-code') {
      router.replace((router.query?.source as string) || '/');
    }
  }, [account]);

  return { login, connect, logout, logging, connecting };
};

export default useAuth;
