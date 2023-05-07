const express = require("express");
const {
  createCourse,
  getAllCourse,
  getCourseById,
} = require("../controllers/courseController");

const router = express.Router();

router.post("/course", createCourse);
router.get("/course", getAllCourse);
router.get("/course/:id", getCourseById);

module.exports = router;
