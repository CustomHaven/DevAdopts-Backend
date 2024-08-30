const { Router } = require("express");

const adoptionCostsController = require("../controllers/adoptionCostsController");

const adoptionCostsRouter = Router();

adoptionCostsRouter.get("/:dogId", adoptionCostsController.getAdoptionCosts);

module.exports = adoptionCostsRouter;
