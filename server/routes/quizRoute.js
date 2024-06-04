const express = require('express');
const router = express.Router();
const { createQuiz, getAllQuizzesByUser, QuizAnalysis, getQuizById, getQuizByIdForUpdate, deleteQuiz, checkQuizAnswers } = require('../controller/quiz');


const authMiddleware = require('../middlewares/authMiddleware');
router.post('/createquiz', createQuiz);
router.get('/user-quizzes/:id', getAllQuizzesByUser);
router.get('/quizzes/:quiz_id/analysis', QuizAnalysis);
router.get('/quizzes/:quiz_id', getQuizById);
router.patch('/quizzes/:quiz_id/update', getQuizByIdForUpdate);
router.delete('/quizzes/:quiz_id/:id/delete', deleteQuiz);
router.patch('/quizzes/submit', checkQuizAnswers);
module.exports = router;
