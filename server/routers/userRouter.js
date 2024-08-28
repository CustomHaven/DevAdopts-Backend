const { Router } = require("express");

const usersController = require("");

const userRouter = Router();

userRouter.post("/register", usersController.register);
userRouter.post("/login", usersController.login);

module.exports = userRouter;
