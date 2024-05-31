const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  optionsType: {
    type: String,
    enum: ["text", "imageUrl", "both"],
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },{
    validate: function(val){
      return val.length >= 2 && val.length <= 4
    }}
  ],
  pollAnswerCount: {
    type: {
      "option1" : {
        type: Number,
        default: 0,
      },
      "option2" : {
        type: Number,
        default: 0,
      },
      "option3" : {
        type: Number,
        default: 0,
      },
      "option4" : {
        type: Number,
        default: 0,
      }
    },
    default: () => ({}),
  },
  rightAnswer: {
    type: String,
    required: () => this.type === 'Q&A',
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
});

const quizSchema = new Schema(
  {
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
    type: { type: String, enum: ["Q&A", "Poll"], required: true },
    createdBy: { type: String, required: true },
    impressions: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuizModel", quizSchema);
