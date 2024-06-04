const Quiz = require("../models/quiz");
const User = require("../models/user");

const createQuiz = async (req, res) => {
  const { title, questions, type, timer, createdBy } = req.body;

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
      createdBy,
    });

    res.status(201).json({
      success: true,
      message: `${title} created successfully`,
      quiz_id: newQuiz._id,
      newQuiz,
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
  const id = req.params.id;
  try {
    const quiz = await Quiz.find({ createdBy: id });
    let sortQuiz = quiz.map((quiz) => {
      let newQuiz = quiz.toObject();
      newQuiz.questions.forEach((question) => {
        delete question.rightAnswer;
      });
      return newQuiz;
    });

    let sortedImpressions = [...sortQuiz].sort(
      (a, b) => b.impressions - a.impressions
    );
    let sortedByDate = [...sortQuiz].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    let trendQuiz = sortedImpressions.filter((quiz) => quiz.impressions > 10);
    res.json({
      success: true,
      quizTotal: sortQuiz.length,
      sortedImpressions: sortedImpressions,
      sortedByDate: sortedByDate,
      trendQuiz: trendQuiz,
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
  const { id } = req.params;
  try {
    const quiz = await Quiz.findOne({ createdAt: req.user, _id: id });
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Quiz found successfully",
      quiz,
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
    const { quiz_id } = req.params;
    const quiz = await Quiz.findById(quiz_id);
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
    quiz.impressions += 1;

    let newQuiz = quiz.toObject();

    newQuiz.questions.forEach((question) => {
      delete question.rightAnswer;
    });

    res.status(200).json({
      success: true,
      quiz: newQuiz,
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
    const {id} = req.params;
    const { quiz_id } = req.params;
    console.log(quiz_id);
    const quiz = await Quiz.findOne({ _id: quiz_id, createdBy: id});
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    await quiz.deleteOne();
    res.status(200).json({
      success: true,
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting quiz:", error.message);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const checkQuizAnswers = async (req, res) => {
  const { quiz_id } = req.body;

  try {
    const quiz = await Quiz.findById(quiz_id);
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    const { answers, questions } = req.body;
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
  const { quiz_id } = req.params;
  const { timer, questions, title } = req.body;
  try {
    const quiz = await Quiz.findById(quiz_id);
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
    quiz.questions = questions;
    quiz.title = title;
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
