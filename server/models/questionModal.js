const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  id: {
    type: String,
  },
  question: {
    type: String,
    required: true,
  },
  optionsType: {
    type: String,
    enum: ["text", "imageURL", "textAndImageURL"],
    required: true,
  },
  options: [
    {
      type: {
        option1: {
          type: {
            text: {
              type: String,
              default: "",
            },
            imageURL: {
              type: String,
              default: "",
            },
          },
        },
        option2: {
          type: {
            text: {
              type: String,
              default: "",
            },
            imageURL: {
              type: String,
              default: "",
            },
          },
        },
        option3: {
          text: {
            type: String,
            default: "",
          },
          imageURL: {
            type: String,
            default: "",
          },
        },
        option4: {
          text: {
            type: String,
            default: "",
          },
          imageURL: {
            type: String,
            default: "",
          },
        },
      },
      validate: function (val) {
        return val.length >= 2 && val.length <= 4;
      },
    },
  ],
  rightAnswer: {
    type: String,
    required: function () {
      return this.quizType === "Q&A";
    },
  },
  totalParticipants: {
    type: Schema.Types.Mixed,
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

module.exports = questionSchema;
