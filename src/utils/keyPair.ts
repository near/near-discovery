import { KeyPair } from 'near-api-js';

export interface Keys {
    publicKey: PublicKey;
    secretKey: string;
    extendedSecretKey: string;
}

export interface PublicKey {
    keyType: number;
    data: { [key: string]: number };
}

export const getKeypomKeys = (dropName: string) => {
    const keys = localStorage.getItem(`keysPom:${dropName}`);
    if (keys) {
        return JSON.parse(keys);
    }
    return [];
}

const setKeypomKeys = (dropName: string, keys: Keys[]) => {
    localStorage.setItem(`keysPom:${dropName}`, JSON.stringify(keys));
}

const generateAndStore = (dropName: string, dropsNumber: number) => {
    const keys = [];
    const keysLocalStorage = getKeypomKeys(dropName);
    for (let index = 0; index < dropsNumber; index++) {
        const newKeyPair = KeyPair.fromRandom('ed25519');
        keys.push(newKeyPair.getPublicKey().toString());
        keysLocalStorage.push(newKeyPair.toString());
        console.log('newKeyPair', newKeyPair.toString())
    }
    setKeypomKeys(dropName, keysLocalStorage);

    return keys;
}

export default generateAndStore;