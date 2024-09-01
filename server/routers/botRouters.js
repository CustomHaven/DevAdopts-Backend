const { Router } = require("express");
const authenticator = require("../middleware/authenticator.js");
const botController = require("../controllers/botController.js");

const botRouter = Router();


/**
 * @swagger
 * tags:
 *   name: Chatbot
 *   description: Operations related to chatbot API
 * /bot/preferences:
 *   post:
 *     tags:
 *       - Chatbot
 *     summary: Initiates the chatbot
 *     description: Initates the chatbot.
 *     operationId: create_chatbot
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Bot"
 *     responses:
 *       201:
 *         description: Preference registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Bot"
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
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
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token was blacklisted"
 */
botRouter.post("/", authenticator, botController.create);

/**
 * @swagger
 * tags:
 *   name: Chatbot
 *   description: Operations related to chatbot API
 * /bot/preferences/interact-with-bot/{preference_id}:
 *   get:
 *     tags:
 *       - Chatbot
 *     summary: Converse with the chatbot
 *     description: |
 *       Interact with the chatbot where it will ask you questions. 
 *       Make sure to update your preference table after each interaction. 
 *       See the [Update Preference](#/Chatbot/update_preference) endpoint for more details on updating preferences.
 *     operationId: interact_with_chatbot
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: preference_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Preference table to show
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
 *                     answer:
 *                       type: string
 *                       example: "Do you have any small animals? (True/False)"
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
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
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token was blacklisted"
 *       429:
 *         description: Too many request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Exceeded your 3 RPM"
 */
botRouter.get("/interact-with-bot/:preference_id", authenticator, botController.interactWithAI);

/**
 * @swagger
 * tags:
 *   name: Chatbot
 *   description: Operations related to chatbot API
 * /bot/preferences/{preference_id}:
 *   patch:
 *     tags:
 *       - Chatbot
 *     summary: Update preference table
 *     description: Must update the preference table after each interaction with the chatbot
 *     operationId: update_preference
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: preference_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Preference table to show
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Bot"
 *     responses:
 *       200:
 *         description: Preference updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Bot"
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
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
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token was blacklisted"
 */
botRouter.patch("/:preference_id", authenticator, botController.update);

/**
 * @swagger
 * tags:
 *   name: Chatbot
 *   description: Operations related to chatbot API
 * /bot/preferences/{preference_id}:
 *   delete:
 *     tags:
 *       - Chatbot
 *     summary: Delete preference table
 *     description: Will delete the preference table
 *     operationId: delete_preference
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: preference_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Preference table to show
 *     responses:
 *       204:
 *         description: Preference successfully deleted. No content returned.
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
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
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token was blacklisted"
 */
botRouter.delete("/:preference_id", authenticator, botController.destroy);


module.exports = botRouter;