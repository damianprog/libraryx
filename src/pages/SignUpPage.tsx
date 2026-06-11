import type { JSX } from "react";
import SignUp from "../components/Sign/SignUp";
import styles from "./signPage.module.css";

const SignUpPage = (): JSX.Element => {
  return (
    <div className={styles.signPage}>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
