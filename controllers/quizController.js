const AsyncErrorHandler = require("../middleware/catchAsyncError");
const Quiz = require("../model/quiz");
exports.createQuiz = AsyncErrorHandler(async (req, res, next) => {
  const { quiz } = req.body;
  if (!quiz) {
    return res.status(400).json({
      message: "Empty Quiz can not be created",
    });
  }
  const newQuiz = new Quiz(quiz);
  const updatedQuiz = await newQuiz.save();
  res.status(201).json({
    status: true,
    quiz: updatedQuiz,
    message: "Quiz created successfully",
  });
});

exports.getAllQuiz = AsyncErrorHandler(async (req, res, next) => {
  const quiz = await Quiz.find();
  if (!quiz) {
    return res.status(200).json({
      success: false,
      message: "Quiz not found",
    });
  }
  res.status(200).json({
    success: true,
    quiz,
  });
});

exports.getQuizById = AsyncErrorHandler(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    return res.status(400).json({
      success: false,
      message: "quiz not found",
    });
  }
  res.status(200).json({
    success: false,
    quiz,
  });
});
