const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    type: String,
    title: String,
    description: String,
    coverImage: String,
    author: String,
    wsl: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
