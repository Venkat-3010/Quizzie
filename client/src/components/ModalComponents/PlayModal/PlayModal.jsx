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
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuizById(id);
        console.log(response);
        const quiz = response.quiz;

        const formattedOptions = quiz.questions.map((question) => ({
          ...question,
          options:  Object.keys(question.options[0]) 
          .filter(key => question.options[0][key].text || question.options[0][key].imageURL) 
          .map(key => ({ [key]: question.options[0][key] }))
        }));
        console.log(formattedOptions);

        setQuizzes({ ...quiz, questions: formattedOptions  });
        setTimer(response.quiz.timer);
        setAnswers(
          formattedOptions.map((question) => ({
            _id: question._id,
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
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    let timerLeft;
    if (timer === 0) {
      if (questionIndex < quizzes.questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setTimer(quizzes.timer);
      } else {
        submitQuestion();
      }
    } else if (timer !== null) {
      timerLeft = setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => clearTimeout(timerLeft);
  }, [timer, questionIndex, quizzes]);

  const nextQuestion = () => {
    if (questionIndex < quizzes.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setTimer(quizzes.timer);
    }
  };

  const handleOptionClick = (option) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer, index) =>
        index === questionIndex ? { ...answer, userAnswer: option } : answer
      )
    );
  };

  const submitQuestion = async () => {
    try {
      const formattedAnswers = answers.map((answer) => ({
        ...answer,
        userAnswer: answer.userAnswer,
      }));
      console.log(formattedAnswers);

      const response = await checkQuizAnswers(id, {answers : formattedAnswers});
      if (quizzes.quizType === "Poll") {
        toast.success("Thanks for participating in the poll!");
      } else {
        console.log(response.score);
        setScore(`${response.score}/${quizzes.questions.length}`);
        toast.success("Thanks for participating in the quiz!");
      }
      setShowResult(true);
    } catch (error) {
      console.error("Error submitting quiz answers:", error);
    }
  };

  return (
    <>
      {!showResult ? (
        <div className={styles.parent}>
          <div className={styles.childBox}>
            {quizzes && quizzes.questions[questionIndex] && (
              <>
                <section className={styles.section_1}>
                  <span>
                    {questionIndex + 1}/{quizzes.questions.length}
                  </span>
                  {quizzes.type !== "Poll" && (
                    <span className={styles.timer}>00:{timer}s</span>
                  )}
                </section>
                <h1>{quizzes.questions[questionIndex].question}</h1>
                <section className={styles.section_2}>
                  {quizzes.questions[questionIndex].options.map(
                    (option, index) => {
                      const optionKey = Object.keys(option)[0];
                      return (
                        <div
                          key={index}
                          className={`${styles.option} ${
                            option === answers[questionIndex]?.userAnswer
                              ? styles.selectedOption
                              : ""
                          }`}
                          onClick={() => handleOptionClick(option)}
                        >
                          {quizzes.questions[questionIndex].optionsType ===
                            "text" && option[optionKey].text}
                          {quizzes.questions[questionIndex].optionsType ===
                            "imageURL" && (
                            <img src={option[optionKey].imageURL} alt="Option" />
                          )}
                          {quizzes.questions[questionIndex].optionsType ===
                            "textAndImageURL" && (
                            <div className={styles.textAndUrl}>
                              <img src={option[optionKey].imageURL} alt="Option" />
                              <p>{option[optionKey].text}</p>
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                </section>
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
        <PlayResultModal quizType={quizzes.type} score={score} />
      )}
    </>
  );
};

export default PlayModal;
