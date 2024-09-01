const { Router } = require("express");
const adminAuth = require("../middleware/adminAuth");
const dogsController = require("../controllers/dogsController");

const dogsRouter = Router();

/**
 * @swagger
 * tags:
 *     name: Dogs
 *     description: Operations related to dogs API
 * /dogs:
 *   get:
 *     tags:
 *     - Dogs
 *     summary: Retrieve a list of all dogs available for adoption
 *     description: Returns an array of objects, each representing a dog with detailed attributes.
 *     operationId: get_all_dogs
 *     responses:
 *       200:
 *         description: A list of dogs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     oneOf:
 *                     -  $ref: "#/components/schemas/Dog"
 *                     -  $ref: "#/components/schemas/Dog"
 */
dogsRouter.get("/", dogsController.index);


/**
 * @swagger
 * tags:
 *   name: Dogs
 *   description: Operations related to dogs API
 * /dogs:
 *   post:
 *     tags:
 *       - Dogs
 *     summary: Create a new dog entry
 *     description: Adds a new dog to the system. This action requires administrative privileges. Ensure that the request includes a valid JWT token with admin rights.
 *     operationId: create_new_dog
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Dog"
 *     responses:
 *       201:
 *         description: Dog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Dog"
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
dogsRouter.post("/", adminAuth, dogsController.create);

/**
 * @swagger
 * tags:
 *   name: Dogs
 *   description: Operations related to dogs API
 * /dogs/{id}:
 *   get:
 *     tags:
 *       - Dogs
 *     summary: Show a dog's information
 *     description: Shows the specified fields of a dog record.
 *     operationId: show_dog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the dog to show
 *     responses:
 *       200:
 *         description: Show one dog successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Dog"
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
 */
dogsRouter.get("/:id", dogsController.show);

/**
 * @swagger
 * tags:
 *   name: Dogs
 *   description: Operations related to dogs API
 * /dogs/{id}:
 *   patch:
 *     tags:
 *       - Dogs
 *     summary: Update a dog's information
 *     description: Updates the specified fields of a dog record. This action requires administrative privileges. Ensure that the request includes a valid JWT token with admin rights.
 *     operationId: update_dog
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the dog to update
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Dog"
 *     responses:
 *       200:
 *         description: Dog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Dog"
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
 */
dogsRouter.patch("/:id", adminAuth, dogsController.update);

/**
 * @swagger
 * tags:
 *   name: Dogs
 *   description: Operations related to dogs API
 * /dogs/{id}:
 *   delete:
 *     tags:
 *       - Dogs
 *     summary: Delete a dog's information
 *     description: Delete's a dog from the record. This action requires administrative privileges. Ensure that the request includes a valid JWT token with admin rights.
 *     operationId: delete_dog
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the dog to delete
 *     responses:
 *       204:
 *         description: Dog successfully deleted. No content returned.
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
 */
dogsRouter.delete("/:id", adminAuth, dogsController.destroy);

module.exports = dogsRouter;