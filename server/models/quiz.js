const mongoose = require("mongoose");
const questionSchema = require("./questionModal");
const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    id: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
      validate: function (val) {
        return val.length >= 1 && val.length <= 5;
      },
    },
    timer: {
      type: String,
      enum: ["OFF", "5", "10"],
      required: true,
    },
    type: {
      type: String,
      enum: ["Q&A", "Poll"],
      required: true,
    },
    createdBy: {
      type: String,
      required: true
    },
    impressions: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuzzieModel", quizSchema);
