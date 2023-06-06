import * as nearAPI from 'near-api-js';
import { createAction } from '@near-wallet-selector/wallet-utils';

const {
  transactions: { encodeSignedDelegate },
} = nearAPI;

import BN from 'bn.js';

import { networks } from '@/utils/config';

export class FastAuthWallet {
  constructor({ signInContractId, networkId, relayerUrl }) {
    this.networkId = networkId;
    this.signInContractId = signInContractId;
    this.activeAccountId = window.localStorage.getItem('fast-auth:activeAccountId') || '';

    this.keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
    this.near = new nearAPI.Near({
      ...networks[networkId],
      deps: { keyStore: this.keyStore },
    });
    this.relayerUrl = relayerUrl;
  }

  getContractId() {
    return this.signInContractId;
  }

  getAccountId() {
    return this.activeAccountId;
  }

  async isSignedIn() {
    return !!this.activeAccountId;
  }

  async signIn() {
    if (this.activeAccountId) return;

    const accountCreationData = JSON.parse(
      window.localStorage.getItem('fast-auth:account-creation-data') || JSON.stringify({}),
    );

    try {
      if (!accountCreationData.limitedAccessKey || !accountCreationData.isCreated) {
        return;
      }

      const keyPair = nearAPI.KeyPair.fromString(accountCreationData.limitedAccessKey);
      await this.keyStore.setKey(this.networkId, accountCreationData.accountId, keyPair);

      const accountObj = new nearAPI.Account(this.near.connection, accountCreationData.accountId);

      this._setActiveAccountId(accountCreationData.accountId);
      return [accountObj];
    } catch (e) {
      console.log('>>>>>>>>>>>>>>>>>>>>>', 'signing in ERROR', e);
    }
  }

  async signOut() {
    if (this.activeAccountId === undefined || this.activeAccountId === null) {
      throw new Error('Wallet is already signed out');
    }

    this.activeAccountId = undefined;
    await this.keyStore.removeKey(this.networkId, this.activeAccountId);
    localStorage.removeItem(`fast-auth:account-creation-data`);
    localStorage.removeItem('fast-auth:activeAccountId');
  }

  assertValidSigner(signerId) {
    if (signerId && signerId !== this.activeAccountId) {
      throw new Error(`Cannot sign transactions for ${signerId} while signed in as ${this.activeAccountId}`);
    }
  }

  async signAndSendTransaction({ receiverId, actions, signerId }) {
    this.assertValidSigner(signerId);

    const account = (await this.getAccounts())[0];

    const signedDelegate = await account.signedDelegate({
      actions: actions.map((action) => createAction(action)),
      blockHeightTtl: 60,
      receiverId,
    });

    await fetch(this.relayerUrl, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(Array.from(encodeSignedDelegate(signedDelegate))),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
  }

  async signAndSendTransactions(transactions) {
    for (let { signerId } of transactions) {
      this.assertValidSigner(signerId);
    }

    for (let { receiverId, signerId, actions } of transactions) {
      await this.signAndSendTransaction({ receiverId, signerId, actions });
    }
  }

  showModal = () => {
    // unused
  };

  async verifyOwner() {
    throw Error('FastAuth:verifyOwner is unsupported!');
  }

  async getAvailableBalance() {
    return new BN(0);
  }

  async getAccounts() {
    if (this.activeAccountId !== undefined && this.activeAccountId !== null) {
      const accountObj = new nearAPI.Account(this.near.connection, this.activeAccountId);
      return [accountObj];
    }

    return [];
  }

  async switchAccount(id) {
    this._setActiveAccountId(id);
  }

  _setActiveAccountId(accountId) {
    this.activeAccountId = accountId;
    window.localStorage.setItem('fast-auth:activeAccountId', accountId);
  }
}
