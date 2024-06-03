import React from "react";
import styles from "../QuizQuestionsModal/QuizQuestionsModal.module.css";

const QuestionInput = ({
  quizQuestions,
  questionIndex,
  setQuizQuestions,
  quizType,
  handleOptionTypeChange,
}) => {
  const handleInputChange = (event, type) => {
    const value = event.target.value;
    const updatedQuestions = quizQuestions.map((question) => {
      if (question.id === questionIndex) {
        if (type === "question") {
          return { ...question, question: value };
        } else if (type === "rightAnswer") {
          return { ...question, rightAnswer: value };
        }
      }
      return question;
    });
    setQuizQuestions(updatedQuestions);
  };

  return (
    <>
      <label style={{ position: "relative" }}>
        <input
          type="text"
          className={styles.question}
          placeholder={quizType === "Q&A" ? "Q&A Question" : "Poll Question"}
          value={
            quizQuestions.find((q) => q.id === questionIndex)?.question || ""
          }
          onChange={(event) => handleInputChange(event, "question")}
        />
      </label>
      <div className={styles.optionTypesContainer}>
        Option Type
        <label htmlFor="text">
          <input
            type="radio"
            value="text"
            onChange={handleOptionTypeChange}
            checked={
              quizQuestions.find((q) => q.id === questionIndex)?.optionsType ===
              "text"
            }
            name="questionOptionType"
            id="text"
          />
          Text
        </label>
        <label htmlFor="imageURL">
          <input
            type="radio"
            value="imageURL"
            onChange={handleOptionTypeChange}
            checked={
              quizQuestions.find((q) => q.id === questionIndex)?.optionsType ===
              "imageURL"
            }
            name="questionOptionType"
            id="imageURL"
          />
          Image URL
        </label>
        <label htmlFor="textAndImageURL">
          <input
            type="radio"
            value="textAndImageURL"
            onChange={handleOptionTypeChange}
            checked={
              quizQuestions.find((q) => q.id === questionIndex)
                ?.optionsType === "textAndImageURL"
            }
            name="questionOptionType"
            id="textAndImageURL"
          />
          Text & Image URL
        </label>
      </div>
    </>
  );
};

export default QuestionInput;
