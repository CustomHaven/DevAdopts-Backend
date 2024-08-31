const botController = require("../../../controllers/botController");
const Preference = require("../../../models/Preference");
const openai = require("../../../services/openaiSetup");
const { updateWhatToAsk, whatToAsk } = require("../../../utils/chatGPTHelper");


jest.mock("../../../utils/chatGPTHelper", () => ({
    updateWhatToAsk: jest.fn()
}));

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
let AIQuestions, resultObject, predefinedAnswers, mockReq;
let createObject;
const datetime = new Date();
const datenow = datetime.toISOString().replace(/T/, " ").replace(/\..+/, "");

xdescribe("Bot controller", () => {
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
        predefinedAnswers = [ 
            true, true, "high", "large", true, "mild", "yes", "5", 3, 20000
        ]
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
        // openai = new OpenAIApi();
        jest.clearAllMocks()
    });

    describe("interactWithAI", () => {
        let requiredKeys, objectToFeed;
        beforeEach(() => {
                mockReq = {
                    params: { id: 1 }, 
                    body: {
                        small_animals: true
                    }
                };
            requiredKeys = [
                "small_animals", "young_children", "activity", "living_space_size", "garden", "allergy_information", "other_animals", "fencing", "previous_experience_years", "annual_income"
            ];
            objectToFeed = {
                preference_id: 1,
                // small_animals: true,
                timestamp: datenow,
                user_id: 1
            }
        });

        it("AI will ask question to the user and status code 200", async () => {
            // Arrange

            // Act
            jest.spyOn(Preference, "show").mockResolvedValueOnce(new Preference(createObject));

            updateWhatToAsk.mockReturnValue({ question: whatToAsk, count: 3 });

            openai.chat.completions.create.mockResolvedValueOnce({
                choices: [
                    {
                        index: 0,
                        message: {
                            role: "assistant",
                            content: "Do you have any small animals at home? (yes/no)",
                        },
                        logprobs: null,
                        finish_reason: "stop"
                    }
                ]
            });

            await botController.interactWithAI(mockReq, mockRes);

            // Assert
            expect(Preference.show).toHaveBeenCalledTimes(1);
            expect(updateWhatToAsk).toHaveBeenCalledTimes(1);
            expect(updateWhatToAsk).toHaveBeenCalledWith(whatToAsk, requiredKeys, objectToFeed);
            expect(openai.chat.completions.create).toHaveBeenCalledTimes(1);

            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({ data: { answer: "Do you have any small animals at home? (yes/no)" } });
        });

        it("should throw upon failure in finding preference_id", async () => {
            // Arrange
            jest.spyOn(Preference, "show").mockRejectedValue(new Error("Something happened to your DB"));
            // Act
            await botController.interactWithAI(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Preference.show).toHaveBeenCalledTimes(1);
            expect(updateWhatToAsk).toHaveBeenCalledTimes(0);
            expect(openai.chat.completions.create).toHaveBeenCalledTimes(0);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });

        it("should throw if api does not respond or fails", async () => {
            // Arrange
            jest.spyOn(Preference, "show").mockResolvedValueOnce(new Preference(createObject));
            openai.chat.completions.create.mockRejectedValue(new Error("The external API failed"))
            // Act
            await botController.interactWithAI(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Preference.show).toHaveBeenCalledTimes(1);
            expect(updateWhatToAsk).toHaveBeenCalledTimes(1);
            expect(openai.chat.completions.create).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ error: "The external API failed" });
        });
    });

    describe("update", () => {
        beforeEach(() => {
            mockReq = {
                params: { preference_id: 1 }, 
                body: {
                    small_animals: true
                }
            };
        });

        it("should update a result with status code 200", async () => {
            // Arrange
            jest.spyOn(Preference, "show").mockResolvedValueOnce(new Preference(createObject));        
            jest.spyOn(Preference.prototype, "update").mockResolvedValueOnce({ ...createObject, small_animals: true, });
            // Act
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
            jest.spyOn(Preference, "show").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await botController.update(mockReq, mockRes);

            // Assert
            expect(Preference.show).toHaveBeenCalledTimes(1);
            expect(Preference.prototype.update).toHaveBeenCalledTimes(0);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });
    });

    describe("create", () => {
        let mockReq;
        beforeEach(() => {
            delete resultObject.dog_id;
            mockReq = {
                body: {
                    user_id: 1
                }
            };
        });

        it("should create a preference with status code 201", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Preference, "create").mockResolvedValueOnce({ ...createObject });

            // Act
            await botController.create(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Preference.create).toHaveBeenCalledTimes(1);
            expect(Preference.create).toHaveBeenCalledWith(1);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith({ data: { ...createObject } });
        });

        it("should return an error upon failure", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Preference, "create").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await botController.create(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Preference.create).toHaveBeenCalledTimes(1);
            expect(Preference.create).toHaveBeenCalledWith(mockReq.body.user_id);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });
    });


    describe("destroy", () => {
        let mockReq;
        beforeEach(() => {
            mockReq = {
                params: { preference_id: 5 }, 
            };
        });

        it("should destroy a preference with status code 204", async () => {
            // Arrange
            jest.spyOn(Preference, "show").mockResolvedValueOnce(new Preference({ ...resultObject, preference_id: 5 }));        
            jest.spyOn(Preference.prototype, "destroy").mockResolvedValueOnce({});


            // Act
            await botController.destroy(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Preference.show).toHaveBeenCalledTimes(1);
            expect(Preference.show).toHaveBeenCalledWith(5);
            expect(Preference.prototype.destroy).toHaveBeenCalledTimes(1);
            expect(Preference.prototype.destroy).toHaveBeenCalledWith();
            expect(mockSendStatus).toHaveBeenCalledWith(204);
            expect(mockJson).toHaveBeenCalledTimes(0);
        });

        it("should return an error upon failure with no given id", async () => {
            // Arrange
            jest.spyOn(Preference, "show").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await botController.destroy(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Preference.show).toHaveBeenCalledTimes(1);
            expect(Preference.show).toHaveBeenCalledWith(mockReq.params.preference_id);
            expect(Preference.prototype.destroy).toHaveBeenCalledTimes(0);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });

        it("should return an error upon failure on destroy method", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Preference, "show").mockResolvedValueOnce(new Preference(resultObject));        
            jest.spyOn(Preference.prototype, "destroy").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await botController.destroy(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Preference.show).toHaveBeenCalledTimes(1);
            expect(Preference.show).toHaveBeenCalledWith(5);
            expect(Preference.prototype.destroy).toHaveBeenCalledTimes(1);
            expect(Preference.prototype.destroy).toHaveBeenCalledWith();
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });

    });
});