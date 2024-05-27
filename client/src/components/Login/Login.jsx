import React, { useState } from "react";
import styles from "./Login.module.css";
import { authLogin } from "../../api/apiAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async () => {
    if (!formData.email || !formData.password) {
      alert("please fill in all required fields");
      return;
    }

    const result = await authLogin(formData);
    if (result) {
      alert("successfully logged in");
      console.log("Successfully logged in", result);
      navigate('/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formInputss}>
      <span>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          name="email"
          className={styles.input}
          onChange={handleFormChange}
        />
      </span>
      <span>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          name="password"
          className={styles.input}
          onChange={handleFormChange}
        />
      </span>
      </div>
      <button className={styles.toggleBtn} onClick={handleFormSubmit}>
        Login
      </button>
    </div>
  );
};

export default Login;
