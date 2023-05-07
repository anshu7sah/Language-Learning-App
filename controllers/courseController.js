const AsyncErrorHandler = require("../middleware/catchAsyncError");
const Course = require("../model/course");
exports.createCourse = AsyncErrorHandler(async (req, res, next) => {
  const { course } = req.body;
  if (!course) {
    return res.status(400).json({
      message: "Empty course can not be created",
    });
  }
  const newCourse = new Course(course);
  const updatedCourse = await newCourse.save();
  res.status(201).json({
    status: true,
    course: updatedCourse,
    message: "Course created successfully",
  });
});

exports.getAllCourse = AsyncErrorHandler(async (req, res, next) => {
  const course = await Course.find();
  if (!course) {
    return res.status(200).json({
      success: false,
      message: "Course not found",
    });
  }
  res.status(200).json({
    success: true,
    course,
  });
});

exports.getCourseById = AsyncErrorHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(400).json({
      success: false,
      message: "Course not found",
    });
  }
  res.status(200).json({
    success: false,
    course,
  });
});
