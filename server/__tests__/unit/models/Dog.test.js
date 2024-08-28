const db = require("../../../db/connect");
const Dog = require("../../../models/Dog");

let resultObject;
const datetime = new Date();
const datenow = datetime.toISOString().replace(/T/, " ").replace(/\..+/, "");

xdescribe("Dog Model", () => {

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
        it("should return list of all dogs", async () => {
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

            // Assert
            expect(Dog).toBeDefined();
            expect(Dog.getAll).toBeDefined();
            expect(db.query).toHaveBeenCalledTimes(1);
            expect(results[2].dog_id).toBe(3);
            expect(results.every(result => result instanceof Dog)).toBe(true);
        });

        it("throws an error if no dogs are found", async () => {
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

        it("resolves with a dog on successful creation", async () => {
            // Arrange
            const queryResult = [
                { ...resultObject, dog_id: 5 }
            ];
            const mockResult = { ...resultObject, dog_id: 5, timestamp: datenow };
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: queryResult });

            // Act
            const result = await Dog.create(copyResultObject);
            
            // Assert
            expect(result).toBeInstanceOf(Dog);
            expect(result.dog_id).toBe(5);
            expect(result.size).toBe("small");


            expect(db.query).toHaveBeenCalledTimes(2);
            expect(result).toEqual(mockResult)
        });

        it("should throw an Error if dog already exists", async () => {
            // Arrange
            const mockResults = [ resultObject ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockResults });

            // Act & Arrange
            await expect(Dog.create(resultObject)).rejects.toThrow("Dog already exist");
            expect(db.query).toHaveBeenCalledWith(`SELECT * FROM dogs WHERE dog_id = $1`, [resultObject.dog_id]);
        });
    });


    describe("show", () => {
        it("resolves with a dog on successful db query", async () => {
            // Arrange
            const mockResults = [
                resultObject
            ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockResults });

            // Act
            const result = await Dog.show(1);

            // Assert
            expect(result).toBeInstanceOf(Dog);
            expect(result.dog_id).toBe(1);
            expect(result.size).toBe("small");
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM dogs WHERE dog_id = $1;", [1]);
        });

        it("should throw an Error if no dog is found", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

            await expect(Dog.show(2)).rejects.toThrow("No dog found");
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM dogs WHERE dog_id = $1;", [2]);
        });
    });



    describe("update", () => {
        let copyResultObject;
        beforeEach(() => {
            copyResultObject = { ...resultObject };
            delete copyResultObject.size;

            copyResultObject.size = "large";
        });

        it("updates dog on successful db query", async () => {
            // Arrange

            const mockResults = [
                { 
                    ...resultObject, 
                    size: copyResultObject.size, 
                    timestamp: new Date(),
                }
            ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockResults });
            const mockResult = mockResults[0];

            const correctTime = mockResult.timestamp.toISOString().replace("T", " ").replace(/\..+/, "");
            // Act


            const result = new Dog(resultObject);
            expect(result.size).toBe("small");

            const updatedResult = await result.update(copyResultObject);

            // Assert
            expect(result).toBeInstanceOf(Dog);
            expect(result.size).toBe("large");

            expect(db.query).toHaveBeenCalledTimes(1);
            expect(updatedResult).toEqual({
                ...mockResult,
                timestamp: correctTime
            });
        });

        it("should throw an Error if db query returns unsuccessful", async () => {
            // Arrange
            const mockResult = {
                    ...copyResultObject,
                    score: copyResultObject.score
            }

            // Act
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
            const result = new Dog(resultObject);

            // Arrange
            await expect(result.update(copyResultObject)).rejects.toThrow("Failed to update dog");
            expect(db.query).toHaveBeenCalledWith(`UPDATE dogs
                                            SET dog_name = $1, gender = $2, colour = $3, age = $4, size = $5, breed = $6, young_children_compatibility = $7, 
                                            small_animal_compatibility = $8, activity_levels = $9, living_space_size = $10, garden = $11, allergenic = $12,
                                            other_animals = $13, fencing = $14, experience_required = $15, adopted = $16, timestamp = $17
                                            WHERE dog_id = $18
                                            RETURNING *`, 
                                            [
        result.dog_name, result.gender, result.colour, result.age, result.size, result.breed, result.young_children_compatibility, result.small_animal_compatibility, result.activity_levels, 
        result.living_space_size, result.garden, result.allergenic, result.other_animals, result.fencing, result.experience_required, result.adopted, result.timestamp, result.dog_id
                                            ]);
        });
    });


    describe("destroy", () => {
        it("destroys a result on successful db query", async () => {
            // Arrange
            const mockResults = [ resultObject ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockResults });

            // Act
            const result = new Dog(resultObject);
            const deletedResult = await result.destroy();
            const mockResult = mockResults[0];

            const correctTime = mockResult.timestamp.toISOString().replace("T", " ").replace(/\..+/, "");

            // Assert
            expect(result).toBeInstanceOf(Dog);
            expect(result.size).toBe("small");
            expect(db.query).toHaveBeenCalledTimes(1);
            expect(deletedResult).toEqual({
                ...resultObject,
                timestamp: correctTime
            });
        });

        it("should throw an Error if db query returns unsuccessful", async () => {
            // Act & Arrange
            jest.spyOn(db, "query").mockRejectedValue(new Error("Something wrong with the DB"));
            const result = new Dog(resultObject);
            await expect(result.destroy()).rejects.toThrow("Something wrong with the DB")
        });
    });

});