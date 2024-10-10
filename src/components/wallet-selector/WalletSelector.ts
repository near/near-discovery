import { setupKeypom } from '@keypom/selector';
import { setupBitteWallet } from '@near-wallet-selector/bitte-wallet';
import type { FinalExecutionOutcome, WalletSelector, WalletSelectorState } from '@near-wallet-selector/core';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupEthereumWallets } from '@near-wallet-selector/ethereum-wallets';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupMintbaseWallet } from '@near-wallet-selector/mintbase-wallet';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupNearMobileWallet } from '@near-wallet-selector/near-mobile-wallet';
import { setupNeth } from '@near-wallet-selector/neth';
import { setupNightly } from '@near-wallet-selector/nightly';
import { setupSender } from '@near-wallet-selector/sender';
import { setupWelldoneWallet } from '@near-wallet-selector/welldone-wallet';
import { providers, utils } from 'near-api-js';
import { setupFastAuthWallet } from 'near-fastauth-wallet';
import type { Context } from 'react';
import { createContext } from 'react';

import { networkId as defaultNetwork, signInContractId } from '@/config';
import { KEYPOM_OPTIONS } from '@/utils/keypom-options';
import type { NetworkId } from '@/utils/types';

import { wagmiConfig, web3Modal } from './web3modal';

const THIRTY_TGAS = '30000000000000';
const NO_DEPOSIT = '0';

export class Wallet {
  private createAccessKeyFor?: string;
  private networkId: NetworkId;
  selector: Promise<WalletSelector>;

  constructor({
    networkId = defaultNetwork,
    createAccessKeyFor = undefined,
  }: {
    networkId: NetworkId;
    createAccessKeyFor?: string;
  }) {
    this.createAccessKeyFor = createAccessKeyFor;
    this.networkId = networkId;
  }

  startUp = async (accountChangeHook: (account: string) => void) => {
    this.selector = setupWalletSelector({
      network: this.networkId,
      modules: [
        setupEthereumWallets({ wagmiConfig, web3Modal: web3Modal as any, alwaysOnboardDuringSignIn: true }),
        setupMeteorWallet(),
        setupBitteWallet(),
        setupHereWallet(),
        setupMyNearWallet(),
        setupSender(),
        setupMintbaseWallet(),
        setupNeth({
          gas: '300000000000000',
          bundle: false,
        }),
        setupNightly(),
        setupWelldoneWallet(),
        setupFastAuthWallet({
          walletUrl:
            this.networkId === 'testnet'
              ? 'https://wallet.testnet.near.org/fastauth'
              : 'https://wallet.near.org/fastauth',
          relayerUrl:
            this.networkId === 'testnet'
              ? 'http://34.70.226.83:3030/relay'
              : 'https://near-relayer-mainnet.api.pagoda.co/relay',
        }),
        setupKeypom({
          trialAccountSpecs: {
            url:
              this.networkId === 'testnet'
                ? 'https://test.near.org/#trial-url/ACCOUNT_ID/SECRET_KEY'
                : 'https://dev.near.org/#trial-url/ACCOUNT_ID/SECRET_KEY',
            modalOptions: KEYPOM_OPTIONS(this.networkId),
          },
          instantSignInSpecs: {
            url:
              this.networkId == 'testnet'
                ? 'https://test.near.org/#instant-url/ACCOUNT_ID/SECRET_KEY/MODULE_ID'
                : 'https://dev.near.org/#instant-url/ACCOUNT_ID/SECRET_KEY/MODULE_ID',
          },
          networkId: this.networkId,
          signInContractId,
        }) as any, // TODO: Refactor setupKeypom() to TS
        setupLedger(),
        setupNearMobileWallet(),
      ],
    });

    const walletSelector = await this.selector;
    const isSignedIn = walletSelector.isSignedIn();
    const accountId = isSignedIn ? walletSelector.store.getState().accounts[0].accountId : '';

    walletSelector.store.observable.subscribe(async (state: WalletSelectorState) => {
      const signedAccount = state?.accounts.find((account: { active: boolean }) => account.active)?.accountId;
      accountChangeHook(signedAccount || '');
    });

    return accountId;
  };

  signIn = async () => {
    const modal = setupModal(await this.selector, { contractId: this.createAccessKeyFor || '' });
    modal.show();
  };

  signOut = async () => {
    const selectedWallet = await (await this.selector).wallet();
    selectedWallet.signOut();
  };

  viewMethod = async ({ contractId, method, args = {} }: { contractId: string; method: string; args?: object }) => {
    const url = `https://rpc.${this.networkId}.near.org`;
    const provider = new providers.JsonRpcProvider({ url });

    const res: any = await provider.query({
      request_type: 'call_function',
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
      finality: 'optimistic',
    });
    return JSON.parse(Buffer.from(res.result).toString());
  };

  callMethod = async ({
    contractId,
    method,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT,
  }: {
    contractId: string;
    method: string;
    args?: object;
    gas?: string;
    deposit?: string;
  }) => {
    // Sign a transaction with the "FunctionCall" action
    const selectedWallet = await (await this.selector).wallet();
    const outcome = await selectedWallet.signAndSendTransaction({
      receiverId: contractId,
      actions: [
        {
          type: 'FunctionCall',
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });

    return providers.getTransactionLastResult(outcome as FinalExecutionOutcome);
  };

  getTransactionResult = async (txhash: string) => {
    const walletSelector = await this.selector;
    const { network } = walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve transaction result from the network
    const transaction = await provider.txStatus(txhash, 'unnused');
    return providers.getTransactionLastResult(transaction);
  };

  getBalance = async (accountId: string, format = true) => {
    const walletSelector = await this.selector;
    const { network } = walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve account state from the network
    const account: any = await provider.query({
      request_type: 'view_account',
      account_id: accountId,
      finality: 'final',
    });
    // return amount on NEAR
    if (format) {
      return account.amount ? Number(utils.format.formatNearAmount(account.amount)) : 0;
    } else {
      return account.amount || 0;
    }
  };

  signAndSendTransactions = async ({ transactions }: { transactions: any[] }) => {
    const selectedWallet = await (await this.selector).wallet();
    return selectedWallet.signAndSendTransactions({ transactions });
  };

  getAccessKeys = async (accountId: string) => {
    const walletSelector = await this.selector;
    const { network } = walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve account state from the network
    const keys: any = await provider.query({
      request_type: 'view_access_key_list',
      account_id: accountId,
      finality: 'final',
    });
    return keys.keys;
  };
}

export const NearContext: Context<{ wallet: Wallet | undefined; signedAccountId: string }> = createContext({
  wallet: undefined as Wallet | undefined,
  signedAccountId: '',
});
