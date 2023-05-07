const express = require("express");
const {
  createQuiz,
  getAllQuiz,
  getQuizById,
} = require("../controllers/quizController");
const router = express.Router();

router.post("/quiz", createQuiz);
router.get("/quiz", getAllQuiz);
router.get("/quiz/:id", getQuizById);

module.exports = router;
