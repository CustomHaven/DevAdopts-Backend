const { Router } = require("express");

const dogsController = require("../controllers/dogsController");

const dogsRouter = Router();

dogsRouter.get("/", dogsController.index);
dogsRouter.post("/", dogsController.create);
dogsRouter.get("/:id", dogsController.show);
dogsRouter.patch("/:id", dogsController.update);
dogsRouter.delete("/:id", dogsController.destroy);


module.exports = dogsRouter;