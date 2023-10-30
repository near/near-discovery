import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAccount from './useAccount';
import { useEthersProviderContext } from '@/data/web3';
import * as http from '@/utils/http';
import { getAccessToken, insertedAccessKey } from '@/apis';
import { setCookie, deleteCookie } from 'cookies-next';

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
    deleteCookie('AUTHED_ACCOUNT');
    router.replace(`/login?source=/`);
  };

  const login = useCallback(
    async (cb: () => void) => {
      if (!account) return;
      setLogging(true);
      try {
        await getAccessToken(account);
        setLogging(false);
        setCookie('AUTHED_ACCOUNT', account);
        cb();
      } catch (error) {
        setLogging(false);
      }
    },
    [account],
  );

  useEffect(() => {
    if (account) {
      setCookie('LOGIN_ACCOUNT', account);
    } else {
      deleteCookie('LOGIN_ACCOUNT');
    }
  }, [account]);

  return { login, connect, logout, logging, connecting };
};

export default useAuth;
