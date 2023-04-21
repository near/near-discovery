import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXkMYPc_N-BnpP-yMwohyrpIhk-AIBgQ4",
  authDomain: "pagoda-fast-auth-441fe.firebaseapp.com",
  projectId: "pagoda-fast-auth-441fe",
  storageBucket: "pagoda-fast-auth-441fe.appspot.com",
  messagingSenderId: "673945492851",
  appId: "1:673945492851:web:7bc2d49e513bed09c87906"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);