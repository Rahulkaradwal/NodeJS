require("dotenv").config();

const config = {
  db: {
    // uri: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bje8joa.mongodb.net/${process.env.DB_DATABASE}`,
    uri: "mongodb+srv://rahulkaradwal:14%40February@cluster0.4cjd0lx.mongodb.net/mydatabase?retryWrites=true&w=majority",

    // uri: "mongodb+srv://rahulkaradwal:14@February@cluster0.4cjd0lx.mongodb.net/?retryWrites=true&w=majority",

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};

module.exports = config;
