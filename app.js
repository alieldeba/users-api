const express = require("express");
const app = express();
const usersRoute = require("./routes/usersRoute.js");
const logger = require("./middlewares/logger.js");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(logger);
app.use("/users", usersRoute);

// 404 Error
app.use((req, res) => {
  res.status(404).send("404 not Found!");
});

// Listening to server
app.listen(8080, () => {
  console.log(`Server Started at localhost:${process.env.PORT || 3000}`);
});
