import getFirebaseErrorCode from "./getFirebaseErrorCode";

const handleProviderSignInError = (
  error: unknown,
  setMessage: (message: string) => void
): void => {
  switch (getFirebaseErrorCode(error)) {
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return;
    case "auth/popup-blocked":
      setMessage("Popup was blocked. Please allow popups for this site");
      break;
    case "auth/account-exists-with-different-credential":
      setMessage(
        "An account with this email already exists with a different sign-in method"
      );
      break;
    case "auth/network-request-failed":
      setMessage("Network error. Please check your connection");
      break;
    default:
      setMessage("Could not sign in. Please try again");
  }
  console.error(error);
};

export default handleProviderSignInError;
