const botController = require("../../../controllers/botController");
const Preference = require("../../../models/Preference");
const OpenAIApi = require("openai");

jest.mock("openai", () => {
    return jest.fn().mockImplementation(() => {
        return {
            chat: {
                completions: {
                    create: jest.fn(),
                },
            },
        };
    });
});

const mockSend = jest.fn();
const mockEnd = jest.fn();
const mockJson = jest.fn();
const mockSendStatus = jest.fn();
const mockStatus = jest.fn(() => ({
    send: mockSend,
    json: mockJson,
    end: mockEnd
}));

const mockRes = { status: mockStatus, sendStatus: mockSendStatus };
let AIQuestions, resultObject; 
let createObject, openai;
const datetime = new Date();


describe("Dogs controller", () => {
    beforeEach(() => {
        AIQuestions = [
            { small_animals: "1. Do you have any small animals at home? (e.g., hamsters, rabbits, etc.)" },
            { young_children: "2. Do you have young children in your household?" },
            { activity: "3. What is your preferred level of activity? (Options: low, medium, high)" },
            { living_space_size: "4. How would you describe the size of your living space? (e.g., apartment, small house, large house, etc.)" },
            { garden: "5. Do you have a garden?" },
            { allergy_information: "6. Do you have any allergies that need to be considered? (e.g., none, mild, severe)" },
            { other_animals: "7. Do you have other animals in your household? (e.g., dogs, cats, etc.)" },
            { fencing: "8. How tall is the fencing around your property? (Please provide the height in feet.)" },
            { previous_experience_years: "9. How many years of experience do you have with caring for animals?" },
            { annual_income: "10. What is your annual income?" }
        ];
        resultObject = {
            preference_id: 1,
            small_animals: true,
            young_children: true,
            activity: "high",
            living_space_size: "large",
            garden: true,
            allergy_information: "low",
            other_animals: true,
            fencing: "6",
            previous_experience_years: 3,
            annual_income: 60000,
            timestamp: datetime,
            user_id: 1
        }
        createObject = {
            preference_id: 1,
            small_animals: undefined,
            young_children: undefined,
            activity: undefined,
            living_space_size: undefined,
            garden: undefined,
            allergy_information: undefined,
            other_animals: undefined,
            fencing: undefined,
            previous_experience_years: undefined,
            annual_income: undefined,
            timestamp: datetime,
            user_id: 1
        };
        openai = new OpenAIApi();
        jest.clearAllMocks()
    });

    describe("interactWithAI", () => {
        let requiredKeys;
        beforeEach(() => {
            requiredKeys = [
                "small_animals", "young_children", "activity", "living_space_size", "garden", "allergy_information", "other_animals", "fencing", "previous_experience_years", "annual_income"
            ];
        });

        it("AI will ask question to the user and status code 200", () => {
            
        })
    })


    describe("update", () => {
        let mockReq;
        beforeEach(() => {
            mockReq = {
                params: { id: 1 }, 
                body: {
                    small_animals: true
                }
            };
        });

        it("should update a result with status code 200", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            
            jest.spyOn(Preference, "show").mockResolvedValueOnce(new Preference(createObject));        
            jest.spyOn(Preference.prototype, "update").mockResolvedValueOnce({ ...createObject, small_animals: true, });

            console.log("mockReq.body)[0]", mockReq.body);
            // Act
            // goatToUpdate = new Goat({ name: "test result", age: 23, id: 1 });
            // const result = await goatToUpdate.update(mockReq, mockRes);
            await botController.update(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Preference.show).toHaveBeenCalledTimes(1);
            expect(Preference.show).toHaveBeenCalledWith(1);
            expect(Preference.prototype.update).toHaveBeenCalledTimes(1);
            expect(Preference.prototype.update).toHaveBeenCalledWith(Object.keys(mockReq.body)[0], Object.values(mockReq.body)[0]);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({ data: { ...createObject, small_animals: true } });
        });

        it("should return an error upon failure by id", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Preference, "show").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await botController.update(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Preference.show).toHaveBeenCalledTimes(1);
            expect(Preference.prototype.update).toHaveBeenCalledTimes(0);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });

    });

});