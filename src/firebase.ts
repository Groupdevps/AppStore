import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||  "AIzaSyB2U3OKrpZGwBFyGSB9oLIOV8lC4NMTPD0",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||  "appstore-ce5de.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "appstore-ce5de",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "appstore-ce5de.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "465802133505",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:465802133505:web:dc135a108f458d58358000",
};

const app =  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const analytics = getAnalytics(app);

