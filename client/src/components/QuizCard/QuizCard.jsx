import React, { useEffect, useState } from "react";
import styles from "./QuizCard.module.css";

const QuizCard = ({quizTotalItems}) => {

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
