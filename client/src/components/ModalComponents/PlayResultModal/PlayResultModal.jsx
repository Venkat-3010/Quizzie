import styles from "./PlayResultModal.module.css";
import cup from "../../../assets/trophy.png";

const PlayResultModal = ({ score, quizType }) => {
  return (
    <>
      {quizType === "Q&A" ? (
        <div className={styles.parent}>
          <div className={styles.childBox}>
            <h1>Congrats Quiz is completed</h1>
            <img src={cup} alt="" />
            <h2>
              Your Score is <span>{score ? score : "00/00"}</span>
            </h2>
          </div>
        </div>
      ) : (
        <div className={styles.parent}>
          <div className={styles.childBox}>
            <h1 className={styles.poll_msg}>
              Thank you for participating in the Poll
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayResultModal;
