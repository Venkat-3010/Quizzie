import QuizCard from '../QuizCard/QuizCard'
import TrendCard from '../TrendCard/TrendCard'
import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css'
import { getAllUserQuizzes } from '../../api/apiQuiz';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalQuizzes: [],
    totalQuestions: 0,
    totalImpressions: 0,
  });
  const [trend, setTrend] = useState([]);
  const id = localStorage.getItem('id');

  useEffect(() => {
    if (id) {
      fetchQuizzes();
    }
  }, [id]);

  const fetchQuizzes = async () => {
    try {
      const response = await getAllUserQuizzes();
      const data = await response.json();
      const trendQuiz = data.trendQuiz || [];
      const sortedQuiz = data.sortedImpressions || [];

      const totalQuestions = sortedQuiz.reduce((total, quiz) => total + quiz.questions.length, 0);
      const totalImpressions = sortedQuiz.reduce((total, quiz) => total + quiz.impressions, 0);

      setStats({
        totalQuizzes: sortedQuiz,
        totalQuestions: totalQuestions,
        totalImpressions: totalImpressions,
      });

      setTrend(trendQuiz);
    } catch (error) {
      console.log(error);
    }
  };

  const quizTotalItems = [
    {
      text1: "Quiz",
      text2: "Created",
      value: stats.totalQuizzes.length,
      color: "#FF5D01",
    },
    {
      text1: "Questions",
      text2: "Created",
      value: stats.totalQuestions,
      color: "#60B84B",
    },
    {
      text1: "Total",
      text2: "Impressions",
      value: stats.totalImpressions >= 1000
        ? (stats.totalImpressions / 1000).toFixed(1) + " K"
        : stats.totalImpressions,
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