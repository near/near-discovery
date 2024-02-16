import { useConnectWallet } from '@web3-onboard/react';
import { ethers } from 'ethers';
import { useMemo } from 'react';

import chains from '@/config/chains';

export default function useAccount() {
  const [{ wallet }] = useConnectWallet();

  return useMemo<{ chainId?: number; account?: string; provider?: any }>(() => {
    if (wallet?.accounts?.length && wallet?.chains?.length) {
      return {
        account: wallet.accounts[0].address,
        chainId: Number(wallet.chains[0].id),
        provider: new ethers.providers.Web3Provider(wallet.provider, 'any'),
        chain: chains[Number(wallet.chains[0].id)],
      };
    }
    return {};
  }, [wallet]);
}
