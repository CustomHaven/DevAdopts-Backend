const express = require("express");
const cors = require("cors");

const logger = require("./middleware/logger");
const authenticator = require("./middleware/authenticator");

const usersRouter = require("./routers/userRouter");
const dogsRouter = require("./routers/dogsRouters");
const adoptionCostsRouter = require("./routers/adoptionCostsRouter");

const app = express();

// Serve static files from the 'client' directory
app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "This is the backend developed by DevAdopts Engineers",
  });
});

app.get("/hello", authenticator, (req, res) => {
  res.status(200).json({ message: "Authenticated" });
});

app.use("/dogs", dogsRouter);
app.use("/users", usersRouter);
app.use("/adoptioncosts", adoptionCostsRouter);

module.exports = app;
