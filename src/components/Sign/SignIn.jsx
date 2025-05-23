import { Button, Card, Divider, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { auth, googleProvider, facebookProvider } from "../../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import styles from "./sign.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUserErrorMessage, setSignUserErrorMessage] = useState("");
  const [loggedUserUid, setLoggedUserUid] = useState(
    localStorage.getItem("loggedUserUidLibraryX")
  );
  const navigate = useNavigate();

  const signInUser = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUserAndNavigate();
    } catch (error) {
      setSignUserErrorMessage(
        "User with provided email or password does not exist"
      );
      console.error(error);
    }
  };

  const signInUserWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setUserAndNavigate();
    } catch (error) {
      console.error(error);
    }
  };

  const signInUserWithFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      setUserAndNavigate();
    } catch (error) {
      console.error(error);
    }
  };

  const setUserAndNavigate = () => {
    localStorage.setItem("loggedUserUidLibraryX", auth.currentUser.uid);
    navigate("/");
  };

  useEffect(() => {
    if (loggedUserUid) {
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={styles.signInput}
          label="Password"
          variant="outlined"
          size="small"
          type={"password"}
          sx={{ mt: 3 }}
          onChange={(e) => setPassword(e.target.value)}
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
