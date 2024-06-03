import React, { useEffect, useState } from "react";
import styles from "./TrendCard.module.css";
import { getAllUserQuizzes } from "../../api/apiQuiz";
import eye from "../../assets/icon-park-outline_eyes.png";

const TrendCard = ({trend}) => {

  return (
    <div className={styles.TrendCardContainer}>
      {Array.isArray(trend) &&
        trend.map((quiz, index) => {
          return (
            <div className={styles.TrendCard} key={index}>
              <div className={styles.TrendCardName}>
                <div className={styles.TrendCardTitle}>{quiz.title}</div>
                <div className={styles.TrendCardInfo}>
                  <div className={styles.TrendCardImpressions}>
                    {quiz.impressions >= 1000
                      ? (quiz.impressions / 1000).toFixed(1) + "K"
                      : quiz.impressions}{" "}
                    <img src={eye} alt="eye" className={styles.img}/>
                  </div>
                </div>
                <p className={styles.createdAt}>
                  Created on : {new Date(quiz.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TrendCard;
