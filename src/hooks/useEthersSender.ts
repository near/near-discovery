import { ethers } from 'ethers';
import React, { useEffect,useState } from 'react';

import { useEthersProviderContext } from '@/data/web3';

const useEthersSender = () => {
  const ethersProviderContext = useEthersProviderContext();

  const { provider, useConnectWallet } = ethersProviderContext;

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [sender, setSender] = useState<string>('');

  useEffect(() => {
    if (!wallet || !provider) return;

    const etherProvider = new ethers.providers.Web3Provider(window.ethereum);

    etherProvider.send('eth_requestAccounts', []).then((accounts) => {
      const currentAccount = accounts[0];
      const originalCaseAddress = ethers.utils.getAddress(currentAccount);

      setSender(originalCaseAddress.toString());
    });
  }, [wallet, provider]);

  return {
    provider,
    wallet,
    connect,
    sender,
  };
};

export default useEthersSender;
