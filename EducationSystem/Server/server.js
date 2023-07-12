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
