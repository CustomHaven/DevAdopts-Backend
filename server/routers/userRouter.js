const { Router } = require("express");
const authenticator = require("../middleware/authenticator");
const usersController = require("../controllers/userController");

const userRouter = Router();



/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users API
 * /users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: Adds a new user to the system. Requires a valid request body with all required fields.
 *     operationId: register_new_user
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/User"
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
 */
userRouter.post("/register", usersController.register);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users API
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login the user
 *     description: Logs user in to the system. Requires a valid request body with all required fields.
 *     operationId: login_user
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success"
 *       401:
 *         description: Unauthorised
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid credentials"
 */
userRouter.post("/login", usersController.login);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users API
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Show a user's information
 *     description: Shows the specified fields of a user record.
 *     operationId: show_user
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to show
 *     responses:
 *       200:
 *         description: Show one user successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/User"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */
userRouter.get("/:id", usersController.show);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to Users API
 * /Users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a User's information
 *     description: Delete's a User from the record.
 *     operationId: delete_user
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the User to delete
 *     responses:
 *       204:
 *         description: User successfully deleted. No content returned.
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */
userRouter.delete("/:id", authenticator, usersController.destroy);

module.exports = userRouter;