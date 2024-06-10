import React, { useContext } from 'react'
import styles from "./CreateQuiz.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import CreateQuizModal from '../../components/ModalComponents/CreateQuizModal/CreateQuizModal'
import { QuizzieContext } from '../../App';

const CreateQuizPage = () => {
  
    const {selectedItem, setSelectedItem, setIsOpen, isOpen, setQuiz_id, quizTitle, setQuizTitle, setQuizType, quizType, quiz_id, handleClose} = useContext(QuizzieContext);

  return (
    <div className={styles.dashboardContainer}>
        <Sidebar
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          onOpenModal={() => setIsOpen(true)}
        />
        {isOpen && (
            <div className={styles.modalOverlay}>
              <CreateQuizModal
                quiz_id={quiz_id}
                setQuiz_id={setQuiz_id}
                quizTitle={quizTitle}
                setQuizTitle={setQuizTitle}
                quizType={quizType}
                setQuizType={setQuizType}
                onClose={handleClose}
              />
            </div>
          )}
    </div>
  )
}

export default CreateQuizPage