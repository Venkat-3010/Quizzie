import QuizCard from "../QuizCard/QuizCard";
import TrendCard from "../TrendCard/TrendCard";
import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { getAllUserQuizzes } from "../../api/apiQuiz";

const Dashboard = () => {
  const [totalQuizzes, setTotalQuizzes] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalImpressions, setTotalImpressions] = useState(0);
  const [trend, setTrend] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (userId) {
      fetchQuizzes();
    }
  }, [userId]);

  const fetchQuizzes = async () => {
    try {
      const data = await getAllUserQuizzes(userId);
      const trendQuiz = data.trendQuiz || [];
      const sortedQuiz = data.sortedImpressions || [];

      const totQuestions = sortedQuiz.reduce(
        (total, quiz) => total + quiz.questions.length,
        0
      );
      const totImpressions = sortedQuiz.reduce(
        (total, quiz) => total + quiz.impressions,
        0
      );
      
      // console.log(data)

      setTotalQuizzes(sortedQuiz);
      setTotalQuestions(totQuestions);
      setTotalImpressions(totImpressions);

      setTrend(trendQuiz);
    } catch (error) {
      console.log(error);
    }
  };

  const quizTotalItems = [
    {
      text1: "Quiz",
      text2: "Created",
      value: totalQuizzes.length,
      color: "#FF5D01",
    },
    {
      text1: "Questions",
      text2: "Created",
      value: totalQuestions,
      color: "#60B84B",
    },
    {
      text1: "Total",
      text2: "Impressions",
      value:
        totalImpressions >= 1000
          ? (totalImpressions / 1000).toFixed(1) + " K"
          : totalImpressions,
      color: "#5076FF",
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <QuizCard quizTotalItems={quizTotalItems} />
      <div className={styles.box}>
        <b>Trending Quizzes</b>
        <TrendCard trend={trend} />
      </div>
    </div>
  );
};

export default Dashboard;
