const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const mongoURI =
  "mongodb+srv://rahulkaradwal:14%40February@cluster0.4cjd0lx.mongodb.net/mydatabase?retryWrites=true&w=majority";

const dbName = "mydatabase";

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
MongoClient.connect(mongoURI, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error("Failed to connect to MongoDB:", err);
    return;
  }

  console.log("Connected to MongoDB");

  const db = client.db(dbName);
  const usersCollection = db.collection("users");

  // Signup route
  app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    usersCollection.findOne({ email }, (err, user) => {
      if (err) {
        console.error("Error checking user:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      if (user) {
        res.status(409).send("User already exists");
        return;
      }

      // Create new user
      const newUser = {
        name,
        email,
        password,
      };

      usersCollection.insertOne(newUser, (err) => {
        if (err) {
          console.error("Error creating user:", err);
          res.status(500).send("Internal Server Error");
          return;
        }

        res.redirect("/signin.html");
      });
    });
  });

  // Signin route
  app.post("/signin", (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    usersCollection.findOne({ email }, (err, user) => {
      if (err) {
        console.error("Error finding user:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      if (!user || user.password !== password) {
        res.status(401).send("Invalid credentials");
        return;
      }

      res.redirect("/dashboard.html");
    });
  });

  // Start the server
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
