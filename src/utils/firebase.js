import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { NetworkId } from "../data/widgets";

// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const isMainnet = NetworkId === "mainnet";

const firebaseConfig = isMainnet ? {
  apiKey: "AIzaSyDhxTQVeoWdnbpYTocBAABbLULGf6H5khQ",
  authDomain: "near-fastauth-prod.firebaseapp.com",
  projectId: "near-fastauth-prod",
  storageBucket: "near-fastauth-prod.appspot.com",
  messagingSenderId: "829449955812",
  appId: "1:829449955812:web:532436aa35572be60abff1",
  measurementId: "G-T2PPJ8QRYY"
} : {
  apiKey: "AIzaSyDAh6lSSkEbpRekkGYdDM5jazV6IQnIZFU",
  authDomain: "pagoda-oboarding-dev.firebaseapp.com",
  projectId: "pagoda-oboarding-dev",
  storageBucket: "pagoda-oboarding-dev.appspot.com",
  messagingSenderId: "116526963563",
  appId: "1:116526963563:web:053cb0c425bf514007ca2e",
  measurementId: "G-HF2NBGE60S"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);