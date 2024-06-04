import React from 'react'

const PlayModal = () => {
    const [quiz, setQuiz] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [updatedAnswers, setUpdatedAnswers] = useState([]);
    const [timer, setTimer] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const {  } = useContext(Context)
    const [loading, setLoading] = useState(false)
  return (
    <div>PlayModal</div>
  )
}

export default PlayModal