import { initializeApp, type FirebaseOptions } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore, type FirestoreDataConverter } from "firebase/firestore";
import bookPlaceholder from "../assets/book-placeholder.svg";
import type { UserBook } from "../types/UserBook";

const LEGACY_PLACEHOLDER_IMG =
  "https://thumbs.dreamstime.com/b/old-red-leather-texture-gold-decorative-frame-3780083.jpg";

const isLegacyPlaceholder = (img: string | undefined): boolean =>
  !img ||
  img === LEGACY_PLACEHOLDER_IMG ||
  (img.startsWith("data:image/svg+xml;base64,") && img.includes("RjU3RjE3"));

const firebaseConfig: FirebaseOptions = {
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

export const userBookConverter: FirestoreDataConverter<UserBook> = {
  toFirestore: (book) => {
    const { id, ...rest } = book;
    return rest;
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options) as Omit<UserBook, "id" | "pages"> & {
      pages: number | string;
    };
    return {
      ...data,
      id: snapshot.id,
      createdAt: data.createdAt ?? null,
      pages: typeof data.pages === "number" ? String(data.pages) : data.pages,
      img: isLegacyPlaceholder(data.img) ? bookPlaceholder : data.img,
    };
  },
};
