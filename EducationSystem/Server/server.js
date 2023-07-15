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

// Serve static assets from the "client/build" directory
app.use(express.static(path.join(__dirname, "../client/build")));

// Serve the manifest.json file
app.get("/manifest.json", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/manifest.json"));
});

// For any other request, serve the React application
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
