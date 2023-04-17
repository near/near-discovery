import * as nearAPI from "near-api-js";
// import { connect, keyStores, WalletConnection, Near } from "near-api-js";
import { base_encode } from "near-api-js/lib/utils/serialize";
import { KeyPair } from "near-api-js/lib/utils/key_pair";
import { NetworkId } from "../data/widgets";

export const MASTER_USER_ID = "gutsyphilip.testnet";
// const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore(window.localStorage, 'nearlib:keystore:');
// const keyPair = KeyPair.fromString('ed25519:4HnQUNMTgi6ht9oCemkLPqYf259fc1P91dJghqb3qhsgFa4krV46SMCxrYv5c1ArDhMDNsL6NV7tfreEHi5j7aSF');
// await keyStore.setKey('testnet', MASTER_USER_ID, keyPair);

export const getCorrectAccessKey = async (userName, firstKeyPair, secondKeyPair) => {
    console.log('userName', userName);
    // console.log('base64.toString(userHandle)', base64.toString(userName));
    const account = await nearConnection.account(userName);
    console.log('account', account);
    const accessKeys = await account.getAccessKeys();
    console.log('accessKeys', accessKeys);

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