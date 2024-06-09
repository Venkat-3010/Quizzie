const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { createQuiz, getAllQuizzesByUser, QuizAnalysis, getQuizById, getQuizByIdForUpdate, deleteQuiz, checkQuizAnswers } = require('../controller/quiz');

router.post('/createquiz', auth, createQuiz);
router.get('/user-quizzes/:id', auth, getAllQuizzesByUser);
router.get('/quizzes/:quiz_id/analysis', auth, QuizAnalysis);
router.get('/quizzes/:quiz_id', getQuizById);
router.patch('/quizzes/:quiz_id/update',auth, getQuizByIdForUpdate);
router.delete('/quizzes/:quiz_id/delete', auth, deleteQuiz);
router.patch('/quizzes/submit/:id', checkQuizAnswers);
module.exports = router;
