const { Router } = require("express");

const botController = require("../controllers/botController.js");

const botRouter = Router();

// botRouter.get("/", botController.index);
// botRouter.post("/", botController.create);
// botRouter.get("/:id", botController.show);
botRouter.patch("/:mongo_id", botController.update);
// botRouter.delete("/:id", botController.destroy);


module.exports = botRouter;