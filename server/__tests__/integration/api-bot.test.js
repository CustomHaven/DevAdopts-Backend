const request = require("supertest");
const app = require("../../app");
const { resetTestDB } = require("./config");

let resultObject;
// const datetime = new Date();

// const year = datetime.getFullYear();
// const month = String(datetime.getMonth() + 1).padStart(2, "0");
// const day = String(datetime.getDate()).padStart(2, "0");
// const datenow = `${year}-${month}-${day}`;

const datetime = new Date();
const datenow = datetime.toISOString().replace(/T/, " ").replace(/\..+/, "");

describe("Bot API Endpoints", () => {
    let api; 
    let port = 0;
    beforeEach(async () => {
        // -- (TRUE, FALSE, 'Low', 'Medium', TRUE, 'High', TRUE, '5', 2, 50000, 1),
        resultObject = {
            preference_id: 3,
            small_animals: true,
            young_children: false,
            activity: "Low",
            living_space_size: "Medium",
            garden: true,
            allergy_information: "High",
            other_animals: true,
            fencing: "5",
            previous_experience_years: 2,
            annual_income: 50000,
            timestamp: datenow,
            user_id: 1
        }
        await resetTestDB();
    });

    // Run our test APP
    beforeAll(async () => {
        api = app.listen(3442, () => {
            // console.log("Test server running on port 3003");
        })
        // api = app.listen(port);
        // port = api.address().port;
        // await new Promise(resolve => api.on("Listening on:", resolve));
    });


    afterAll(async () => {
        // if (api) {
            // await new Promise(resolve => api.close(resolve));
        // }
        await api.close();
    });

    xdescribe("POST /bot/preferences", () => {
        let finalResult, mockReq;
        it("responds with 201 to POST /bot/preferences create a preference", async () => {
            // Arrange:
            finalResult = Object.fromEntries(
                Object.keys(resultObject).map(key => [key, null])
            );
            finalResult.user_id = resultObject.user_id;
            finalResult.preference_id = resultObject.preference_id;

            mockReq = {
                user_id: resultObject.user_id
            }
            // Act:
            const response = await request(api).post("/bot/preferences").send(mockReq);
            const resultData = response.body.data;
            finalResult.timestamp = response.body.data.timestamp;
            // Assert:
            expect(response.statusCode).toBe(201);
            expect(response.body.data).toEqual(resultData);
            expect(response.body.data).toEqual(finalResult);
        });

        it("responds with 400 to POST /bot/preferences failed to create a preference", async () => {
            // Arrange:
            finalResult = Object.fromEntries(
                Object.keys(resultObject).map(key => [key, null])
            );
            finalResult.user_id = resultObject.user_id;
            finalResult.preference_id = resultObject.preference_id;

            mockReq = {
                user_id: 44
            }
            // Act:
            const initialCreate = await request(api).post("/bot/preferences").send(mockReq);
            const resultData = initialCreate.body.error;
            // Assert:
            expect(initialCreate.statusCode).toBe(400);
            expect(initialCreate.body.error).toEqual(resultData);
        });

    });


    xdescribe("PATCH /bot/preferences/:preference", () => {

        let mockReq, finalResult;
        beforeEach(() => {
            // jest.useFakeTimers();
            // Arrange
            mockReq = {
                user_id: resultObject.user_id
            }
            finalResult = Object.fromEntries(
                Object.keys(resultObject).map(key => [key, null])
            );
            finalResult.user_id = resultObject.user_id;
            finalResult.preference_id = resultObject.preference_id;
        });

        it("responds with 200 to PATCH /bot/preferences/:preference updates the preference", async () => {
            // Arrange:

            // Act:
            const initialCreate = await request(api).post("/bot/preferences").send(mockReq);
            const resultData = initialCreate.body.data;
            finalResult.timestamp = initialCreate.body.data.timestamp;

            mockReq = {
                small_animals: true
            };

            const updateResponse = await request(api).patch(`/bot/preferences/${finalResult.preference_id}`).send(mockReq);
            
            // Assert:
            expect(initialCreate.statusCode).toBe(201);
            expect(initialCreate.body.data).toEqual(resultData);
            expect(initialCreate.body.data).toEqual(finalResult);

            finalResult.small_animals = updateResponse.body.data.small_animals;
            finalResult.timestamp = updateResponse.body.data.timestamp;
            // Assert: interactResponse
            expect(updateResponse.statusCode).toBe(200);
            expect(updateResponse.body.data).toEqual(finalResult);
            // expect(response.body.data).toEqual(finalResult);
        });

        it("responds with 400 to POST /bot/preferences:preference failed if preference cannot be found", async () => {
            // Arrange:
            
            // Act:
            const initialCreate = await request(api).post("/bot/preferences").send(mockReq);
            const resultData = initialCreate.body.error;

            mockReq = {
                small_animalss: true
            };

            const updateResponse = await request(api).patch(`/bot/preferences/${finalResult.preference_id}`).send(mockReq);
            finalResult = updateResponse.body.error;


            // Assert:
            expect(initialCreate.statusCode).toBe(201);
            expect(initialCreate.body.error).toEqual(resultData);

            // finalResult.small_animals = updateResponse.body.data.small_animals;
            // finalResult.timestamp = updateResponse.body.data.timestamp;
            // Assert: interactResponse
            expect(updateResponse.statusCode).toBe(400);
            expect(updateResponse.body.error).toEqual(finalResult);
        });

        it("responds with 400 to POST /bot/preferences:preference failed to update the preference", async () => {
            // Arrange:
            mockReq = {
                small_animalss: true
            };
            // Act:
            const initialCreate = await request(api).post("/bot/preferences").send(mockReq);
            finalResult = initialCreate.body.error;
            mockReq = {
                small_animalss: true
            };

            // Assert:
            expect(initialCreate.statusCode).toBe(400);
            expect(initialCreate.body.error).toBe(finalResult);
        });

    })


    describe("GET /bot/preferences/:preference", () => {

        let mockReq, finalResult, updateResponse;
        beforeEach(() => {
            // jest.useFakeTimers();
            // Arrange
            mockReq = {
                user_id: resultObject.user_id
            }
            finalResult = Object.fromEntries(
                Object.keys(resultObject).map(key => [key, null])
            );
            finalResult.user_id = resultObject.user_id;
            finalResult.preference_id = resultObject.preference_id;
        });

        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        });

        xit("responds with 200 to GET /bot/preferences/:preference interacting once with the bot", async () => {
            // Arrange:

            // Act:
            const initialCreate = await request(api).post("/bot/preferences").send(mockReq);
            const resultData = initialCreate.body.data;
            finalResult.timestamp = initialCreate.body.data.timestamp;


            const interactResponse = await request(api).get(`/bot/preferences/interact-with-bot/${finalResult.preference_id}`);

            // Assert:
            expect(initialCreate.statusCode).toBe(201);
            expect(initialCreate.body.data).toEqual(resultData);
            expect(initialCreate.body.data).toEqual(finalResult);

            // Assert: interactResponse
            expect(interactResponse.statusCode).toBe(200);
        }, 30000);

        it("responds with 200 to GET /bot/preferences/:preference interacting 10x with bot", async () => {
            // Arrange:
            let interactResponse;
            const requiredKeys = [
                "small_animals", "young_children", "activity", "living_space_size", "garden", "allergy_information", "other_animals", "fencing", "previous_experience_years", "annual_income"
            ];
            const values = [true, false, 'Low', 'Medium', true, 'High', true, '5', 2, 50000];
            const copiedKeys = [...requiredKeys];
            const copiedValues = [...values];
            // Act
            const initialCreate = await request(api).post("/bot/preferences").send(mockReq);
            const resultData = initialCreate.body.data;
            finalResult.timestamp = initialCreate.body.data.timestamp;

            for (let i = 0; i < requiredKeys.length; i++) {
                interactResponse = await request(api).get(`/bot/preferences/interact-with-bot/${finalResult.preference_id}`);
                console.log("interactResponse!", interactResponse.body);
                if (interactResponse.body.error) {
                    i = i - 1;
                    setTimeout(() => {
                        console.log("some error we wait");
                    }, 30000);
                } else {
                    console.log();
                    console.log(i, ": what is the BETWEEN asnwer?", interactResponse.body.data);
                    console.log();
                    const key = copiedKeys.shift();
                    const mockReq = {};
                    mockReq[key] = copiedValues.shift();
                    updateResponse = await request(api).patch(`/bot/preferences/${finalResult.preference_id}`).send(mockReq);
                    console.log("size?", requiredKeys.length, "iteration", i);
                    console.log();
                }
                console.log("the count:", i)
            }

            if (interactResponse.body.error) {
                interactResponse = await request(api).get(`/bot/preferences/interact-with-bot/${finalResult.preference_id}`);
            } else {
                interactResponse = await request(api).get(`/bot/preferences/interact-with-bot/${finalResult.preference_id}`);
            }

            while (interactResponse.body.error) {
                interactResponse = await request(api).get(`/bot/preferences/interact-with-bot/${finalResult.preference_id}`);
            }
            resultObject.timestamp = interactResponse.body.data.timestamp;
            console.log("what is the FINAL asnwer?", interactResponse.body.data);

            // Assert:
            expect(initialCreate.statusCode).toBe(201);
            expect(initialCreate.body.data).toEqual(resultData);
            expect(initialCreate.body.data).toEqual(finalResult);

            // Assert: interactResponse
            expect(interactResponse.statusCode).toBe(200);
        }, 500000);

    });

});