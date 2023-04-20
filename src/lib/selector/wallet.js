import * as nearAPI from 'near-api-js';

import BN from 'bn.js';

const networks = {
    mainnet: {
        networkId: 'mainnet',
        viewAccountId: 'near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org'
    },
    testnet: {
        networkId: 'testnet',
        viewAccountId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org'
    },
    localnet: {
        networkId: 'localnet',
        viewAccountId: 'test.near',
    }
}

export class FastAuthWallet {
    constructor({ signInContractId, networkId, ...rest }) {
        this.networkId = networkId
        this.signInContractId = signInContractId;
        this.activeAccountId = window.localStorage.getItem('fast-auth:activeAccountId');

        this.keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
        this.near = new nearAPI.Near({
            ...networks[networkId],
            deps: { keyStore: this.keyStore },
        });
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
        if (this.activeAccountId) return
        try {
            const accountCreationData = JSON.parse(window.localStorage.getItem('fast-auth:account-creation-data') || JSON.stringify({}));
            if (!accountCreationData.privateKey || !accountCreationData.accountId || !accountCreationData.isCreated) return;

            const keyPair = nearAPI.KeyPair.fromString(accountCreationData.privateKey);
            await this.keyStore.setKey(this.networkId, accountCreationData.accountId, keyPair);

            const accountObj = new nearAPI.Account(this.near.connection, accountCreationData.accountId);
            this._setActiveAccountId(accountCreationData.accountId);
            return [accountObj];


        } catch (e) {
            console.log('e: ', e)
        }
    }

    async signOut() {
        if (this.activeAccountId == undefined || this.activeAccountId == null) {
            throw new Error("Wallet is already signed out");
        }

        this.activeAccountId = undefined;
        await this.keyStore.removeKey(this.networkId, this.activeAccountId);
        localStorage.removeItem(`fast-auth:account-creation-data`);
    }

    async signAndSendTransaction(params) {

    }

    async signAndSendTransactions(params) {

    }

    showModal = () => {

    }

    async verifyOwner() {
        throw Error("FastAuth:verifyOwner is deprecated");
    }

    async getAvailableBalance(id) {
        return new BN(0);
    }

    async getAccounts() {
        if (this.activeAccountId != undefined && this.activeAccountId != null) {
            const accountObj = new nearAPI.Account(this.near.connection, this.activeAccountId);
            return [accountObj];
        }

        return []
    }

    async switchAccount(id) {
        this._setActiveAccountId(id);
    }

    _setActiveAccountId(accountId) {
        this.activeAccountId = accountId;
        window.localStorage.setItem('fast-auth:activeAccountId', accountId);
    }
}