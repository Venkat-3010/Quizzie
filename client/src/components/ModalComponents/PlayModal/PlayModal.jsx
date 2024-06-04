import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkQuizAnswers, getQuizById } from "../../../api/apiQuiz";
import styles from "./PlayModal.module.css";
import { toast } from "react-toastify";
import PlayResultModal from "../PlayResultModal/PlayResultModal";

const PlayModal = () => {
  const [quizzes, setQuizzes] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(null);
  const [score, setScore] = useState(0);
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlayQuiz = async () => {
    try {
      const response = await getQuizById(id);
      setQuizzes(response.quiz);
      setTimer(response.quiz.timer);
      setAnswers(
        response.quiz.questions.map((question) => ({
          _id: question._id,
          question: question.question,
          userAnswer: "",
        }))
      );
    } catch (error) {
      console.error("Error fetching quiz:", error);
      toast.warn(error.message, {
        theme: "dark",
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    handlePlayQuiz();
  }, [id]);

  useEffect(() => {
    if (timer === 0) {
      if (questionIndex < quizzes?.questions?.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setTimer(quizzes.timer);
      } else {
        submitQuestion();
      }
    } else {
      const timeLeft = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timeLeft);
    }
  }, [timer]);

  const nextQuestion = () => {
    if (questionIndex < quizzes.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setTimer(quizzes.timer);
    }
  };

  const handleOptionClick = (option) => {
    const newUserAnswers = [...answers];
    newUserAnswers[questionIndex].userAnswer = option;
    setAnswers(newUserAnswers);
  };

  const submitQuestion = async () => {
    try {
      const formattedAnswers = answers.map((key) => ({
        ...key,
        userAnswer: key.userAnswer,
      }));

      const response = await checkQuizAnswers(id, {
        answers: formattedAnswers,
      });
      if (quizzes.quizType === "Poll") {
        toast.success("Thanks for participating in the poll!");
      } else {
        setScore(`${response.score}/${quizzes.questions.length}`);
        toast.success("Thanks for participating in the quiz!");
      }
      setIsSubmitting(true);
    } catch (error) {
      console.error("Error submitting quiz answers:", error);
    }
  };

  const renderOptions = () => {
    return question.options.map((option, index) => {
      let optionText, optionUrl;
      if (question.optionType === "textAndImageURL") {
        [optionText, optionUrl] = option.split("|");
      }
      return (
        <div
          key={index}
          className={
            option === answers[questionIndex]?.userAnswer
              ? styles.selectedOption
              : ""
          }
          onClick={() => handleOptionClick(option)}
        >
          {question.optionType === "text" ? (
            option
          ) : question.optionType === "imageURL" ? (
            <img src={option} alt="Option" />
          ) : question.optionType === "textAndImageURL" ? (
            <div className={styles.textAndUrl}>
              <img src={optionUrl} alt="Option" />
              <p>{optionText}</p>
            </div>
          ) : null}
        </div>
      );
    });
  };

  const question = quizzes?.questions[questionIndex];

  return (
    <>
      {!isSubmitting ? (
        <div className={styles.parent}>
          <div className={styles.childBox}>
            {quizzes && question && (
              <>
                <section className={styles.section_1}>
                  <span>
                    {questionIndex + 1}/{quizzes.questions.length}
                  </span>
                  {quizzes.quizType !== "Poll" && (
                    <span className={styles.timer}>00:{timer}s</span>
                  )}
                </section>
                <h1>{question.question}</h1>
                <section className={styles.section_2}>{renderOptions()}</section>
                {questionIndex < quizzes.questions.length - 1 ? (
                  <button onClick={nextQuestion}>Next</button>
                ) : (
                  <button onClick={submitQuestion}>Submit</button>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <PlayResultModal quizType={quizzes.quizType} score={score} />
      )}
    </>
  );
};

export default PlayModal;
