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
      setSignUserErrorMessage(
        "User with provided email or password does not exist"
      );
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
