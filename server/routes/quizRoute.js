const express = require('express');
const router = express.Router();
const { createQuiz, getAllQuizzesByUser, QuizAnalysis, getQuizById, getQuizByIdForUpdate, deleteQuiz, checkQuizAnswers, totalQuizzes, totalQuestions, getQuizStatistics } = require('../controller/quizController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/createquiz', authMiddleware, createQuiz);
router.get('/user-quizzes', authMiddleware, getAllQuizzesByUser);
router.get('/quizzes/:id/analysis',authMiddleware, QuizAnalysis);
router.get('/quizzes/:id', getQuizById);
router.patch('/quizzes/:id/update', authMiddleware, getQuizByIdForUpdate);
router.delete('/quizzes/:id/delete', authMiddleware, deleteQuiz);
router.patch('/quizzes/:id/submit', checkQuizAnswers);
module.exports = router;
