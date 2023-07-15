const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const User = require("./models/User");
const UserController = require("./controllers/UserController");

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

// Index route
app.get("/", (req, res) => {
  res.redirect("/signin.html");
});

// Signup route
app.post("/signup", UserController.signup);

// Signin route
app.post("/signin", UserController.signin);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
