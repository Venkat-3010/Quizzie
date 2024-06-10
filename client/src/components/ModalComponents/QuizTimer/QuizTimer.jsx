import React, { useState } from 'react'
import styles from './QuizTimer.module.css';

const QuizTimer = ({timer, setTimer}) => {
  const [time, setTime] = useState(timer || "OFF")
  const handleQuizTimer = (event) => {
    setTime(event.target.value)
    setTimer(event.target.value)
  }
  return (
    <div className={styles.QuizTimerContainer}>
        <b>Timer</b>
        <button className={`${styles.timerOff}${time === 'OFF' ? styles.selected : '' }`}
            onClick={handleQuizTimer}
            value={'OFF'}
        >
            OFF
        </button>
        <button className={`${styles.timerOn}${time === '5' ? styles.selected : '' }`}
            onClick={handleQuizTimer}
            value={'5'}
        >
            5 Sec
        </button>
        <button className={`${styles.timerOn}${time === '10' ? styles.selected : '' }`}
            onClick={handleQuizTimer}
            value={'10'}
        >
            10 Sec
        </button>
    </div>
  )
}

export default QuizTimer