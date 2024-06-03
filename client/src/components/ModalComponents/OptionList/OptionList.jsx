import React from "react";
import styles from "../QuizQuestionsModal/QuizQuestionsModal.module.css";
import deleteIcon from "../../../assets/material-symbols_delete.png";

const OptionList = ({
  quizQuestions,
  questionIndex,
  setQuizQuestions,
  handleRemoveOption,
  handleAddOption,
  quizType,
}) => {
  const handleInputOptions = (event, type, option) => {
    const { value } = event.target;
    const newQuestions = quizQuestions.map((question) => {
      if (question.id === questionIndex) {
        const updatedOptions = {
          ...question.options,
          [option]: {
            ...question.options[option],
            [type]: value,
          },
        };
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    setQuizQuestions(newQuestions);
  };

  const correctOptionStyle = {
    backgroundColor: "#60B84B",
    color: "#fff",
  };

  return (
    <div className={styles.optionAndTimer}>
      <div className={styles.optionsContainer}>
        {Object.keys(
          quizQuestions.find((q) => q.id === questionIndex)?.options || {}
        ).map((option) => (
          <div key={option} className={styles.option}>
            {quizType === "Q&A" && (
              <input
                type="radio"
                className={styles.optionRadioBtn}
                value={option}
                onChange={(event) => {
                  const updatedQuestions = quizQuestions.map((question) => {
                    if (question.id === questionIndex) {
                      return { ...question, rightAnswer: event.target.value };
                    }
                    return question;
                  });
                  setQuizQuestions(updatedQuestions);
                }}
                checked={
                  quizQuestions.find((q) => q.id === questionIndex)
                    ?.rightAnswer === option
                }
              />
            )}
            {["text", "textAndImageURL"].includes(
              quizQuestions.find((q) => q.id === questionIndex)?.optionsType
            ) && (
              <input
                type="text"
                className={styles.optionInput}
                value={
                  quizQuestions.find((q) => q.id === questionIndex)?.options[
                    option
                  ].text || ""
                }
                onChange={(e) => handleInputOptions(e, "text", option)}
                placeholder="Text"
                style={
                  quizQuestions.find((q) => q.id === questionIndex)
                    ?.rightAnswer === option
                    ? correctOptionStyle
                    : {}
                }
              />
            )}
            {["imageURL", "textAndImageURL"].includes(
              quizQuestions.find((q) => q.id === questionIndex)?.optionsType
            ) && (
              <input
                type="text"
                className={styles.optionInput}
                value={
                  quizQuestions.find((q) => q.id === questionIndex)?.options[
                    option
                  ].imageUrl || ""
                }
                onChange={(e) => handleInputOptions(e, "imageUrl", option)}
                placeholder="Image URL"
                style={
                  quizQuestions.find((q) => q.id === questionIndex)
                    ?.rightAnswer === option
                    ? correctOptionStyle
                    : {}
                }
              />
            )}
            {option !== "option1" && option !== "option2" && (
              <img
                src={deleteIcon}
                alt="delete option"
                onClick={() => handleRemoveOption(option)}
                className={styles.deleteOptionIcon}
              />
            )}
          </div>
        ))}
        {Object.keys(
          quizQuestions.find((q) => q.id === questionIndex)?.options || {}
        ).length < 4 && (
          <button className={styles.addOptionBtn} onClick={handleAddOption}>
            Add option
          </button>
        )}
      </div>
    </div>
  );
};

export default OptionList;