import {
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { auth, googleProvider, facebookProvider } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import styles from "./signIn.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log(auth?.currentUser);

  const signInUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signInUserWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      localStorage.setItem("loggedUserUidLibraryX", auth.currentUser.uid);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signInUserWithFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      localStorage.setItem("loggedUserUidLibraryX", auth.currentUser.uid);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.setItem("loggedUserUidLibraryX", null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className={styles.signIn} variant="outlined">
      <h1>LibraryX</h1>
      <h2>Sign In</h2>
      <div className={styles.inputs}>
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
        <FormGroup sx={{ mt: 2 }}>
          <FormControlLabel control={<Checkbox />} label="Remember me" />
        </FormGroup>
        <Button
          className={styles.signButton}
          variant="contained"
          sx={{ mt: 2 }}
          onClick={signInUser}
        >
          Sign In
        </Button>
        <div className={styles.forgotPasswordContainer}>
          <p className={styles.forgotPassword} onClick={logout}>
            Forgot your password?
          </p>
        </div>
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
          Don't have an account? <a href="#">Sign up</a>{" "}
        </p>
      </div>
    </Card>
  );
};

export default SignIn;
