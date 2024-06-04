import React, { useState, useEffect } from "react";
import { deleteQuiz, getAllUserQuizzes } from "../../api/apiQuiz"; // Removed deleteQuiz import here
import styles from "./Analytics.module.css";
import { toast } from "react-toastify";
import DeleteQuizModal from "../ModalComponents/DeleteQuizModal/DeleteQuizModal";
import CreateQuizModal from "../ModalComponents/CreateQuizModal/CreateQuizModal";
import { Link } from "react-router-dom";
import shareIcon from '../../assets/share.svg';
import deleteIcon from '../../assets/material-symbols_delete.png';
import editIcon from '../../assets/edit.svg';

const Analytics = () => {
  const userId = localStorage.getItem("id");
  const [quizzes, setQuizzes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quizId, setQuizId] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editQuizId, setEditQuizId] = useState("");

  const fetchQuizzes = async (userId) => {
    try {
      const data = await getAllUserQuizzes(userId);
      const sortedByDate = data.sortedByDate || [];
      setQuizzes(sortedByDate);
      // console.log(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch quizzes");
    }
  };

  const shareLink = async (event) => {
    const url = `${window.location.origin}/sharedQuiz/${event.target.id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard", {
        theme: "dark",
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy link to clipboard", {
        theme: "dark",
        position: "bottom-right",
      });
    }
  };

  const handleQuizEdit = (e) => {
    setEditQuizId(e.target.id);
    setShowEditModal(true);
  };

  const handleRemoveQuiz = (e) => {
    setQuizId(e.target.id);
    setShowDeleteModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}, ${date.getFullYear()}`;
  };

  useEffect(() => {
    if (userId) {
      fetchQuizzes(userId);
    }
  }, [userId]);

  const onClose = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.analyticsContainer}>
        <p className={styles.heading}>Quiz Analysis</p>
        <table className={styles.quizAnalyticsTable}>
          <thead className={styles.rowHeadingContainer}>
            <tr className={styles.rowHeading}>
              <th>S.No</th>
              <th>Quiz Name</th>
              <th>Created On</th>
              <th>Impressions</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, index) => (
              <tr className={styles.resultRow} key={quiz._id} id={quiz._id}>
                <td>{index + 1}</td>
                <td>{quiz.title}</td>
                <td>{formatDate(quiz.createdAt)}</td>
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
                    onClick={handleQuizEdit}
                  />
                  <img
                    id={quiz._id}
                    className={styles.deleteIcon}
                    src={deleteIcon}
                    alt="delete quiz"
                    onClick={handleRemoveQuiz}
                  />
                  <img
                    id={quiz._id}
                    className={styles.shareIcon}
                    src={shareIcon}
                    alt="share quiz"
                    onClick={shareLink}
                  />
                </td>
                <td>
                  <Link
                    to={`/analytics/${quiz._id}`}
                    className={styles.analysisLink}
                  >
                    Question Wise Analysis
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeleteModal && (
        <DeleteQuizModal quizId={quizId} setShowDeleteModal={setShowDeleteModal} />
      )}
      {showEditModal && (
        <div className={styles.updateQuizContainer}>
          <CreateQuizModal quizId={editQuizId} onClose={onClose} />
        </div>
      )}
    </div>
  );
};

export default Analytics;
