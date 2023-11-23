import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import useAccount from './useAccount';
import { useEthersProviderContext } from '@/data/web3';
import * as http from '@/utils/http';
import { getAccessToken, insertedAccessKey, checkAddressIsInvited } from '@/apis';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';

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
      deleteCookie('LOGIN_ACCOUNT');
      return;
    }
    const cachedAccount = getCookie('AUTHED_ACCOUNT');

    if (cachedAccount !== account) {
      setCookie('LOGIN_ACCOUNT', account);
      setLogging(true);
      try {
        const checked = await checkAddressIsInvited(account);
        if (!checked) {
          deleteCookie('AUTHED_ACCOUNT');
          return;
        }
        await getAccessToken(account);
        setLogging(false);
        setCookie('AUTHED_ACCOUNT', account);
      } catch (error) {
        setLogging(false);
      }
    }
    if (router.pathname === '/login' || router.pathname === '/invite-code') {
      router.replace((router.query?.source as string) || '/');
    }
  }, [account]);

  return { login, connect, logout, logging, connecting };
};

export default useAuth;
