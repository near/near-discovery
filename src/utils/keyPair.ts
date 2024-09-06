import { KeyPair } from 'near-api-js';

export interface Keys {
    publicKey:         PublicKey;
    secretKey:         string;
    extendedSecretKey: string;
}

export interface PublicKey {
    keyType: number;
    data:    { [key: string]: number };
}

const getKeyLocalStorage = () =>{
    const keys = localStorage.getItem('keysPom');
    if(keys){
        return JSON.parse(keys);
    }
    return [];
}

const setKeyLocalStorage = (keys:Keys[]) =>{
    localStorage.setItem('keysPom',JSON.stringify(keys));
}

const getKeysPair = (dropsNumber:number ) => {
    const keys = [];
    const keysLocalStorage = getKeyLocalStorage();
    for (let index = 0; index < dropsNumber; index++) {
        const newKeyPair = KeyPair.fromRandom('ed25519');
        console.log("getKeysPair",newKeyPair);
        keys.push(newKeyPair.getPublicKey());
        keysLocalStorage.push(newKeyPair);
    }
    setKeyLocalStorage(keysLocalStorage);
    // guardar localstorage
    // mostrar 
    // generar links
    return keys;
// get_drops_for_owner
// get_drop_information
// get_keys_for_drop

}

export default getKeysPair;