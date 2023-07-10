const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Signup route
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // TODO: Implement signup logic here

  // Redirect to signin page after successful signup
  res.redirect("/signin.html");
});

// Signin route
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  // TODO: Implement signin logic here

  // Redirect to dashboard page after successful signin
  res.redirect("/dashboard.html");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
