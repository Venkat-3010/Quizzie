import { useContext, useState } from "react";

const QuizzieContextValues = () => {
//   const [mobileView, setMobileView] = useState(window.innerWidth < 750);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quizShareLink, setQuizShareLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [quiz_id, setQuiz_id] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [quizType, setQuizType] = useState("Q&A");

  const handleClose = () => {
    setIsOpen(false);
    setSelectedItem("Dashboard");
  };

  return {
    // mobileView,
    // setMobileView,
    selectedItem,
    setSelectedItem,
    isLoggedIn,
    setIsLoggedIn,
    quizShareLink,
    setQuizShareLink,
    isOpen,
    setIsOpen,
    quiz_id,
    setQuiz_id,
    quizTitle,
    setQuizTitle,
    quizType,
    setQuizType,
    handleClose,
  };
};

const UseQuizzieContext = () => useContext(QuizzieContextValues);

export { UseQuizzieContext, QuizzieContextValues };
