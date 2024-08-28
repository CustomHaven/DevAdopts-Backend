const db = require("../../db/connect");
const Dog = require("../../models/Dog");

let resultObject;
const datetime = new Date();
const datenow = datetime.toISOString().replace(/T/, " ").replace(/\..+/, "");

describe("Dog Model", () => {

    beforeEach(() => {
        resultObject = {
            dog_id: 1,
            dog_name: "dog1",
            gender: "female",
            colour: "black",
            age: 1,
            size: "small",
            breed: "Pomeranian",
            young_children_compatibility: true,
            small_animal_compatibility: true,
            activity_levels: "medium",
            living_space_size: "small",
            garden: true,
            allergenic: "medium",
            other_animals: true,
            fencing: "4",
            experience_required: true,
            adopted: true,
            timestamp: datetime,
        };
        jest.clearAllMocks();
    });


    describe("getAll", () => {
        it("should return list of all results", async () => {
            // Arrange
            const mockResults = [
                {
                    ...resultObject
                },
                {
                    ...resultObject, dog_id: 2, dog_name: "dog2", age: 2
                },
                {
                    ...resultObject, dog_id: 3, dog_name: "dog3", age: 3
                },
            ];

            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockResults });


            // Act
            const results = await Dog.getAll();
            // console.log("first", results);
            // Assert
            expect(Dog).toBeDefined();
            expect(Dog.getAll).toBeDefined();
            expect(db.query).toHaveBeenCalledTimes(1);
            expect(results[2].dog_id).toBe(3);
            expect(results.every(result => result instanceof Dog)).toBe(true);
        });

        it("throws an error if no results are found", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

            await expect(Dog.getAll()).rejects.toThrow("No dogs available")
        })
    });


    describe("create", () => {
        let copyResultObject;
        beforeEach(() => {
            copyResultObject = { ...resultObject };
            delete copyResultObject.dog_id;
        });

        it("throws if crucial input keys are missing", async () => {
            delete copyResultObject.breed;
            // Test with missing key breed
            await expect(Dog.create(copyResultObject)).rejects.toThrow("One of the required fields missing");
            delete copyResultObject.question_id;

            // Alternatively, test with missing key breed and size
            delete copyResultObject.size;
            await expect(Dog.create(copyResultObject)).rejects.toThrow("One of the required fields missing");

            // Alternatively, test with no arguments
            await expect(Dog.create({})).rejects.toThrow("One of the required fields missing");
        });

        it("resolves with a result on successful creation", async () => {
            // Arrange

            const mockResults = [
                { ...resultObject, dog_id: 5 }
            ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

            // Act
            const result = await Dog.create(copyResultObject);
            
            // Assert
            expect(result).toBeInstanceOf(Dog);

        });


    });


});