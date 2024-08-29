const { Router } = require("express");

const usersController = require("../controllers/userController");

const userRouter = Router();

userRouter.post("/register", usersController.register);
userRouter.post("/login", usersController.login);
userRouter.get("/:id", usersController.show);

module.exports = userRouter;
