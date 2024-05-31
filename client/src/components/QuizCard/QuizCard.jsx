import React, { useEffect, useState } from "react";
import styles from "./QuizCard.module.css";

const QuizCard = () => {
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    totalImpressions: 0,
  });

  // const handleData = async () => {
  //   try {
  //     const totalStats = await getQuizStatistics();
  //     setStats({
  //       totalQuizzes: totalStats.totalQuizzes,
  //       totalQuestions: totalStats.totalQuestions,
  //       totalImpressions: totalStats.totalImpressions >= 1000 ? (totalStats.totalImpressions / 1000).toFixed(1) + 'K' : totalStats.totalImpressions ,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   handleData();
  //   const interval = setInterval(() => {
  //     handleData();
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const quizTotalItems = [
    {
      text1: "Quiz",
      text2: "Created",
      value: stats.totalQuizzes,
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
      value: stats.totalImpressions,
      color: "#5076FF",
    },
  ];
  return (
    <div className={styles.quizCardContainer}>
      {quizTotalItems.map((item, index) => (
        <div
          className={styles.quizCard}
          style={{ color: item.color }}
          key={index}
        >
          <div className={styles.textSpan}>
            <span className={styles.value}>{item.value}</span>
            <span className={styles.text1}>{item.text1}</span>
          </div>
          <p>{item.text2}</p>
        </div>
      ))}
    </div>
  );
};

export default QuizCard;
