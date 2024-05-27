import React, { useState } from "react";
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
            className={`${styles.authBtn} ${isLogin ? styles.selected : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`${styles.authBtn} ${!isLogin ? styles.selected : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        {isLogin ? <Login /> : <Register onSuccess={toggleToLogin}/>}
      </div>
    </div>
  );
};

export default LoginSignup;
