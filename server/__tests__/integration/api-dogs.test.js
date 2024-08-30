const request = require("supertest");
const app = require("../../app");
const { resetTestDB } = require("./config");

let resultObject;

describe("Dogs API Endpoints", () => {
    let api;
    beforeEach(async () => {
        resultObject = {
            dog_id: 3,
            dog_name: 'charlie',
            gender: 'male',
            colour: 'white',
            age: 1,
            size: 'small',
            breed: 'Poodle',
            young_children_compatibility: false,
            small_animal_compatibility: true,
            activity_levels: 'low',
            living_space_size: 'small',
            garden: false,
            allergenic: 'high',
            other_animals: false,
            fencing: '3',
            experience_required: false,
            photo: "https://images.unsplash.com/photo-1649923625148-1e13d9431053",
            shelter_location_postcode: "BS1 2LZ",
            adopted: false,
            timestamp: '2024-08-28 22:59:20',
            neutered: true, 
            microchipped: false, 
            collar_leash: true, 
            obedience_classes_needed: false
        }
        await resetTestDB();
    });

    // Run our test APP
    beforeAll(async () => {
        api = app.listen(3003, () => {
            console.log("Test server running on port 3003");
        })
    });


    afterAll(async () => {
        await api.close();
    });

    describe("GET /dogs", () => {
        it("responds to GET /dogs with all dogs", async () => {
            // Arrange:

            // Act:
            const response = await request(api).get("/dogs");
            const resultData = response.body.data;
            // Assert:
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toEqual(resultData);
        });
    });


    describe("POST /dogs", () => {
        it("responds to POST /dogs with a new dog", async () => {
            // Arrange:
            delete resultObject.dog_id;
            delete resultObject.timestamp;
            delete resultObject.adopted;
            const copyResultObject = {
                ...resultObject, dog_name: "newDog", size: "large"
            }
            console.log("WHY FAIL POST", copyResultObject)
            // // Act:
            const response = await request(api).post("/dogs").send(copyResultObject);
            const resultData = response.body.data;
            console.log("POST FAIL", response.body);
            // // Assert:
            expect(response.statusCode).toBe(201);
            expect(response.body.data).toEqual(resultData);
        });

        it("throws if dog already exists", async () => {
            // Arrange:

            // Act:
            const response = await request(api).post("/dogs").send(resultObject);
            const responseError = response.body.error;
            //  Assert:
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe("Dog already exist");
            expect(response.body.error).toBe(responseError);
        });

        it("throws if any crucial arguments are missing from the request body", async () => {
            const requiredFields = [
                "dog_name", "gender", "colour", "age", "size", "breed", "young_children_compatibility",
                "small_animal_compatibility", "activity_levels", "living_space_size", "garden",
                "allergenic", "other_animals", "fencing", "experience_required"
            ];

            delete resultObject.dog_id;
            delete resultObject.timestamp;
            delete resultObject.adopted;
    
            for (const field of requiredFields) {
                const invalidData = { ...resultObject };
                delete invalidData[field];
                const response = await request(api).post("/dogs").send(invalidData);
                const responseError = response.body.error;
                //  Assert:
                expect(response.statusCode).toBe(400);
                expect(response.body.error).toBe("At least one of the required fields is missing");
                expect(response.body.error).toBe(responseError);
            }
        });

    });

    describe("GET /dogs/:id", () => {
        it("responds to GET /dogs/:id with a dog", async () => {
            // Arrange:
    
            // Act:
            const response = await request(api).get("/dogs/2");
            const resultData = response.body.data;
            // Assert:
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toEqual(resultData);
        });

        it("throws if dog is not found", async () => {
            // Act:
            const response = await request(api).get("/dogs/5");
            const resultData = response.body.error;
            // Assert:
            expect(response.statusCode).toBe(404);
            expect(response.body.error).toEqual(resultData);
            expect(response.body.error).toEqual("No dog found");
        });
    });

    describe("PATCH /dogs/:id", () => {
        beforeEach(() => {
            delete resultObject.dog_id;
        });
        it("responds to PATCH /dogs/:id with an updated dog", async () => {
            // Arrange:
            const copyResultObject = {
                ...resultObject, dog_name: "newDog", size: "large", adopted: true
            }

            // // Act:
            const response = await request(api).patch("/dogs/2").send(copyResultObject);
            const resultData = response.body.data;
            // // Assert:
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toEqual(resultData);
        });

        it("throws if dog does not exists", async () => {
            // Arrange:
            const copyResultObject = {
                ...resultObject, dog_name: "newDog", size: "large", adopted: true
            }
            // Act:
            const response = await request(api).patch("/dogs/6").send(copyResultObject);
            const responseError = response.body.error;
            //  Assert:
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe("No dog found");
            expect(response.body.error).toBe(responseError);
        });
    });

    describe("DELETE /dogs/:id", () => {
        it("responds to DELETE /dogs/:id deletes a dog from the record", async () => {
            // Act:
            const response = await request(api).delete("/dogs/1");
            //  Assert:
            expect(response.statusCode).toBe(204);
        });

        it("throws if dog does not exists", async () => {
            // Act:
            const response = await request(api).delete("/dogs/6");
            const responseError = response.body.error;
            //  Assert:
            expect(response.statusCode).toBe(404);
            expect(response.body.error).toBe("No dog found");
            expect(response.body.error).toBe(responseError);
        });
    });

});