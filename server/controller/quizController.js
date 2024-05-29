const Quiz = require("../models/Quiz");
const User = require("../models/User");

const createQuiz = async (req, res) => {
  const { title, questions, type, timer } = req.body;

  if (!title || !questions || !type) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const newQuiz = new Quiz({
      title,
      questions: questions.map((q) => ({
        ...q,
        totalParticipants: 0,
        wrongAnswerCount: 0,
        correctAnswerCount: 0,
      })),
      type,
      timer,
      createdBy: req.user.id,
    });
    await newQuiz.save();

    res.status(201).json({ success: true, quizId: req.user.id });
  } catch (error) {
    console.log("error creating quiz", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getAllQuizzesByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const quizzes = await Quiz.find({ createdBy: userId });

    const filteredQuizzes = quizzes.map((quiz) => {
      const questionsWithoutAnswer = quiz.questions.map(
        ({ rightAnswer, ...rest }) => rest
      );
      return {
        ...quiz,
        questions: questionsWithoutAnswer,
      };
    });

    const sortedQuizzes = filteredQuizzes
      .filter((quiz) => quiz.impressions > 10)
      .sort((a, b) => b.impressions - a.impressions);

    res.json({
      success: true,
      totalQuizzes: filteredQuizzes.length,
      quizzes: sortedQuizzes,
    });
  } catch (error) {
    console.log("error getting quizzes", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
    quiz.title = req.body.title;
    quiz.questions = req.body.questions.map((q) => ({
      ...q,
      totalParticipants: 0,
      wrongAnswerCount: 0,
      correctAnswerCount: 0,
    }));
    quiz.timer = req.body.timer;
    await quiz.save();
    res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
    });
  } catch (error) {
    console.log("error updating quiz", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
    quiz.impressions += 1;
    await quiz.save();
    const questionsWithoutAnswers = quiz.questions.map(
      ({ rightAnswer, ...rest }) => rest
    );
    quiz.questions = questionsWithoutAnswers;
    res.status(200).json({
      success: true,
      quiz,
    });
  } catch (error) {
    console.log("error getting quiz", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
    await quiz.remove();
    res.status(200).json({
      success: true,
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    console.log("error deleting quiz", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const checkQuizAnswers = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const { answers } = req.body;
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.rightAnswer === answers[index]) {
        question.correctAnswerCount += 1;
        score += 1;
      } else {
        question.wrongAnswerCount += 1;
      }
      question.totalParticipants += 1;
    });

    await quiz.save();
    res.status(200).json({
      success: true,
      message: "Quiz answers checked successfully",
      score,
    });
  } catch (error) {
    console.log("error checking quiz answers", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getQuizByIdForUpdate = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
    res.status(200).json({
      success: true,
      quiz,
    });
  } catch (error) {
    console.log("error getting quiz", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createQuiz,
  getAllQuizzesByUser,
  updateQuiz,
  getQuizById,
  deleteQuiz,
  checkQuizAnswers,
  getQuizByIdForUpdate,
};
