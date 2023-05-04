import type { Network, NetworkId } from '@/utils/types';

const networks: Record<NetworkId, Network> = {
  mainnet: {
    networkId: 'mainnet',
    viewAccountId: 'near',
    nodeUrl: 'https://rpc.mainnet.near.org',
    walletUrl: 'https://wallet.near.org',
    helperUrl: 'https://helper.mainnet.near.org',
  },
  testnet: {
    networkId: 'testnet',
    viewAccountId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
  },
  localnet: {
    networkId: 'localnet',
    viewAccountId: 'test.near',
  },
};

export function useEnvironment() {
  const networkId: NetworkId = (process.env.NEXT_PUBLIC_NETWORK_ID as NetworkId) || 'testnet';
  const network = networks[networkId];
  const signInContractId = networkId === 'testnet' ? 'v1.social08.testnet' : 'social.near';

  return {
    network,
    networkId,
    signInContractId,
  };
}
