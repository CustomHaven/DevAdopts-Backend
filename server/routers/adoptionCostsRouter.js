const { Router } = require("express");
const adminAuth = require("../middleware/adminAuth");
const adoptionCostsController = require("../controllers/adoptionCostsController");

const adoptionCostsRouter = Router();


/**
 * @swagger
 * tags:
 *   name: Adoption Cost
 *   description: Operations related to adoption API
 * /adoptioncosts/{dogId}:
 *   get:
 *     tags:
 *       - Adoption Cost
 *     summary: Shows the expenditure to adopt a pet
 *     description: |
 *       This action requires administrative privileges. Ensure that the request includes a valid JWT token with admin rights.
 *       Shows what the initial, monthly and long term costs that are associated with adopting a dog.
 *     operationId: adopt_pet_costs
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dogId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Dog
 *     responses:
 *       200:
 *         description: Interaction successful with the chatbot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     dogName:
 *                       type: string
 *                       example: "Bella"
 *                     size:
 *                       type: string
 *                       example: "Small"
 *                     initialCost:
 *                       type: number
 *                       example: 416
 *                     monthlyCost:
 *                       type: number
 *                       example: 100
 *                     longTermCost:
 *                       type: number
 *                       example: 1087
 *       401:
 *         description: Unauthorised, token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorised"
 *       403:
 *         description: Forbidden, user does not have administrative privileges
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden, user does not have administrative privileges"
 *       404:
 *         description: Dog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Dog not found"
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
adoptionCostsRouter.get("/:dogId", adoptionCostsController.getAdoptionCosts);

module.exports = adoptionCostsRouter;
