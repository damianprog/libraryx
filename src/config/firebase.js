import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCx6AT27Klt5Yg4HJGP_2rT_e1vmUfbihk",
  authDomain: "libraryx-61c82.firebaseapp.com",
  projectId: "libraryx-61c82",
  storageBucket: "libraryx-61c82.firebasestorage.app",
  messagingSenderId: "552145822265",
  appId: "1:552145822265:web:8e9ee88c879a8fab3fa3e8",
  measurementId: "G-MXR6ZPFEHX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const db = getFirestore(app);
