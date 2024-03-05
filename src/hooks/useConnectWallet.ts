import { insertedAccessKey } from '@/apis';
import { useEthersProviderContext } from '@/data/web3';
import * as http from '@/utils/http';

const useConnectWallet = () => {
  const { useConnectWallet } = useEthersProviderContext();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const onConnect = async () => {
    return await connect();
  };

  const onDisconnect = async () => {
    wallet && (await disconnect(wallet));
    window.localStorage.setItem(http.AUTH_TOKENS, '{}');
    insertedAccessKey('');
  };

  return { connecting, onConnect, onDisconnect };
};

export default useConnectWallet;
