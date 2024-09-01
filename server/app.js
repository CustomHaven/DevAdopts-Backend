const express = require("express");
const cors = require("cors");

const logger = require("./middleware/logger");
const authenticator = require("./middleware/authenticator");
const { swaggerUi, swaggerSpec } = require("./middleware/swagger");

const usersRouter = require("./routers/userRouter");
const dogsRouter = require("./routers/dogsRouters");
const adoptionCostsRouter = require("./routers/adoptionCostsRouter");
const botRouter = require("./routers/botRouters");
const googleMapRouter = require("./routers/googleMapRouter");

const app = express();

const corsOptions = {
  origin: ["http://localhost:4728"],
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTION"],
  allowedHeaders: ["Content-Type", "Accept", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use("/bot/preferences", botRouter);
app.use("/maps", googleMapRouter);



module.exports = app;
