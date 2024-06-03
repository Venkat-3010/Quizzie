import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const QuizQuestionsModal = ({
  onClose,
  quizTitle,
  quizType,
  quiz_id,
  setQuiz_id,
  shareQuizLink,
  setShareQuizLink,
}) => {
  const initialQuestionState = {
    id: 1,
    question: "",
    optionsType: "",
    options: {
      option1: {
        text: "",
        imageUrl: "",
      },
      option2: {
        text: "",
        imageUrl: "",
      },
    },
    rightAnswer: "",
  };

  const [quizQuestions, setQuizQuestions] = useState([initialQuestionState]);
  const [timer, setTimer] = useState([]);
  const [creationSuccess, setCreationSuccess] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(1);

  const addExtraQuestion = () => {
    const newQuestion = [...quizQuestions, ...initialQuestionState];
    setQuizQuestions(newQuestion);
    setQuestionIndex(questionIndex + 1);
    if (quizQuestions[questionIndex].optionsType === "") {
      quizQuestions[questionIndex].options = "text";
    }
  };

  const deleteExtraQuestion = () => {
    setQuizQuestions(quizQuestions.slice(0, quizQuestions.length - 1));
    if (quizQuestions.length > 0) {
      setQuestionIndex(quizQuestions[questionIndex - 1]);
      return quizQuestions;
    } else {
      setQuestionIndex(1);
      return quizQuestions;
    }
  };

  useEffect(() => {
    quizQuestions[questionIndex]?.question || "";
    questionIndex[questionIndex]?.options || [""];
  }, [questionIndex, quizQuestions]);
  
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

  const handleCreateQuizQuestions = async () => {
    const isValidQuizQuestions = quizQuestions.every((question) =>
      validateQuestion(question)
    );
    if (isValidQuizQuestions) {
      setCreationSuccess(true);
    }
  };

  return <div></div>;
};

export default QuizQuestionsModal;
