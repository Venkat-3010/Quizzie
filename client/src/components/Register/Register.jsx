import React, { useState } from "react";
import styles from "./Register.module.css";
import { authRegister } from "../../api/apiAuth";
import { toast } from "react-toastify";

const Register = ({ onSuccess }) => {
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
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !confirmPassword
    ) {
      toast.warn("Please fill in all the required fields", {
        position: "bottom-right",
        theme: "dark",
      });
      return;
    }

    if(!formData.email.includes('@')){
      toast.warn("Please enter a valid email", {
        position: "bottom-right",
        theme: "dark",
      });
      return;
    }

    if(!formData.password.length < 8){
      toast.warn("Password must be at least 8 characters", {
        position: "bottom-right",
        theme: "dark",
      });
      return;
    }

    if (formData.password !== confirmPassword) {
      toast.warn("Passwords do not match", {
        position: "bottom-right",
        theme: "dark",
      });
      return;
    }

    try {
      await authRegister(formData);
      toast.success("User has been registered", {
        position: "bottom-right",
        theme: "dark",
      });
      // console.log("formData", formData);
      onSuccess();
    } catch (error) {
      toast.error("Registration failed", {
        position: "bottom-right",
        theme: "dark",
      });
    }
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
          Sign-Up
        </button>
      </div>
    </>
  );
};

export default Register;
