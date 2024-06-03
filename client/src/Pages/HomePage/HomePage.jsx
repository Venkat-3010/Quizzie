import React, { useContext, useEffect, useState } from "react";
import styles from "./HomePages.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Dashboard from "../../components/Dashboard/Dashboard";
import Analytics from "../../components/Analytics/Analytics";
import CreateQuizModal from "../../components/ModalComponents/CreateQuizModal/CreateQuizModal";
import { QuizzieContext } from "../../App";

const HomePage = () => {
  const { selectedItem, setSelectedItem } = useContext(QuizzieContext);
  const [isOpen, setIsOpen] = useState(false);
  const [quiz_id, setQuiz_id] = useState("");
  const [quizShareLink, setQuizShareLink] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizType, setQuizType] = useState("Q&A");
  const [user, setUser] = useState(null);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedItem("Dashboard");
    // console.log(user)
  };

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      setUser(userId);
    }
  }, []);

  return (
    <>
      <div className={styles.dashboardContainer}>
        <Sidebar
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          onOpenModal={() => setIsOpen(true)}
        />
        <>
          {selectedItem === "Dashboard" && <Dashboard id={user} />}
          {selectedItem === "Analytics" && (
            <Analytics
              quizType={quizType}
              quiz_id={quiz_id}
              quizShareLink={quizShareLink}
              setQuizShareLink={setQuizShareLink}
            />
          )}
          {isOpen && (
            <div className={styles.modalOverlay}>
              <CreateQuizModal
                quiz_id={quiz_id}
                setQuiz_id={setQuiz_id}
                quizShareLink={quizShareLink}
                setQuizShareLink={setQuizShareLink}
                quizTitle={quizTitle}
                setQuizTitle={setQuizTitle}
                quizType={quizType}
                setQuizType={setQuizType}
                onClose={handleClose}
              />
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default HomePage;
