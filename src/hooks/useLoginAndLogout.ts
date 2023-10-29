import { useCallback, useEffect, useState } from 'react';
import useAccount from './useAccount';
import { useEthersProviderContext } from '@/data/web3';
import * as http from '@/utils/http';
import { setCookie, getCookie } from 'cookies-next';
import { checkAddressIsInvited, getAccessToken, insertedAccessKey } from '@/apis';
import { LOGINED_ACCOUNT } from '@/config/constants';

const useLoginAndLogout = () => {
  const { account } = useAccount();
  const { useConnectWallet } = useEthersProviderContext();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [isInvited, setIsInvited] = useState(false);
  const [logging, setLogging] = useState(false);
  const [logged, setLogged] = useState(false);

  const login = useCallback(async () => {
    if (!account) return;
    setLogging(true);
    const invited = await checkAddressIsInvited(account);
    setIsInvited(invited);

    if (invited) {
      try {
        await getAccessToken(account);
        window.localStorage.setItem(LOGINED_ACCOUNT, account);
        setCookie(LOGINED_ACCOUNT, account);
        setLogged(true);
      } catch (error) {
        setLogged(false);
      }
    }
    setLogging(false);
  }, [account]);

  const logout = () => {
    window.localStorage.setItem(LOGINED_ACCOUNT, '');
    window.localStorage.setItem(http.AUTH_TOKENS, '{}');
    insertedAccessKey('');
    setCookie(LOGINED_ACCOUNT, '');
    setLogged(false);
  };

  useEffect(() => {
    if (account) {
      if (account.toLocaleUpperCase() !== getCookie(LOGINED_ACCOUNT)?.toLocaleUpperCase()) {
        // if changed account in wallet
        logout();
      }
      login();
    } else {
      logout();
    }
  }, [account, connecting]);

  const connectAndlogin = useCallback(async () => {
    await connect();
  }, [connect]);

  const disconnectAndlogout = useCallback(async () => {
    wallet && (await disconnect(wallet));
  }, [disconnect, wallet]);

  return { login, connectAndlogin, disconnectAndlogout, connecting, isInvited, logging, logged };
};

export default useLoginAndLogout;
