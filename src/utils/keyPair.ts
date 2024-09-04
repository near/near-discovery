import { KeyPair } from 'near-api-js';

const getKeysPair = (dropsNumber) => {
    const keys = [];
    for (let index = 0; index < dropsNumber; index++) {
       
        const newKeyPair = KeyPair.fromRandom('ed25519');
        keys.push(newKeyPair.publicKey.toString());
        
    }
    return keys;

}

export default getKeysPair;