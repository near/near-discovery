import type { EIP1193Provider } from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import ledgerModule from '@web3-onboard/ledger';
import { init, useConnectWallet } from '@web3-onboard/react';
import walletConnectModule from '@web3-onboard/walletconnect';
import { useEffect, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';

import icon from '@/assets/images/near_social_icon.svg';

const web3onboardKey = 'web3-onboard:connectedWallets';

const wcV2InitOptions: any = {
  version: 2,
  // TODO: add proper `projectId`
  projectId: '',
  requiredChains: [1, 56],
};

const walletConnect = walletConnectModule(wcV2InitOptions);
const ledger = ledgerModule();
const injected = injectedModule();

// initialize Onboard
export const onboard = init({
  wallets: [injected, walletConnect, ledger],
  chains: [
    {
      id: 1,
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: 'https://rpc.ankr.com/eth',
    },
    {
      id: 3,
      token: 'ETH',
      label: 'Ropsten - Ethereum Testnet',
      rpcUrl: 'https://rpc.ankr.com/eth_ropsten',
    },
    {
      id: 5,
      token: 'ETH',
      label: 'Goerli - Ethereum Testnet',
      rpcUrl: 'https://rpc.ankr.com/eth_goerli',
    },
    {
      id: '0x4e454152',
      token: 'ETH',
      label: 'Aurora Mainnet',
      rpcUrl: 'https://mainnet.aurora.dev',
    },
    {
      id: 137,
      token: 'MATIC',
      label: 'Matic Mainnet',
      rpcUrl: 'https://rpc.ankr.com/polygon',
    },
    {
      id: 324,
      token: 'ETH',
      label: 'zkSync',
      rpcUrl: 'https://zksync2-mainnet.zksync.io',
    },
    {
      id: 56,
      token: 'BNB',
      label: 'Binance Smart Chain Mainnet',
      rpcUrl: 'https://bsc.publicnode.com',
    },
    {
      id: 42161,
      token: 'ETH',
      label: 'Arbitrum One Mainnet',
      rpcUrl: 'https://endpoints.omniatech.io/v1/arbitrum/one/public',
    },
  ],
  appMetadata: {
    name: 'NEAR',
    icon: icon.content,
    description: 'NEAR - BOS',
  },
  theme: 'dark',
  containerElements: {
    // connectModal: '#near-social-navigation-bar',
    // accountCenter: "#near-social-web3-account",
  },
});

type EthersProviderContext = {
  provider?: EIP1193Provider;
  useConnectWallet: typeof useConnectWallet;
};

const defaultEthersProviderContext: EthersProviderContext = { useConnectWallet };

export const useEthersProviderContext = singletonHook(defaultEthersProviderContext, () => {
  const [{ wallet }] = useConnectWallet();
  const [ethersProvider, setEthersProvider] = useState(defaultEthersProviderContext);

  useEffect(() => {
    (async () => {
      if (typeof localStorage === 'undefined') return;

      const walletsSub = onboard.state.select('wallets');

      // TODO: do we need to unsubscribe?
      // const { unsubscribe } = walletsSub.subscribe((wallets) => {
      walletsSub.subscribe((wallets) => {
        const connectedWallets = wallets.map(({ label }) => label);
        localStorage.setItem(web3onboardKey, JSON.stringify(connectedWallets));
      });

      const previouslyConnectedWallets = JSON.parse(localStorage.getItem(web3onboardKey) || '[]');

      if (previouslyConnectedWallets) {
        // You can also auto connect "silently" and disable all onboard modals to avoid them flashing on page load
        await onboard.connectWallet({
          autoSelect: {
            label: previouslyConnectedWallets[0],
            disableModals: true,
          },
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (!wallet) return;

    setEthersProvider({
      provider: wallet.provider,
      useConnectWallet,
    });
  }, [wallet]);

  return ethersProvider;
});
