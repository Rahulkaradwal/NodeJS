// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["student", "teacher"],
    required: true,
  },
  courseEnrolled: String,
  courseTeach: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
