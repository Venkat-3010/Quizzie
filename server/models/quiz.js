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
        optionsType: [
          {
            type: String,
            imageUrl: String,
          },
        ],
        answer: String,
        timer: [Number],
      },
    ],
    type: { type: String, enum: ["Q&A", "Poll"], required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    impressions: { type: String, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuizModel", quizSchema);