import { useState } from "react";
import styles from "./LoginSignup.module.css";
import Register from "../Register/Register";
import Login from "../Login/Login";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleToLogin = () => {
    setIsLogin(true);
  }

  return (
    <div className={styles.container}>
      <div className={styles.centerCard}>
        <b className={styles.heading}>QUIZZIE</b>
        <div className={styles.btnGrp}>
          <button
            className={`${styles.authBtn} ${!isLogin ? styles.selected : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
          <button
            className={`${styles.authBtn} ${isLogin ? styles.selected : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
        </div>
        {isLogin ? <Login /> : <Register onSuccess={toggleToLogin}/>}
      </div>
    </div>
  );
};

export default LoginSignup;
