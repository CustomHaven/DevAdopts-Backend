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
console.log("datenow", datenow)

describe("Bot API Endpoints", () => {
    let api;
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
        api = app.listen(3003, () => {
            console.log("Test server running on port 3003");
        })
    });


    afterAll(async () => {
        await api.close();
    });

    describe("POST /bot/preferences", () => {
        it("responds with 201 to POST / create a preference", async () => {
            // Arrange:
            const finalResult = Object.fromEntries(
                Object.keys(resultObject).map(key => [key, null])
            );
            finalResult.user_id = resultObject.user_id;
            finalResult.preference_id = resultObject.preference_id;

            const mockReq = {
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

        it("responds with 400 to POST / create a preference", async () => {
            // Arrange:
            const finalResult = Object.fromEntries(
                Object.keys(resultObject).map(key => [key, null])
            );
            finalResult.user_id = resultObject.user_id;
            finalResult.preference_id = resultObject.preference_id;

            const mockReq = {
                user_id: 44
            }
            // Act:
            const response = await request(api).post("/bot/preferences").send(mockReq);
            const resultData = response.body.error;
            // Assert:
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toEqual(resultData);
        });

    });


});