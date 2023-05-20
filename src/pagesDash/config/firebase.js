import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const login = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const register = ({ email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
    return signOut(auth);
};
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
