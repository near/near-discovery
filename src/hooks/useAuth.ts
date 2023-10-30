import { useCallback, useEffect, useState } from 'react';
import useAccount from './useAccount';
import { useEthersProviderContext } from '@/data/web3';
import * as http from '@/utils/http';
import { getAccessToken, insertedAccessKey } from '@/apis';

const useAuth = () => {
  const { account } = useAccount();
  const { useConnectWallet } = useEthersProviderContext();
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const [logging, setLogging] = useState(false);

  const logout = async () => {
    wallet && (await disconnect(wallet));
    window.localStorage.setItem(http.AUTH_TOKENS, '{}');
    insertedAccessKey('');
  };

  const login = useCallback(async () => {
    if (!account) return;
    setLogging(true);
    try {
      await getAccessToken(account);
      setLogging(false);
    } catch (error) {
      setLogging(false);
    }
  }, [account]);

  useEffect(() => {
    account && login();
  }, [account]);

  return { login, connect, logout, logging };
};

export default useAuth;
