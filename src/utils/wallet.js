import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupNeth } from '@near-wallet-selector/neth';
import { setupNightly } from '@near-wallet-selector/nightly';
import { setupSender } from '@near-wallet-selector/sender';
import { setupWelldoneWallet } from '@near-wallet-selector/welldone-wallet';
import { setupKeypom } from 'keypom-js';

import { setupFastAuth } from '@/lib/selector/setup';
import { networkId, signInContractId } from '@/utils/config';
import { KEYPOM_OPTIONS } from '@/utils/keypom-options';

export const walletSelector = () => setupWalletSelector(walletSelectorParams);

const options = {
  // successUrl: 'http://localhost:3000'
};

const walletSelectorParams = {
  network: networkId,
  modules: [
    setupNearWallet(options),
    setupMyNearWallet(options),
    setupSender(options),
    setupHereWallet(options),
    setupMeteorWallet(options),
    setupNeth({
      ...options,
      gas: '300000000000000',
      bundle: false,
    }),
    setupNightly(options),
    setupWelldoneWallet(options),
    setupFastAuth({
      ...options,
      networkId,
      signInContractId,
      relayerUrl:
        networkId === 'testnet' ? 'http://34.70.226.83:3030/relay' : 'https://near-relayer-mainnet.api.pagoda.co/relay',
    }), // TODO: Refactor setupFastAuth() to TS
    setupKeypom({
      ...options,
      trialBaseUrl: networkId == 'testnet' ? 'https://test.near.org/#trial-url/' : 'https://near.org/#trial-url/',
      networkId,
      trialSplitDelim: '/',
      signInContractId,
      modalOptions: KEYPOM_OPTIONS(networkId),
    }), // TODO: Refactor setupKeypom() to TS
  ],
};
