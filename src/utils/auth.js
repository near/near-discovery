import { NetworkId } from '../data/widgets';
import { base_encode } from 'near-api-js/lib/utils/serialize';
import { createKey } from '@near-js/biometric-ed25519';
import { firebaseAuth } from './firebase';
import { sendSignInLinkToEmail } from 'firebase/auth';

export const ACCOUNT_ID_SUFFIX = NetworkId === 'mainnet' ? 'near' : 'testnet';
export const HELPER_URL = NetworkId === 'mainnet' ? 'https://api.kitwallet.app' : 'https://testnet-api.kitwallet.app';
export const MPC_RECOVERY_URL = NetworkId === 'mainnet' ? 'https://mpc-recovery-prod-7tk2cmmtcq-ue.a.run.app' : 'https://mpc-recovery-7tk2cmmtcq-ue.a.run.app';

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

export const handleCreateAccount = async (accountId, email, isRecovery) => {
    const keyPair = await createKey(email);
    const publicKey = keyPair.getPublicKey().toString();

    if (!!publicKey) {
        const accountDataStash = {
            accountId,
            isCreated: false,
        }
        window.localStorage.setItem('fast-auth:account-creation-data', JSON.stringify(accountDataStash));
        await sendSignInLinkToEmail(firebaseAuth, email, {
            url: encodeURI(`${window.location.origin}/auth-callback?publicKey=${publicKey}&accountId=${accountId}` + (isRecovery ? '&isRecovery=true' : '')),
            handleCodeInApp: true,
        })
        window.localStorage.setItem('emailForSignIn', email);
        return { email, publicKey, accountId }
    }
};

