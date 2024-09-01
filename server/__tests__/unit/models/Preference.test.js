const db = require("../../../db/connect");
const Preference = require("../../../models/Preference");


let resultObject, createObject;
const datetime = new Date();
const datenow = datetime.toISOString().replace(/T/, " ").replace(/\..+/, "");

describe("Preference Model", () => {
    // TRUE, TRUE, 'High', 'Large', TRUE, 'Low', TRUE, '6', 3, 60000, 1
    beforeEach(() => {
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
        };
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
        jest.clearAllMocks();
    });


    describe("Constructor", () => {
        it("should create a Preference instance with correct properties", () => {
            const preference = new Preference(resultObject);
            expect(preference.preference_id).toBe(resultObject.preference_id);
            expect(preference.user_id).toBe(resultObject.user_id);
            expect(preference.timestamp).toBe(datenow);
            expect(preference).toEqual({ ...resultObject, timestamp: datenow });
        });
    });


    describe("create", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("throws if crucial user_id key is missing", async () => {
            // Test with missing key breed
            await expect(Preference.create()).rejects.toThrow("User Id is requried.");
        });

        it("resolves with a preference on successful creation", async () => {
            // Arrange
            const resultQuery = {
                preference_id: resultObject.preference_id,
                timestamp: datenow,
                user_id: resultObject.user_id
            }

            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [ createObject ] });

            // Act
            const result = await Preference.create(1);
            
            // Assert
            expect(result).toBeInstanceOf(Object);
            expect(result.preference_id).toBe(1);
            expect(result.user_id).toBe(1);
            expect(result.timestamp).toBe(resultQuery.timestamp);
            expect(db.query).toHaveBeenCalledTimes(1);
            expect(result).toEqual(resultQuery);
        });
    });


    describe("show", () => {
        it("resolves with a preference on successful db query", async () => {
            // Arrange
            const mockResults = [
                resultObject
            ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockResults });

            // Act
            const result = await Preference.show(1);

            // Assert
            expect(result).toBeInstanceOf(Preference);
            expect(result.preference_id).toBe(1);
            expect(result.activity).toBe("high");
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM preferences WHERE preference_id = $1;", [1]);
        });

        it("should throw an Error if no preference is found", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

            await expect(Preference.show(2)).rejects.toThrow("No Preference found");
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM preferences WHERE preference_id = $1;", [2]);
        });
    });



    describe("update", () => {
        let updateResultObject, key, value;
        beforeEach(() => {
            key = "annual_income";
            value = 30000
            updateResultObject = { ...createObject };
            updateResultObject[key] = value;

        });

        it("updates preference on successful db query", async () => {
            // Arrange
            const correctTime = updateResultObject.timestamp.toISOString().replace("T", " ").replace(/\..+/, "");
            const finalResult = {
                preference_id: 1,
                annual_income: value,
                timestamp: correctTime,
                user_id: updateResultObject.user_id
            }

            // Act
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [ updateResultObject ] });

            const preferenceObject = new Preference(createObject);
            expect(preferenceObject[key]).toBe(undefined);

            const result = await preferenceObject.update(key, value);
            // Assert
            expect(preferenceObject).toBeInstanceOf(Preference);
            expect(preferenceObject[key]).toBe(String(value));

            expect(db.query).toHaveBeenCalledTimes(1);
            expect(db.query).toHaveBeenCalledWith(`UPDATE preferences
                                            SET ${key} = $1,
                                            timestamp = $2
                                            WHERE preference_id = $3
                                            RETURNING *`, 
                [String(value), preferenceObject.timestamp, preferenceObject.preference_id]);
            expect(result).toEqual(finalResult);
        });

        it("should throw an Error if db query returns unsuccessful", async () => {
            // Arrange

            // Act
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
            const result = new Preference(createObject);

            // Arrange
            await expect(result.update(key, value)).rejects.toThrow("Failed to update preference table");
            expect(db.query).toHaveBeenCalledWith(`UPDATE preferences
                                            SET ${key} = $1,
                                            timestamp = $2
                                            WHERE preference_id = $3
                                            RETURNING *`, 
                                            [String(value), result.timestamp, result.preference_id]);
        });

        it("throws if key or a value is missing", async () => {
            // Test with missing 1 parameter
            const preferenceInstance = new Preference(createObject);
            await expect(preferenceInstance.update("small_animals")).rejects.toThrow("Key-value pair must be given");

            // Test with missing 2 parameter
            await expect(preferenceInstance.update()).rejects.toThrow("Key-value pair must be given");
        });
    });


    describe("destroy", () => {
        it("destroys a preference on successful db query", async () => {
            // Arrange
            const mockResults = [ resultObject ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockResults });

            // Act
            const result = new Preference(resultObject);
            const deletedResult = await result.destroy();
            const mockResult = mockResults[0];

            const correctTime = mockResult.timestamp.toISOString().replace("T", " ").replace(/\..+/, "");

            // Assert
            expect(result).toBeInstanceOf(Preference);
            expect(result.activity).toBe("high");
            expect(db.query).toHaveBeenCalledTimes(1);
            expect(deletedResult).toEqual({
                ...resultObject,
                timestamp: correctTime
            });
            expect(db.query).toHaveBeenCalledWith("DELETE FROM preferences WHERE preference_id = $1 RETURNING *;", [1]);
        });

        it("should throw an Error if db query returns unsuccessful", async () => {
            // Act & Arrange
            jest.spyOn(db, "query").mockRejectedValue(new Error("Something wrong with the DB"));
            const result = new Preference(resultObject);
            await expect(result.destroy()).rejects.toThrow("Something wrong with the DB")
        });
    });




})