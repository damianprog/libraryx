import { Button, Card, Divider, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { auth, googleProvider, facebookProvider } from "../../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import type { UserCredential } from "firebase/auth";
import styles from "./sign.module.css";
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent, JSX } from "react";
import { useNavigate } from "react-router-dom";
import getFirebaseErrorCode from "../../firebaseUtils/getFirebaseErrorCode";

const SignIn = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUserErrorMessage, setSignUserErrorMessage] = useState("");
  const navigate = useNavigate();

  const setUserAndNavigate = (uid: string): void => {
    localStorage.setItem("loggedUserUidLibraryX", uid);
    navigate("/");
  };

  const signInUser = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const { user }: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserAndNavigate(user.uid);
    } catch (error: unknown) {
      switch (getFirebaseErrorCode(error)) {
        case "auth/invalid-credential":
          setSignUserErrorMessage("Invalid email or password");
          break;
        case "auth/invalid-email":
          setSignUserErrorMessage("Please enter a valid email address");
          break;
        case "auth/too-many-requests":
          setSignUserErrorMessage(
            "Too many sign-in attempts. Please wait a moment"
          );
          break;
        default:
          setSignUserErrorMessage("Could not sign in. Please try again");
      }
      console.error(error);
    }
  };

  const signInUserWithGoogle = async (): Promise<void> => {
    try {
      const { user }: UserCredential = await signInWithPopup(
        auth,
        googleProvider
      );
      setUserAndNavigate(user.uid);
    } catch (error: unknown) {
      switch (getFirebaseErrorCode(error)) {
        case "auth/popup-closed-by-user":
        case "auth/cancelled-popup-request":
          return;
        case "auth/popup-blocked":
          setSignUserErrorMessage(
            "Popup was blocked. Please allow popups for this site"
          );
          break;
        case "auth/account-exists-with-different-credential":
          setSignUserErrorMessage(
            "An account with this email already exists with a different sign-in method"
          );
          break;
        case "auth/network-request-failed":
          setSignUserErrorMessage(
            "Network error. Please check your connection"
          );
          break;
        default:
          setSignUserErrorMessage("Could not sign in. Please try again");
      }
      console.error(error);
    }
  };

  const signInUserWithFacebook = async (): Promise<void> => {
    try {
      const { user }: UserCredential = await signInWithPopup(
        auth,
        facebookProvider
      );
      setUserAndNavigate(user.uid);
    } catch (error: unknown) {
      switch (getFirebaseErrorCode(error)) {
        case "auth/popup-closed-by-user":
        case "auth/cancelled-popup-request":
          return;
        case "auth/popup-blocked":
          setSignUserErrorMessage(
            "Popup was blocked. Please allow popups for this site"
          );
          break;
        case "auth/account-exists-with-different-credential":
          setSignUserErrorMessage(
            "An account with this email already exists with a different sign-in method"
          );
          break;
        case "auth/network-request-failed":
          setSignUserErrorMessage(
            "Network error. Please check your connection"
          );
          break;
        default:
          setSignUserErrorMessage("Could not sign in. Please try again");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("loggedUserUidLibraryX")) {
      navigate("/");
    }
  }, []);

  return (
    <Card className={styles.sign} variant="outlined">
      <h1>LibraryX</h1>
      <h2>Sign In</h2>
      <form className={styles.signForm} onSubmit={(event) => signInUser(event)}>
        <p
          className={`${styles.signUserError} ${
            signUserErrorMessage && styles.show
          }`}
        >
          {signUserErrorMessage}
        </p>
        <TextField
          className={styles.signInput}
          label="Email"
          variant="outlined"
          size="small"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <TextField
          className={styles.signInput}
          label="Password"
          variant="outlined"
          size="small"
          type={"password"}
          sx={{ mt: 3 }}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <Button
          className={styles.signButton}
          variant="contained"
          sx={{ mt: 2 }}
          type="submit"
        >
          Sign In
        </Button>
        <Divider className={styles.divider} sx={{ mt: 2 }}>
          or
        </Divider>
        <Button
          className={styles.signButton}
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={signInUserWithGoogle}
        >
          <GoogleIcon />
          &nbsp; Sign in with Google
        </Button>
        <Button
          className={styles.signButton}
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={signInUserWithFacebook}
        >
          <FacebookIcon />
          &nbsp; Sign in with Facebook
        </Button>
        <p className={styles.signUp}>
          Don't have an account? <a href="/sign-up">Sign up</a>{" "}
        </p>
      </form>
    </Card>
  );
};

export default SignIn;
