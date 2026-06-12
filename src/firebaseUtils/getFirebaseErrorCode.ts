import { FirebaseError } from "firebase/app";

const getFirebaseErrorCode = (error: unknown): string =>
  error instanceof FirebaseError ? error.code : "";

export default getFirebaseErrorCode;
