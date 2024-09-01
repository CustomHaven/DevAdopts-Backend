const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "DevAdopts",
        version: "1.0.0",
        description: "DevAdopts Backend API References",
    },
    servers: [
        {
            url: "http://localhost:4000",
        },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: {
            Dog: {
                type: "object",
                required: [
                    "dog_name", "gender", "colour", "age", "size", "breed", 
                    "young_children_compatibility", "small_animal_compatibility",
                    "activity_levels", "living_space_size", "garden", "allergenic",
                    "other_animals", "fencing", "experience_required", "photo", 
                    "shelter_location_postcode", "neutered", "microchipped", 
                    "collar_leash", "obedience_classes_needed"
                ],
                properties: {
                    dog_id: { type: "integer", example: 1 },
                    dog_name: { type: "string", example: "Buddy" },
                    gender: { type: "string", example: "Male" },
                    colour: { type: "string", example: "Brown" },
                    age: { type: "integer", example: 4 },
                    size: { type: "string", example: "Medium" },
                    breed: { type: "string", example: "Labrador Retriever" },
                    young_children_compatibility: { type: "boolean", example: true },
                    small_animal_compatibility: { type: "boolean", example: false },
                    activity_levels: { type: "string", example: "High" },
                    living_space_size: { type: "string", example: "House with garden" },
                    garden: { type: "boolean", example: true },
                    allergenic: { type: "boolean", example: false },
                    other_animals: { type: "boolean", example: true },
                    fencing: { type: "string", example: "6 ft" },
                    experience_required: { type: "boolean", example: true },
                    photo: { type: "string", example: "https://example.com/photos/dog1.jpg" },
                    shelter_location_postcode: { type: "string", example: "SW1A 1AA" },
                    adopted: { type: "boolean", example: false },
                    neutered: { type: "boolean", example: true },
                    microchipped: { type: "boolean", example: true },
                    collar_leash: { type: "boolean", example: true },
                    obedience_classes_needed: { type: "boolean", example: true }
                }
            },
            User: {
                type: "object",
                required: [ "first_name", "last_name", "email", "username", "post_code", "password" ],
                properties: {
                    user_id: { type: "integer", example: 1 },
                    first_name: { type: "string", example: "John" },
                    last_name: { type: "string", example: "Doe" },
                    email: { type: "string", format: "email", example: "john.doe@example.com" },
                    username: {type: "string",example: "johndoe" },
                    post_code: { type: "string", example: "12345" },
                    admin: { type: "boolean", example: false },
                    password: { type: "string", example: "password123" }
                }
            }
        },
    },
    security: [
        {
            BearerAuth: [],
        },
    ]
};

const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, "../routers/*.js")]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
};