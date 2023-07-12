const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // Handle root URL request
  res.send("Welcome to the API");
});

app.get("/api", (req, res) => {
  // Handle "/api" endpoint request
  res.json({ users: ["Rahul", "Mohit", "Karadwal"] });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
