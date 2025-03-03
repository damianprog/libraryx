import SignIn from "../components/sign/SignIn";
import styles from "./signPage.module.css";

const SignPage = () => {
  return (
    <div className={styles.signPage}>
      <SignIn />
    </div>
  );
};

export default SignPage;
