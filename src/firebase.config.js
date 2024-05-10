
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBJEN5jtHRqLqRYCD4vKw8-ZkKN5p8Tyh4",
    authDomain: "luyenkieu-d1c70.firebaseapp.com",
    projectId: "luyenkieu-d1c70",
    storageBucket: "luyenkieu-d1c70.appspot.com",
    messagingSenderId: "40484987931",
    appId: "1:40484987931:web:0224de5ef7fc7b70aa04be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;