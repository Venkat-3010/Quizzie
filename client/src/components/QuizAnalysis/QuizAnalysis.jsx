import React, { useEffect, useState } from "react";
import styles from "./QuizAnalysis.module.css";
import { quizAnalysis } from "../../api/apiQuiz";

const QuizAnalysis = ({ quizType, quiz_id }) => {
  const [quizzes, setQuizzes] = useState(null);

  useEffect(() => {
    const fetchQuizAnalysis = async () => {
      try {
        console.log();
        const response = await quizAnalysis(quiz_id);
        setQuizzes(response.quiz);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuizAnalysis();
  }, [quiz_id]);

  if (!quizzes) {
    return <div style={{ margin: "auto 50%" }}> Loading...</div>;
  }

  return (
    <>
      {quizzes && quizzes.questions ? (
        (
          <div className={styles.parentContainer}>
            <section className={styles.headingContainer}>
              <h1>{quizzes.title} Question Analysis</h1>
              <div>
                <b>
                  Created on :{" "}
                  {new Date(quizzes.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </b>
                <br />
                <b>Impressions : {quizzes.impressions}</b>
              </div>
            </section>
            <br />
            <br />
            {quizType === "Poll" ? (
              quizzes?.questions.map((question, index) => (
                <div key={index} className={styles.questionNumberBox}>
                  <h2>
                    Q.{index + 1} {question.question}
                  </h2>
                  <br />
                  <section className={styles.questionContainer}>
                    {
                      Object.entries(question.totalParticipants).map(
                        ([option, count], idx) => (
                          <div key={`${question.id}-${idx}`}>
                            <span>{count}</span>
                            <p>{`Option ${option}`}</p>
                          </div>
                        )
                      )}
                  </section>
                  <br />
                  <br />
                  <hr />
                  <br />
                </div>
              ))
            ) : (
              <div className={styles.parentContainer}>
                <br />
                <br />
                {quizzes.questions.map((question, index) => (
                  <div key={index} className={styles.questionNumberBox}>
                    <h2>
                      Q.{index + 1} {question.question}
                    </h2>
                    <br />
                    <section className={styles.questionContainer}>
                      <div>
                        <span>{question.totalParticipants ? question.totalParticipants : 0}</span>
                        <p>people Attempted the question</p>
                      </div>
                      <div>
                        <span>{question.correctAnswerCount}</span>
                        <p>people Answered Correctly</p>
                      </div>
                      <div>
                        <span>{question.wrongAnswerCount}</span>
                        <p>people Answered Incorrectly</p>
                      </div>
                    </section>
                    <br />
                    <br />
                    <hr />
                    <br />
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      ) : (
        <b>Quizzes Analysis loading</b>
      )}
    </>
  );
};

export default QuizAnalysis;
