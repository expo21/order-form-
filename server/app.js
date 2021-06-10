const express = require("express");
const PORT = 3232;
const mongoose = require("mongoose");

//app init
const app = express();

// connect to databse
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect("mongodb://localhost:27017/orders", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

//order routes
require("./app/routes/order.routes")(app);

//app listen
app.listen(PORT, () => {
  console.log("server started.");
});
