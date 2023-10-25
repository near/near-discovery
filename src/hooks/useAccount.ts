import { useMemo } from 'react';
import { useConnectWallet } from '@web3-onboard/react';

export default function useAccount() {
  const [{ wallet }] = useConnectWallet();

  return useMemo<{ chainId?: number; account?: string }>(() => {
    if (wallet?.accounts?.length && wallet?.chains?.length) {
      return { account: wallet.accounts[0].address, chainId: Number(wallet.chains[0].id) };
    }
    return {};
  }, [wallet]);
}
