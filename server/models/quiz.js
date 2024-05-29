const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: [
      {
        question: String,
        optionsType: {
          type: String,
          enum: ["text", "imageUrl", "both"],
          required: true,
        },
        options: [
          {
            type: String,
            required: true,
          },
        ],
        rightAnswer: {
          type: String,
          required: true,
        },
        totalParticipants: {
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
      },
    ],
    timer: {
      type: Number,
      required: true,
    },
    type: { type: String, enum: ["Q&A", "Poll"], required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    impressions: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuizModel", quizSchema);
