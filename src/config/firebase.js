import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgYw_E35K8ZlaLyMNN1Sy9m6j3n21202Y",
  authDomain: "e-commerce-fb444.firebaseapp.com",
  projectId: "e-commerce-fb444",
  storageBucket: "e-commerce-fb444.appspot.com",
  messagingSenderId: "657343205523",
  appId: "1:657343205523:web:2f081342ce6deb3ba6bd66"
};

//initialize firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);