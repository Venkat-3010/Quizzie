const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizQuestion = new Schema({
  question: {
    type: String,
    required: true,
  },
  optionsType: {
    type: String,
    enum: ["text", "imageUrl", "both"],
    required: true,
  },
  options: {
    type: String,
    required: true,
  },
  rightAnswer: {
    type: String,
    required: function () {
      return this.quizType === "Q&A";
    },
  },
  ParticipantsCount: {
    type: Number,
    default: 0,
  },
  wrongAnswerCount: {
    type: Number,
    default: 0,
  },
  correctAnswerCount: {
    type: Number,
    default: 0,
  },
});

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: [quizQuestion],
    timer: {
      type: Number,
      required: true,
    },
    quizType: { type: String, enum: ["Q&A", "Poll"], required: true },
    createdBy: { type: String, required: true },
    impressions: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuizModel", quizSchema);
