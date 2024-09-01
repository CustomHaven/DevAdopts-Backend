const { Router } = require("express");
const authenticator = require("../middleware/authenticator");
const usersController = require("../controllers/userController");
const adminAuth = require("../middleware/adminAuth");

const userRouter = Router();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to Users API
 * /Users/logout:
 *   get:
 *     tags:
 *       - Users
 *     summary: Logout the User
 *     description: Logout a User from the server.
 *     operationId: logout_user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successfully. Please remove the token from your client-side storage."
 *       400:
 *         description: Bad Request, token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Bad Request"
 *       401:
 *         description: Unauthorized, token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 */
userRouter.get("/logout", authenticator, usersController.logout);


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
 * /users/create-admin:
 *   post:
 *     tags:
 *       - Users
 *     summary: Creates an admin user
 *     description: Adds a new admin user to the system. This action requires administrative privileges. Ensure that the request includes a valid JWT token with admin rights.
 *     operationId: create_admin
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
 */
userRouter.post("/create-admin", adminAuth, usersController.createAdmin);


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
 *       401:
 *         description: Unauthorized, token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
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
userRouter.get("/:id", authenticator, usersController.show);

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
 *     description: Delete's a User from the record. This action requires administrative privileges. Ensure that the request includes a valid JWT token with admin rights.
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
userRouter.delete("/:id", adminAuth, usersController.destroy);

module.exports = userRouter;