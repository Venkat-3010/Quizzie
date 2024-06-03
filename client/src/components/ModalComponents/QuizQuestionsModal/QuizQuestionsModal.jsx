import React, { useState } from "react";
import styles from "./QuizQuestionsModal.module.css";
import { createQuiz } from "../../../api/apiQuiz";
import { v4 as uuidv4 } from "uuid";
import QuizTimer from "../QuizTimer/QuizTimer";
import QuizSuccessModal from "../QuizSuccessModal/QuizSuccessModal";
import QuestionList from "../QuestionList/QuestionList";
import QuestionInput from "../QuestionInput/QuestionInput";
import OptionList from "../OptionList/OptionList";
import ControlButtons from "../ControlButtons/ControlButtons";
import axios from "axios";

const QuizQuestionsModal = ({
  onClose,
  quizTitle,
  quizType,
  quiz_id,
  setQuiz_id,
  shareQuizLink,
  setShareQuizLink,
}) => {
  const initialQuestion = {
    id: "initial",
    question: "",
    optionsType: "text",
    options: {
      option1: { text: "", imageUrl: "" },
      option2: { text: "", imageUrl: "" },
    },
    rightAnswer: "",
  };

  const [quizQuestions, setQuizQuestions] = useState([initialQuestion]);
  const [timer, setTimer] = useState("OFF");
  const [createdQuiz, setCreatedQuiz] = useState(false);
  const [questionIndex, setQuestionIndex] = useState("initial");

  const addExtraQuestion = () => {
    const id = uuidv4();
    const newQuestion = [...quizQuestions, { ...initialQuestion, id: id }];
    setQuizQuestions(newQuestion);
    setQuestionIndex(id);
  };

  const deleteExtraQuestion = (index) => {
    const newQuestion = quizQuestions.filter((q, i) => i !== index);
    if (newQuestion.length > 0) {
      setQuizQuestions(() => {
        setQuestionIndex(newQuestion[newQuestion.length - 1].id);
        return newQuestion;
      });
    } else {
      setQuizQuestions(() => {
        setQuestionIndex("initial");
        return newQuestion;
      });
    }
  };

  const optionChange = (options, type) => {
    let newOptionsValues = { ...options };
    Object.keys(options).forEach((optionKey) => {
      if (type === "text") {
        newOptionsValues[optionKey].imageUrl = "";
      } else if (type === "imageURL") {
        newOptionsValues[optionKey].text = "";
      }
    });
    return newOptionsValues;
  };

  const handleCreateQuiz = async () => {
    const validateOptions = (optionsType, options) => {
      return Object.keys(options).every((option) =>
        optionsType === "text"
          ? options[option].text.length > 0
          : options[option].imageUrl.length > 0
      );
    };

    const validateQuestion = (question) => {
      const isValidQuestion = question.question.length > 0;
      const isValidOptions = validateOptions(
        question.optionsType,
        question.options
      );
      const isValidRightAnswer =
        question.rightAnswer.length > 0 || quizType !== "Q&A";

      return isValidQuestion && isValidOptions && isValidRightAnswer;
    };

    const isValid = quizQuestions.every(validateQuestion);
    const createdBy = localStorage.getItem("id");

    if (isValid) {
      const formData = {
        title: quizTitle,
        questions: quizQuestions,
        timer: timer,
        createdBy: createdBy,
        quizType: quizType,
      };

      try {
        const data = await createQuiz(formData);
        if (data) {
          setCreatedQuiz(true);
          setShareQuizLink(`${window.location.origin}/sharedQuiz/${data._id}`);
          setQuiz_id(data.quiz_id);
          console.log(data);
        } else {
          console.error("No data returned from API.");
        }
      } catch (error) {
        console.error("Error creating quiz:", error.message);
        setCreatedQuiz(false); // Reset createdQuiz state if there's an error
      }
    } else {
      console.log("Invalid form submission");
    }
  };

  return (
    <>
      {!createdQuiz ? (
        <div className={styles.questionModalContainer}>
          <QuestionList
            quizQuestions={quizQuestions}
            setQuestionIndex={setQuestionIndex}
            deleteExtraQuestion={deleteExtraQuestion}
            addExtraQuestion={addExtraQuestion}
            questionIndex={questionIndex}
          />
          <QuestionInput
            quizQuestions={quizQuestions}
            questionIndex={questionIndex}
            setQuizQuestions={setQuizQuestions}
            quizType={quizType}
            handleOptionTypeChange={(e) => {
              const value = e.target.value;
              const updatedQuestions = quizQuestions.map((question) =>
                question.id === questionIndex
                  ? {
                      ...question,
                      optionsType: value,
                      options: optionChange(question.options, value),
                    }
                  : question
              );
              setQuizQuestions(updatedQuestions);
            }}
          />
          <div className={styles.optionAndTimerContainer}>
          <OptionList
            quizQuestions={quizQuestions}
            questionIndex={questionIndex}
            setQuizQuestions={setQuizQuestions}
            handleRemoveOption={(optionKey) => {
              const newQuestions = quizQuestions.map((question) => {
                if (question.id === questionIndex) {
                  const newOptions = { ...question.options };
                  delete newOptions[optionKey];
                  return { ...question, options: newOptions };
                }
                return question;
              });
              setQuizQuestions(newQuestions);
            }}
            handleAddOption={() => {
              const previousOptions = quizQuestions.find(
                (q) => q.id === questionIndex
              ).options;
              const newOptionKey = `option${
                Object.keys(previousOptions).length + 1
              }`;
              const newQuestions = quizQuestions.map((question) =>
                question.id === questionIndex
                  ? {
                      ...question,
                      options: {
                        ...previousOptions,
                        [newOptionKey]: {
                          text: "",
                          imageUrl: "",
                        },
                      },
                    }
                  : question
              );
              setQuizQuestions(newQuestions);
            }}
            quizType={quizType}
          />
          {quizType === "Q&A" && (
            <QuizTimer timer={timer} setTimer={setTimer} />
          )}
          </div>
          <ControlButtons
            onClose={onClose}
            handleCreateQuiz={handleCreateQuiz}
          />
        </div>
      ) : (
        <QuizSuccessModal shareQuizLink={shareQuizLink} onClose={onClose} />
      )}
    </>
  );
};

export default QuizQuestionsModal;
