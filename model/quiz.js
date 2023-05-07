const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    questions: [
      {
        text: String,
        options: [
          {
            text: String,
            correct: Boolean,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", QuizSchema);
