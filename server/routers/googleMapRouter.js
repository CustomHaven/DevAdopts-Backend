const { Router } = require("express");

const googleMapController = require("../controllers/googleMapController");

const googleMapRouter = Router();


/**
 * @swagger
 * tags:
 *   name: Maps
 *   description: Operations related to maps API
 * /maps/geocode/zip:
 *   get:
 *     tags:
 *       - Maps
 *     summary: Returns the latitude and longitude
 *     description: |
 *       Converts a postcode to longitude and latitude values. Please use query params to pass in the postcode to this endpoint.
 *     operationId: maps_convert_postcode_latlong
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: postcode
 *         required: true
 *         schema:
 *           type: string
 *         description: The shelters postcode
 *     responses:
 *       200:
 *         description: Successfully converted the postcode to longitude and latitude values
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: number
 *                       format: float
 *                       example: 51.5160117
 *                     longitude:
 *                       type: number
 *                       format: float
 *                       example: -0.0703992
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
googleMapRouter.get("/geocode/zip", googleMapController.show);


module.exports = googleMapRouter;