const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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
  res.redirect("/index.html");
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
          if (role === "student") {
            res.redirect("/signin.html");
          } else if (role === "teacher") {
            res.redirect("/teacher_signin.html");
          } else {
            res.redirect("/signin.html");
          }
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
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  User.findOne({ email })
    .then((user) => {
      if (!user || user.password !== password) {
        res.status(401).send("Invalid credentials");
        return;
      }

      res.redirect("/dashboard.html");
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
