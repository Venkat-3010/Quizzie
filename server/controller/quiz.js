const Quiz = require("../models/quiz");
const User = require("../models/user");

const createQuiz = async (req, res) => {
  const { title, questions, type, timer } = req.body;

  // if (!title || !questions || !type) {
  //   return res.status(400).json({
  //     message: "All fields are required",
  //   });
  // }

  try {
    const newQuiz = await Quiz.create({
      title,
      questions,
      type,
      timer,
      // createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: `${title} created successfully`,
      quiz_id: newQuiz._id,
    });
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
    const user = req.user;
    const { sortedQuizzes } = req.headers;
    const quizzes = (await sortedQuizzes)
      ? await Quiz.find({ createdBy: user }).sort(JSON.parse(sortedQuizzes))
      : await Quiz.find({ createdBy: user });
    res.json({
      success: true,
      quizzes,
    });
  } catch (error) {
    console.log("error getting quizzes", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const QuizAnalysis = async (req, res) => {
  const {id} = req.params
  try {
    const quiz = await Quiz.findOne({createdAt: req.user, _id: id});
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Quiz found successfully",
      quiz
    });
  } catch (error) {
    console.log("error updating quiz", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// for quiz details and impressions on the start page
const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findOne({ _id: id });
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
    quiz.impressions += 1;
    const newQuizData = await quiz.save();

    res.status(200).json({
      success: true,
      quizData: newQuizData,
      message: "fetching data successful",
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
    const { id } = req.params;
    const quiz = await Quiz.findOne({ _id: id, createdBy: req.user });
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
    await quiz.deleteOne({ _id: id, createdBy: req.user });
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
  const { id } = req.params;

  try {
    const quiz = await Quiz.findOne({ _id: id });
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
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
  const { id } = req.params;
  const { title, timer } = req.body;
  try {
    const quiz = await Quiz.findOne({ _id: id, createdBy: req.user });
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
    quiz.questions = questions;
    quiz.timer = timer;
    const updateQuiz = await quiz.save();
    res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
      updateQuiz,
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
  QuizAnalysis,
  getQuizById,
  deleteQuiz,
  checkQuizAnswers,
  getQuizByIdForUpdate,
};
