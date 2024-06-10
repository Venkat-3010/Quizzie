import { useContext } from "react";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import styles from "./QuizSuccessModal.module.css";
import { useNavigate } from "react-router-dom";
import { QuizzieContext } from "../../../App";

const QuizSuccessModal = ({quizShareLink}) => {
  const {setSelectedItem} = useContext(QuizzieContext);
  const navigate = useNavigate();
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

  const handleCancel = () => {
    setSelectedItem('Dashboard');
    navigate('/dashboard');
  }

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
      <RxCross2 className={styles.cancelBtn} onClick={handleCancel}/>
    </div>
  );
};

export default QuizSuccessModal;
