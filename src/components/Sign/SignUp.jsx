import { Button, Card, Divider, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import styles from "./sign.module.css";
import { useState } from "react";
import { auth, googleProvider, facebookProvider } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [signUserError, setSignUserError] = useState(false);
  const [signUserErrorMessage, setSignUserErrorMessage] = useState("");
  const navigate = useNavigate();

  const signUpUser = async (event) => {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setUserAndNavigate();
    } catch (error) {
      console.error(error);
    }
  };

  const validateFields = () => {
    const areAllFieldsProvided = email && password && repeatPassword;
    const passwordsMatch = password === repeatPassword;

    if (!areAllFieldsProvided) {
      setSignUserErrorMessage("Please fill in all fields");
    } else if (!passwordsMatch) {
      setSignUserErrorMessage("Password and repeat password must match");
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

  return (
    <Card className={styles.sign} variant="outlined">
      <h1>LibraryX</h1>
      <h2>Sign Up</h2>
      <form className={styles.signForm} onSubmit={(event) => signUpUser(event)}>
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
        <TextField
          className={styles.signInput}
          label="Repeat Password"
          variant="outlined"
          size="small"
          type={"password"}
          sx={{ mt: 3 }}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <Button
          className={styles.signButton}
          variant="contained"
          sx={{ mt: 2 }}
          type="submit"
        >
          Sign Up
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
          &nbsp; Sign up with Google
        </Button>
        <Button
          className={styles.signButton}
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={signInUserWithFacebook}
        >
          <FacebookIcon />
          &nbsp; Sign up with Facebook
        </Button>
        <p className={styles.signUp}>
          Already have an account? <a href="/sign-in">Sign In</a>{" "}
        </p>
      </form>
    </Card>
  );
};

export default SignUp;
