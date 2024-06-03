import React, { useEffect, useState } from "react";
import styles from "./QuizCard.module.css";

const QuizCard = ({id}) => {
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    totalImpressions: 0,
  });

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


  useEffect(() => {
    
  })

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
