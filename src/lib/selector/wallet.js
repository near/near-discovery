import * as nearAPI from 'near-api-js';

import BN from 'bn.js';
import { NetworkId } from '../../data/widgets';

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
    constructor({ signInContractId, networkId }) {
        console.log('Fastauth constructor called.', signInContractId, networkId);
        this.networkId = networkId
        this.signInContractId = signInContractId;
        this.activeAccountId = window.localStorage.getItem('fast-auth:activeAccountId');

        this.keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
        this.near = new nearAPI.Near({
            ...networks[networkId],
            deps: { keyStore: this.keyStore },
        });
        console.log("finished constructor");
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
        console.log("signIn called");
        // If the user is already signed in, return the account

        // // Check if the account ID and secret key are valid and sign in accordingly
        try {
            const accountCreationData = JSON.parse(window.localStorage.getItem('fast-auth:account-creation-data') || JSON.stringify({}));
            if (!accountCreationData.privateKey || !accountCreationData.accountId || !accountCreationData.isCreated) return;

            console.log('Signing user in ', accountCreationData)

            const keyPair = nearAPI.KeyPair.fromString(accountCreationData.privateKey);
            console.log(keyPair)
            await this.keyStore.setKey(NetworkId, accountCreationData.accountId, keyPair);
            const accountObj = new nearAPI.Account(this.near.connection, accountCreationData.accountId);
            console.log(accountObj)
            this._setActiveAccountId(accountCreationData.accountId);
            return [accountObj];


        } catch (e) {
            console.log('e: ', e)
        }
    }

    // The URL is invalid or the trial info is incorrect. We should check local storage:
    // const curEnvData = getLocalStorageKeypomEnv();
    //     console.log('trial info invalid. Cur env data: ', curEnvData)

    // // If there is any
    // if(curEnvData != null) {
    // const { accountId, secretKey } = JSON.parse(curEnvData);
    // return this.internalSignIn(accountId, secretKey);

    // Invalid local storage info so return nothing
    // return []

    async signOut() {
        // if (this.trialAccountId == undefined || this.trialAccountId == null) {
        //     throw new Error("Wallet is already signed out");
        // }

        // this.trialAccountId = this.trialAccountId = this.trialSecretKey = undefined;
        // await this.keyStore.removeKey(this.networkId, this.trialAccountId!);
        // localStorage.removeItem(`${KEYPOM_LOCAL_STORAGE_KEY}:envData`);
    }

    async signAndSendTransaction(params) {

    }

    async signAndSendTransactions(params) {

    }

    showModal = () => {

    }

    async verifyOwner() {
        // throw Error("FastAuth:verifyOwner is deprecated");
    }

    async getAvailableBalance(id) {
        // TODO: get access key allowance
        return new BN(0);
    }

    async getAccounts() {
        return await this.keyStore.getAccounts(NetworkId);
    }

    async switchAccount(id) {
        this._setActiveAccountId(id);
    }

    _setActiveAccountId(accountId) {
        this.activeAccountId = accountId;
        window.localStorage.setItem('fast-auth:activeAccountId', accountId);
    }
}