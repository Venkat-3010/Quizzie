import React from "react";
import styles from "../QuizQuestionsModal/QuizQuestionsModal.module.css";

const ControlButtons = ({ onClose, handleCreateQuiz, updateQuiz }) => {
  return (
    <div className={styles.cancelCreateBtns}>
      <button className={styles.cancelBtn} onClick={onClose}>
        Cancel
      </button>
      <button className={styles.createBtn} onClick={handleCreateQuiz}>
        { updateQuiz ? 'Update Quiz' : 'Create Quiz'}
      </button>
    </div>
  );
};

export default ControlButtons;
