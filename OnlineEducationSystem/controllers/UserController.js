// controllers/UserController.js

const User = require("../models/User");

exports.signup = (req, res) => {
  const { name, email, password, role, courseEnrolled, courseTeach } = req.body;

  // Check if user already exists
  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(409).send("User already exists");
        return;
      }

      // Create new user
      const newUser = new User({
        name,
        email,
        password,
        role,
        courseEnrolled,
        courseTeach,
      });

      newUser
        .save()
        .then(() => {
          res.redirect("/signin.html");
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          res.status(500).send("Internal Server Error");
        });
    })
    .catch((error) => {
      console.error("Error checking user:", error);
      res.status(500).send("Internal Server Error");
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  User.findOne({ email })
    .then((user) => {
      if (!user || user.password !== password) {
        res.status(401).send("Invalid credentials");
        return;
      }

      if (user.role === "student") {
        User.find({ role: "student" })
          .then((students) => {
            res.render("student_dashboard", { students });
          })
          .catch((error) => {
            console.error("Error finding students:", error);
            res.status(500).send("Internal Server Error");
          });
      } else if (user.role === "teacher") {
        User.find({ role: "teacher" })
          .then((teachers) => {
            res.render("teacher_dashboard", { teachers });
          })
          .catch((error) => {
            console.error("Error finding teachers:", error);
            res.status(500).send("Internal Server Error");
          });
      } else {
        res.status(401).send("Invalid user role");
      }
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).send("Internal Server Error");
    });
};
