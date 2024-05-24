const Quiz = require('../models/Quiz');
const User = require('../models/User');

const createQuiz = async (req, res) => {
    const {title, questions, type} = req.body;

    if( !title || !questions || !type ) {
        return res.status(400)
        .json({
            message: 'All fields are required'
        });
    }

    try{
        const newQuiz = new Quiz({title, questions, type, createdBy: req.user.id});
        const quiz = await newQuiz.save();
        await User.findByIdAndUpdate(req.user.id, { $push: { quizzes: quiz.id } });

        res.json(quiz);
    }catch(error){
        console.log('error creating quiz', error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

const getQuizzes = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).populate('quizzes');
        res.json(user.quizzes);
    } catch(error){
        console.log('error getting quizzes', error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

const shareQuiz = async (req, res) => {
    try{
        const quiz = await Quiz.findById(req.params.id);
        if(!quiz){
            return res.status(404).json({
                message: 'Quiz not found'
            });
        }
        quiz.impressions += 1;
        await quiz.save();
        res.json(quiz);
    }catch(error){
        console.log('error sharing quiz', error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

const takeQuiz = async (req, res) => {
    try{
        const quiz = await Quiz.findById(req.params.id);
        if(!quiz){
            return res.status(404).json({
                message: 'Quiz not found'
            });
        }
        res.json(quiz);
    }catch(error){
        console.log('error taking quiz', error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

const submitQuiz = async (req, res) => {
    const { answers } = req.body;

    if(!answers){
        return res.status(400)
       .json({
            message: 'answer required'
       });
    }

    try{
        const quiz = await Quiz.findById(req.params.id);
        if(!quiz){
            return res.status(404).json({
                message: 'Quiz not found'
            });
        }
        if(quiz.type === 'Q&A'){
            let score = 0;
            quiz.questions.forEach((q, index) => {
                if(q.answer === answers[index]){
                    score += 1;
                }
            });
            res.json({
                score
            });
        } else {
            res.json({
                message: 'Poll quiz submitted'
            });
        }
    } catch(error) {
        console.log('error submitting quiz', error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

module.exports = { createQuiz, takeQuiz, getQuizzes, shareQuiz, submitQuiz };