const express = require('express');
const router = express.Router();
const { createQuiz, getAllQuizzesByUser, updateQuiz, getQuizById, getQuizByIdForUpdate, deleteQuiz, checkQuizAnswers } = require('../controller/quizController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/createquiz', authMiddleware, createQuiz);
router.get('/user-quizzes/:id', authMiddleware, getAllQuizzesByUser);
router.put('/quizzes/:quizId/update', authMiddleware, updateQuiz);
router.get('/quizzes/:quizId', getQuizById);
router.post('/quizzes/:quizId/edit', getQuizByIdForUpdate);
router.delete('/quizzes/:quizId/delete', authMiddleware, deleteQuiz);
router.post('/quizzes/:quizId/answers', checkQuizAnswers);

module.exports = router;
