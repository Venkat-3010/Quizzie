import React from "react";
import styles from "./DeleteQuizModal.module.css";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../api/apiQuiz";

const DeleteQuizModal = ({ setShowDeleteModal, setDeleted, quizId }) => {
  const handleDeleteQuiz = async () => {
    try {
      const data = await deleteQuiz(quizId);
      if (data) {
        toast.success("Quiz removed successfully", {
          theme: "dark",
          position: "bottom-right",
        });
        setShowDeleteModal(false);
        setDeleted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalCard}>
        <p className={styles.modalText}>Are you confirm you want to delete ?</p>
        <div className={styles.btnContainer}>
          <button className={styles.deleteBtn} onClick={handleDeleteQuiz}>
            Confirm Delete
          </button>
          <button className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuizModal;
