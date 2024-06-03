import React from "react";
import styles from "../QuizQuestionsModal/QuizQuestionsModal.module.css";

const ControlButtons = ({ onClose, handleCreateQuiz }) => {
  return (
    <div className={styles.cancelCreateBtns}>
      <button className={styles.cancelBtn} onClick={onClose}>
        Cancel
      </button>
      <button className={styles.createBtn} onClick={handleCreateQuiz}>
        Create Quiz
      </button>
    </div>
  );
};

export default ControlButtons;
