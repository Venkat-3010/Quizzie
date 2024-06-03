import React from "react";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import styles from "./QuizSuccessModal.module.css";

const QuizSuccessModal = ({quizShareLink, onClose}) => {
  const handleLinkShare = async () => {
    const url = quizShareLink;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied!");
    } catch (error) {
      console.log("Failed to copy text: ", error);
      toast.error("Failed to copy text: ", error);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <b>Congrats your Quiz is Published!</b>
      <input
        type="text"
        className={styles.shareLink}
        value={quizShareLink}
        // placeholder="Your link is here"
        readOnly
      />
      <button className={styles.shareBtn} onClick={handleLinkShare}>
        Share
      </button>
      <RxCross2 className={styles.cancelBtn} onClick={onClose}/>
    </div>
  );
};

export default QuizSuccessModal;
