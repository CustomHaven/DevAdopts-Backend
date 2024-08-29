const { Router } = require("express");

const botController = require("../controllers/botController.js");

const botRouter = Router();

botRouter.get("/interact-with-bot/:preference_id", botController.interactWithAI);
botRouter.patch("/:preference_id", botController.update);
botRouter.delete("/:preference_id", botController.destroy);


module.exports = botRouter;