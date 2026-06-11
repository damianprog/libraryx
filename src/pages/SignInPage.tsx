import type { JSX } from "react";
import SignIn from "../components/Sign/SignIn";
import styles from "./signPage.module.css";

const SignInPage = (): JSX.Element => {
  return (
    <div className={styles.signPage}>
      <SignIn />
    </div>
  );
};

export default SignInPage;
