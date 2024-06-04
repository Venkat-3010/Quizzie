import { useState, useEffect } from "react";
import {  getAllUserQuizzes } from "../../api/apiQuiz";
import styles from "./Analytics.module.css";
import { toast } from "react-toastify";
import DeleteQuizModal from "../ModalComponents/DeleteQuizModal/DeleteQuizModal";
import CreateQuizModal from "../ModalComponents/CreateQuizModal/CreateQuizModal";
import { Link } from "react-router-dom";
import shareIcon from '../../assets/share.svg';
import deleteIcon from '../../assets/material-symbols_delete.png';
import editIcon from '../../assets/edit.svg'

const Analytics = () => {
  const userId = localStorage.getItem("id");
  const [quizzes, setQuizzes] = useState([]);
  const [removeQuiz, setRemoveQuiz] = useState(false);
  const [quizIdIndex, setQuizIdIndex] = useState("");
  const [updateQuiz, setUpdateQuiz] = useState('');
  const [updateModal, setUpdateModal] = useState(false)

  const fetchQuizzes = async (userId) => {
    try {
      const data = await getAllUserQuizzes(userId);
      const sortedByDate = data.sortedByDate || [];
      setQuizzes(sortedByDate);
    } catch (error) {
      console.log(error);
    }
  };

  const shareLink = async (event) => {
    let url = `${window.location.origin}/sharedQuiz/${event.target.id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard", {
        theme: "dark",
        position: "bottom-right",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy link to clipboard", {
        theme: "dark",
        position: "bottom-right",
      });
    }
  };

  const handleQuizEdit = (event) => {
    setUpdateQuiz(event.target.id)
    setUpdateModal(true)
  }

  const handleRemoveQuiz = async (event) => {
    setRemoveQuiz(true);
    setQuizIdIndex(event.target.id);
    fetchQuizzes(userId);
  };

  useEffect(() => {
    if (userId) {
      fetchQuizzes(userId);
    }
  }, [userId]);

  const onClose = () => {
    setUpdateModal(false);
    setRemoveQuiz(false);
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.AnalyticsContainer}>
        <p className={styles.heading}>Quiz Analysis</p>
        <table className={styles.quizAnalyticsTable}>
          <thead className={styles.rowHeadingContainer}>
            <tr className={styles.rowHeading}>
              <th>S.No</th>
              <th>Quiz Name</th>
              <th>Created On</th>
              <th>Impression</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, index) => (
              <tr className={styles.resultRow} key={quiz._id} id={quiz._id}>
                <td>{index + 1}</td>
                <td>{quiz.title}</td>
                <td>
                  {new Date(quiz.createdAt).getDate() +
                    " " +
                    new Date(quiz.createdAt).toLocaleString("en-US", {
                      month: "short",
                    }) +
                    ", " +
                    new Date(quiz.createdAt).getFullYear()}
                </td>
                <td>
                  {quiz.impressions < 1000
                    ? quiz.impressions
                    : `${(quiz.impressions / 1000).toFixed(1)}K`}
                </td>
                <td>
                  <img
                    id={quiz._id}
                    className={styles.editIcon}
                    src={editIcon}
                    alt="edit quiz"
                    onClick={(event) => handleQuizEdit(event)}
                  />
                  <img
                    id={quiz._id}
                    className={styles.deleteIcon}
                    src={deleteIcon}
                    alt="delete quiz"
                    onClick={(event) => handleRemoveQuiz(event)}
                  />
                  <img
                    id={quiz._id}
                    className={styles.shareIcon}
                    src={shareIcon}
                    alt="share quiz"
                    onClick={(event) => shareLink(event)}
                  />
                </td>
                <td>
                  <Link
                    to={`/analytics/${quiz._id}`}
                    className={styles.AnalysisLink}
                  >
                    Question Wise Analysis
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {removeQuiz && (
        <DeleteQuizModal quiz_Id={quizIdIndex} setRemoveQuiz={setRemoveQuiz} />
      )}
      {updateModal && (
        <div className={styles.updateQuizContainer}>
          <CreateQuizModal updateQuiz={updateQuiz} onClose={onClose}/>
        </div>
      )}
    </div>
  );
};

export default Analytics;
