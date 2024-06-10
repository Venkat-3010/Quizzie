import { getQuizByIdForUpdate, quizAnalysis } from "../../../api/apiQuiz";
import { QuizzieContext } from "../../../App";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import styles from "./UpdateQuizModal.module.css";
import OptionList from "../OptionList/OptionList";
import QuizTimer from "../QuizTimer/QuizTimer";
import ControlButtons from "../ControlButtons/ControlButtons";
import QuizSuccessModal from "../QuizSuccessModal/QuizSuccessModal";
import QuestionList from "../QuestionList/QuestionList";
import QuestionInput from "../QuestionInput/QuestionInput";
import { useContext, useEffect, useState } from "react";

const UpdateQuizModal = ({ onClose, updateQuiz }) => {
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

  const { quizShareLink, setQuizShareLink } = useContext(QuizzieContext);
  const [quizType, setQuizType] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [timer, setTimer] = useState("OFF");
  const [createdQuiz, setCreatedQuiz] = useState(false);
  const [questionIndex, setQuestionIndex] = useState("initial");

  useEffect(() => {
    if (updateQuiz) {
      (async () => {
        try {
          const response = await quizAnalysis(updateQuiz);
          setQuizType(response.quiz.quizType);
          setQuizQuestions(response.quiz.questions);
          setTimer(response.quiz.timer);
          setQuestionIndex(response.quiz.questions[0]?.id || "initial");
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [updateQuiz]);

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

  const handleUpdateQuiz = async () => {
    const validateOptions = (optionsType, options) => {
      if (!options) return false;

      return Object.keys(options).every((option) =>
        optionsType === "text"
          ? options[option]?.text.length > 0
          : options[option]?.imageUrl.length > 0
      );
    };

    const validateQuestion = (question) => {
      if (!question) return false;

      const isValidQuestion = question.question.length > 0;
      const isValidOptions = validateOptions(
        question.optionsType,
        question.options
      );
      const isValidRightAnswer = question.rightAnswer || quizType !== "Q&A";

      return isValidQuestion && isValidOptions && isValidRightAnswer;
    };

    const isValid = quizQuestions.every(validateQuestion);

    if (isValid) {
      const quiz_id = updateQuiz;

      try {
        const response = await getQuizByIdForUpdate(quiz_id, {
          quizQuestions,
          timer,
        });
        if (response) {
          setCreatedQuiz(true);
          setQuizShareLink(
            `${window.location.origin}/sharedQuiz/${response.id}`
          );
        } else {
          console.error("No data returned from API.");
          toast.error(`An error occurred while updating the quiz`);
        }
      } catch (error) {
        console.error(
          `An error occurred while updating the quiz:`,
          error.message
        );
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || "Server error");
        } else if (error.request) {
          toast.error("Network error");
        } else {
          toast.error("An unexpected error occured");
        }
      }
    } else {
      console.log("Invalid form submission");
    }
  };

  return (
    <>
      {!createdQuiz ? (
        quizQuestions.length > 0 ? (
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
              {quizQuestions.length > 0 && (
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
              )}
              {quizType === "Q&A" && (
                <QuizTimer timer={timer} setTimer={setTimer} />
              )}
            </div>
            <ControlButtons
              onClose={onClose}
              handleCreateQuiz={handleUpdateQuiz}
              updateQuiz={updateQuiz}
            />
          </div>
        ) : (
          <div>Loading quiz data...</div>
        )
      ) : (
        <QuizSuccessModal quizShareLink={quizShareLink} onClose={onClose} />
      )}
    </>
  );
};
export default UpdateQuizModal;
