import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALYEntVlum1YtpQKmwy1waE4pessTlpqo",
  authDomain: "nexty-e5ad2.firebaseapp.com",
  projectId: "nexty-e5ad2",
  storageBucket: "nexty-e5ad2.firebasestorage.app",
  messagingSenderId: "136452563988",
  appId: "1:136452563988:web:821df4b118ebc0f2307301",
  measurementId: "G-YHDNYF6RFC"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
