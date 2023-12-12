import { useState } from 'react';
import useAccount from '@/hooks/useAccount';
import { omit } from 'lodash';
import type { Chain } from '@/types';

export default () => {
  const [switching, setSwitching] = useState(false);
  const { provider } = useAccount();
  const switchNetwork = async (chain: Chain) => {
    try {
      setSwitching(true);
      await provider.send('wallet_switchEthereumChain', [{ chainId: `0x${chain.chainId.toString(16)}` }]);
      setSwitching(false);
    } catch (switchError: any) {
      if (switchError?.code !== 4902) {
        setSwitching(false);
        return;
      }
      try {
        await provider.send('wallet_addEthereumChain', [
          {
            ...omit(chain,"blockExplorers","icon"),
            blockExplorerUrls: [chain.blockExplorers],
            chainId: `0x${chain.chainId.toString(16)}`,
            iconUrls: [chain.icon]
          },
        ]);
        setSwitching(false);
      } catch (error) {
        console.error('Failed to setup the network in Metamask:', error);
        setSwitching(false);
      }
    }
  };

  return { switching, switchNetwork };
};
