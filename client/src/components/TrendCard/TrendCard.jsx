import { useEffect, useState } from "react";
import styles from "./TrendCard.module.css";
import eye from "../../assets/icon-park-outline_eyes.png";

const TrendCard = ({ trend }) => {
  return (
    <div className={styles.TrendCardContainer}>
      {Array.isArray(trend) &&
        trend.map((quiz, index) => {
          return (
            <div className={styles.TrendCard} key={index}>
              <div className={styles.TrendCardInfo}>
                <span className={styles.TrendCardTitle}>{quiz.title}</span>
                <span>
                {quiz.impressions >= 1000
                  ? (quiz.impressions / 1000).toFixed(1) + "K"
                  : quiz.impressions}{" "}
                <img src={eye} alt="eye" className={styles.img} />
                </span>
              </div>
              <p className={styles.createdAt}>
                Created on : {new Date(quiz.createdAt).toLocaleDateString()}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default TrendCard;
