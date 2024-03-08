import * as http from '@/utils/http';
import useConnectWallet from './useConnectWallet';
import useAccount from './useAccount';
import useInititalDataWithAuth from './useInititalDataWithAuth';

export default function useAuthCheck({ isNeedAk, isQuiet }: { isNeedAk?: boolean; isQuiet?: boolean }) {
  const { account } = useAccount();
  const { onConnect } = useConnectWallet();
  const { getInitialDataWithAuth } = useInititalDataWithAuth();
  const check = async (cb?: any, quiet?: boolean) => {
    if (!account) {
      if (quiet !== undefined ? quiet : isQuiet) return;
      const result = await onConnect();
      if (result.length) cb?.();
      return;
    }
    if (!isNeedAk) {
      cb?.();
      return;
    }
    const result = window.localStorage.getItem(http.AUTH_TOKENS);
    const parsedResult = result ? JSON.parse(result) : {};
    if (parsedResult.access_token) {
      cb?.();
      return;
    }
    await getInitialDataWithAuth(account);
    cb?.();
  };

  return {
    check,
  };
}
