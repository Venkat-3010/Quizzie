import React, { useState } from "react";
import styles from "./HomePages.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Dashboard from "../../components/Dashboard/Dashboard";
import Analytics from "../../components/Analytics/Analytics";
import CreateQuizModal from "../../components/Modals/CreateQuizModal/CreateQuizModal";

const HomePage = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedItem("Dashboard");
  };

  return (
    <>
      <div className={styles.dashboardContainer}>
        <Sidebar
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          onOpenModal={() => setIsOpen(true)}
        />
        <>
          {selectedItem === "Dashboard" && <Dashboard />}
          {selectedItem === "Analytics" && <Analytics />}
          {isOpen && (
            <div className={styles.modalOverlay}>
              <CreateQuizModal open={isOpen} onClose={handleClose} />
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default HomePage;
