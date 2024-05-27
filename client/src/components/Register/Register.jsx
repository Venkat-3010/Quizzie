import React, { useState } from "react";
import styles from "./Register.module.css";
import { authRegister } from "../../api/apiAuth";

const Register = ({onSuccess}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setConfirmPassword(event.target.value);
  };

  const handleFormSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password || !confirmPassword) {
      alert("Please enter all required fields");
      console.log(formData);
      return;
    }

    if (formData.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await authRegister(formData);
    console.log("formData", formData);
    onSuccess();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.formInputs}>
          <span>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type={"text"}
              name="name"
              className={styles.input}
              onChange={handleFormChange}
            />
          </span>
          <span>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type={"email"}
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
              type={"password"}
              name="password"
              className={styles.input}
              onChange={handleFormChange}
            />
          </span>
          <span>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              type={"password"}
              name="confirmPassword"
              className={styles.input}
              onChange={handleFormChange}
            />
          </span>
        </div>
        <button onClick={handleFormSubmit} className={styles.toggleBtn}>
          Sign Up
        </button>
      </div>
    </>
  );
};

export default Register;
