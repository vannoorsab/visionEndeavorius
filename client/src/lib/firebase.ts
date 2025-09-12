import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBxIVuBFCzMR7nDZSwEqSGdvsazhob1tC8",
  authDomain: "vision-37a11.firebaseapp.com",
  projectId: "vision-37a11",
  storageBucket: "vision-37a11.firebasestorage.app",
  messagingSenderId: "339562247240",
  appId: "1:339562247240:web:15b3dfdf1e113b9b45547d",
  measurementId: "G-RM5ZNESMQ8"
};

// Initialize Firebase (avoid duplicate initialization during hot reloads)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

export default app;
