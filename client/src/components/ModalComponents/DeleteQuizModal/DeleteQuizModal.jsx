import React from 'react';
import styles from './DeleteQuizModal.module.css'
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../api/apiQuiz';

const DeleteQuizModal = ({setRemoveQuiz, quiz_id}) => {

  const userId = localStorage.getItem('id');

  const handleDeleteQuiz = async() => {
    try {
        const data  = await deleteQuiz(quiz_id, userId);
        toast.success("Quiz removed successfully", data.message);
        setRemoveQuiz(false);
      } catch (error) {
        console.log(error);
      }
  }

  const handleCancel = () => {
    setRemoveQuiz(false);
  }

  return (
    <div className={styles.container}>
            <div className={styles.popupCard}>
                <p className={styles.text}>Are you confirm you want to delete ?</p>
                <div className={styles.buttonsContainer}>
                    <button className={styles.deleteBtn} onClick={handleDeleteQuiz}>
                        Confirm Delete
                    </button>
                    <button className={styles.cancelBtn} onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
  )
}

export default DeleteQuizModal