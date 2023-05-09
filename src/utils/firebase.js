import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { network } from './config';

// Initialize Firebase
export const firebaseApp = initializeApp(network.fastAuth.firebase);
export const firebaseAuth = getAuth(firebaseApp);
