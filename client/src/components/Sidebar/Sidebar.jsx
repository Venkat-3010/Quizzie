import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import line from "/vectorLine.png";
import Logout from "../Logout/Logout";
import { toast } from "react-toastify";

const Sidebar = ({ selectedItem, setSelectedItem, onOpenModal }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    toast.info("Logged out", {
      position: "bottom-right",
      theme: "dark",
    });
    navigate("/");
  };

  const handleMenu = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebarHeading}>
        <b className={styles.heading}>QUIZZIE</b>
      </div>
      <div className={styles.sidebarMenus}>
        <div
          className={`${styles.dashboardBtn} ${
            selectedItem === "Dashboard" ? styles.selected : ""
          }`}
          onClick={() => {
            handleMenu("Dashboard");
          }}
        >
          <b className={styles.dashboard}>Dashboard</b>
        </div>
        <div
          className={`${styles.analyticsBtn} ${
            selectedItem === "Analytics" ? styles.selected : ""
          }`}
          onClick={() => handleMenu("Analytics")}
        >
          <b className={styles.analytics}>Analytics</b>
        </div>
        <div
          className={`${styles.createQuizBtn} ${
            selectedItem === "Create Quiz" ? styles.selected : ""
          }`}
          onClick={() => {
            handleMenu("Create Quiz");
            onOpenModal();
          }}
        >
          <b className={styles.createQuiz}>Create Quiz</b>
        </div>
      </div>
      <div className={styles.logoutBtn}>
        <img src={line} className={styles.img} alt="" />
        <Logout onClick={handleLogout} className={styles.logout} />
      </div>
    </div>
  );
};

export default Sidebar;
