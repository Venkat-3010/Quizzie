const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createQuiz, getQuizzes, shareQuiz, takeQuiz, submitQuiz } = require('../controller/quizController');

router.post('/createquiz', auth, createQuiz);
router.get('/quizzes', auth, getQuizzes);
router.post('/quiz/:id/share', shareQuiz);
router.get('/quiz/:id', takeQuiz);
router.post('/quiz/:id/submit', submitQuiz);

module.exports = router;
