import type { Network, NetworkId } from '@/utils/types';

const networks: Record<NetworkId, Network> = {
  mainnet: {
    networkId: 'mainnet',
    viewAccountId: 'near',
    nodeUrl: 'https://rpc.mainnet.near.org',
    walletUrl: 'https://wallet.near.org',
    helperUrl: 'https://helper.mainnet.near.org',
    fastAuth: {
      mpcRecoveryUrl: 'https://mpc-recovery-prod-7tk2cmmtcq-ue.a.run.app',
      authHelperUrl: 'https://api.kitwallet.app',
      accountIdSuffix: 'near',
    },
  },
  testnet: {
    networkId: 'testnet',
    viewAccountId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    fastAuth: {
      mpcRecoveryUrl: 'https://mpc-recovery-7tk2cmmtcq-ue.a.run.app',
      authHelperUrl: 'https://testnet-api.kitwallet.app',
      accountIdSuffix: 'testnet',
    },
  },
  localnet: {
    // these are defined by https://github.com/kurtosis-tech/near-package
    networkId: 'localnet',
    viewAccountId: 'test.near',
    nodeUrl: 'http://127.0.0.1:8332',
    walletUrl: 'http://127.0.0.1:8334',
    helperUrl: 'http://127.0.0.1:8330',
  },
};

export function useEnvironment() {
  const networkId: NetworkId = (process.env.NEXT_PUBLIC_NETWORK_ID as NetworkId) || 'testnet';
  const network = networks[networkId];
  const signInContractId = networkId === 'testnet' ? 'v1.social08.testnet' : 'social.near';

  return {
    network,
    networks,
    networkId,
    signInContractId,
  };
}
