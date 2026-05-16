import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqaRm2jX4y7M83oL3vDQzc6STdQVIawxQ",
  authDomain: "ecosync-b853a.firebaseapp.com",
  projectId: "ecosync-b853a",
  storageBucket: "ecosync-b853a.firebasestorage.app",
  messagingSenderId: "784518019652",
  appId: "1:784518019652:web:513a7f3fb309f1d49e1a11",
};

// Initialize Firebase (prevent duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { auth };

// --- Auth helpers ---

export async function firebaseSignIn(
  email: string,
  password: string
): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function firebaseSignUp(
  email: string,
  password: string
): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function firebaseSignOut(): Promise<void> {
  return signOut(auth);
}
