const mongoose = require("mongoose");
const { db_url } = require("./dotenv.config");

mongoose
  .connect(db_url)
  .then(() => {
    console.log("db is connected successfully");
  })
  .catch((error) => {
    console.log("db connection error", error);
  });
