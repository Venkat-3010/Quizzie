import React, { useContext } from "react";
import styles from "../QuizQuestionsModal/QuizQuestionsModal.module.css";
import { useNavigate } from "react-router-dom";
import { QuizzieContext } from "../../../App";

const ControlButtons = ({ handleCreateQuiz, updateQuiz }) => {
  const {setSelectedItem} = useContext(QuizzieContext);
  const navigate = useNavigate();
  const handleCancel = () => {
    setSelectedItem('Dashboard')
    navigate('/dashboard');
  };
  return (
    <div className={styles.cancelCreateBtns}>
      <button className={styles.cancelBtn} onClick={handleCancel}>
        Cancel
      </button>
      <button className={styles.createBtn} onClick={handleCreateQuiz}>
        { updateQuiz ? 'Update Quiz' : 'Create Quiz'}
      </button>
    </div>
  );
};

export default ControlButtons;
