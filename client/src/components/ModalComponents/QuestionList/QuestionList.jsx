import React from "react";
import styles from "../QuizQuestionsModal/QuizQuestionsModal.module.css";

const QuestionList = ({
  quizQuestions,
  setQuestionIndex,
  deleteExtraQuestion,
  addExtraQuestion,
  questionIndex,
}) => {
  const selected = {
    border: "2px solid #60B84B",
  };

  return (
    <div className={styles.questionsNumbersRounded}>
      <div className={styles.RoundedNumber}>
        {quizQuestions.map((question, index) => (
          <button
            key={index}
            id={question.id}
            onClick={() => setQuestionIndex(question.id)}
            className={styles.questionNumber}
            style={questionIndex === question.id ? selected : {}}
          >
            {index + 1}
            {index !== 0 && (
              <span
                className={styles.removeQuestion}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteExtraQuestion(index);
                }}
              >
                X
              </span>
            )}
          </button>
        ))}
        {quizQuestions.length < 5 && (
          <button className={styles.PlusBtn} onClick={addExtraQuestion}>
            +
          </button>
        )}
      </div>
      <span className={styles.modalNote}>Max 5 questions</span>
    </div>
  );
};

export default QuestionList;