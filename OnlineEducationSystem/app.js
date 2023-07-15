const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const mongoURI =
  "mongodb+srv://rahulkaradwal:14%40February@cluster0.4cjd0lx.mongodb.net/mydatabase?retryWrites=true&w=majority";

const dbName = "mydatabase";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Set the views directory and view engine for EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Create a Mongoose schema for users
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

// Create a Mongoose model for users
const User = mongoose.model("User", userSchema);

// Index route
app.get("/", (req, res) => {
  res.redirect("/signin.html");
});

// Signup route
app.post("/signup", (req, res) => {
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
});

// Signin route
// Signin route
app.post("/signin", (req, res) => {
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
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
