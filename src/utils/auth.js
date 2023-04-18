import * as nearAPI from "near-api-js";

import { KeyPair } from "near-api-js/lib/utils/key_pair";
import { NetworkId } from "../data/widgets";
import { base_encode } from "near-api-js/lib/utils/serialize";
import { createKey } from '@near-js/biometric-ed25519';
import { firebaseAuth } from "./firebase";
import { sendSignInLinkToEmail } from 'firebase/auth';

export const MASTER_USER_ID = "gutsyphilip.testnet";

export const getCorrectAccessKey = async (userName, firstKeyPair, secondKeyPair) => {
    const account = await nearConnection.account(userName);
    const accessKeys = await account.getAccessKeys();

    const firstPublicKeyB58 = "ed25519:" + base_encode((firstKeyPair.getPublicKey().data))
    const secondPublicKeyB58 = "ed25519:" + base_encode((secondKeyPair.getPublicKey().data))

    const accessKey = accessKeys.find((accessKey) => accessKey.public_key === firstPublicKeyB58 || secondPublicKeyB58);
    if (!accessKey) {
        throw new Error('No access key found');
    } else if (accessKey.public_key === firstPublicKeyB58) {
        return firstKeyPair;
    } else {
        return secondKeyPair;
    }
};

export const handleCreateAccount = async (accountId, email) => {
    const key = await createKey(accountId);
    const publicKey = key.getPublicKey().toString();

    if (!!publicKey) {
        await sendSignInLinkToEmail(firebaseAuth, email, {
            url: `${window.location.origin}/auth-callback?publicKey=${publicKey}&accountId=${accountId}`,
            handleCodeInApp: true,
        })
        window.localStorage.setItem('emailForSignIn', email);
        return { email, publicKey, accountId }
    }
};


export const handleCompleteSignIn = async (accountId, publicKey) => {
    if (accountId) {
        const authData = {
            accountId,
            allKeys: [publicKey],
        };
        const contract = {
            contractId: "v1.social08.testnet",
            methodNames: []
        }
        window.localStorage.setItem("near_app_wallet_auth_key", JSON.stringify(authData));
        window.localStorage.setItem("near-social-vm:v01::accountId:", `"${accountId}"`);
        window.localStorage.setItem("near-wallet-selector:contract", JSON.stringify(contract));
        if (publicKey) {
            const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore(window.localStorage, 'near-api-js:keystore:');
            const keyPair = KeyPair.fromString(publicKey);
            await keyStore.setKey(NetworkId, accountId, keyPair);
        }
    }
}