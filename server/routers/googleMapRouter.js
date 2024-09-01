const { Router } = require("express");

const googleMapController = require("../controllers/googleMapController");

const googleMapRouter = Router();

googleMapRouter.get("/geocode/zip", googleMapController.show);


module.exports = googleMapRouter;