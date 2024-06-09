const Quiz = require("../models/quiz");
const User = require("../models/user");

const createQuiz = async (req, res) => {
  const { title, questions, type, timer } = req.body;
  const createdBy = req.user._id;

  if (!title || !questions || !type) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const newQuiz = await Quiz.create({
      title,
      questions: questions.map((q) => {
        console.log(q);
        if (type === "Poll") {
          const totalParticipants = {};
          if (q.options) {
            Object.keys(q.options).forEach((option) => {
              totalParticipants[option] = 0;
            });
          }
          console.log(totalParticipants);
          return {
            ...q,
            totalParticipants,
          };
        } else if (type === "Q&A") {
          return {
            ...q,
            totalParticipants: 0,
          };
        }
        return q;
      }),
      type,
      timer,
      createdBy,
    });

    await newQuiz.save();

    res.status(201).json({
      success: true,
      message: `${title} created successfully`,
      id: newQuiz._id,
      quiz: newQuiz,
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
  const id = req.user._id;
  try {
    const quizzes = await Quiz.find({ createdBy: id });
    let sortedQuizzes = quizzes.map((quiz) => {
      let newQuiz = quiz.toObject();
      return newQuiz;
    });

    sortedQuizzes.forEach((quiz) => {
      quiz.questions.forEach((question) => {
        delete question.rightAnswer;
      });
    });

    let sortedImpressions = [...sortedQuizzes].sort(
      (a, b) => b.impressions - a.impressions
    );
    let sortedByDate = [...sortedQuizzes].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    let trendQuiz = sortedImpressions.filter((quiz) => quiz.impressions > 10);
    res.json({
      success: true,
      quizTotal: sortedQuizzes.length,
      sortedImpressions,
      sortedByDate,
      trendQuiz: trendQuiz,
      id,
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
  try {
    const { quiz_id } = req.params;
    const userId = req.user._id;
    console.log(quiz_id);
    const quiz = await Quiz.findOne({ _id: quiz_id, createdBy: userId });
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
    await quiz.save();

    let newQuiz = quiz.toObject();

    newQuiz.questions.forEach((question) => {
      delete question.rightAnswer;
    });

    res.status(200).json({
      success: true,
      quiz,
      message: "fetching data successful",
      impressions: quiz.impressions,
    });
  } catch (error) {
    console.log("error getting quiz", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const deleteQuiz = async (req, res) => {
  const { quiz_id } = req.params;
  const userId = req.user._id;
  try {
    const quiz = await Quiz.findOne({ _id: quiz_id, createdBy: userId });
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
  let { id } = req.params;

  try {
    let quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    const {answers}  = req.body.answers;
    let score = 0;
    const updatedQuestions = [];

    quiz.questions.forEach((question) => {
      const userAnswer = answers.find(
        (ans) => ans._id.toString() === question._id.toString()
      );

      if (quiz.type === "Q&A") {
        const userAnswerKey = Object.keys(userAnswer.userAnswer)[0];
        if (userAnswer && question.rightAnswer === userAnswerKey) {
          question.correctAnswerCount += 1;
          score += 1;
        } else {
          question.wrongAnswerCount += 1;
        }
        question.totalParticipants += 1;
      } else if (quiz.type === "Poll") {
        if (userAnswer) {
          const userAnswerKey = Object.keys(userAnswer.userAnswer)[0];
          if (question.options[0][userAnswerKey]) {
            if (!question.totalParticipants[userAnswerKey]) {
              question.totalParticipants[userAnswerKey] = 0;
            }
            question.totalParticipants[userAnswerKey] += 1;
            console.log("totalParticipants", question.totalParticipants);
          } else {
            console.log(
              "Selected option not found in question options:",
              question.options
            );
          }
        }
      }
      updatedQuestions.push(question);
    });
    const bulkOps = updatedQuestions.map((question) => ({
      updateOne: {
        filter: { "questions._id": question._id },
        update: {
          $set: {
            "questions.$.totalParticipants": question.totalParticipants,
            "questions.$.correctAnswerCount": question.correctAnswerCount,
            "questions.$.wrongAnswerCount": question.wrongAnswerCount,
          },
        },
      },
    }));

    await Quiz.bulkWrite(bulkOps);

    quiz = await Quiz.findById(id);

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
  const { type, questions, title, timer } = req.body;
  const userId = req.user._id;

  if (!title || !questions || !type) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const quiz = await Quiz.findById(quiz_id);
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    quiz.title = title;
    quiz.type = type;
    quiz.questions = questions;
    quiz.timer = timer;

    const updateQuiz = await quiz.save();
    res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
      quiz: updateQuiz,
      id: updateQuiz._id,
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
