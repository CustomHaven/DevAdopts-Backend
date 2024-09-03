const dogsController = require("../../../controllers/dogsController");
const Dog = require("../../../models/Dog");

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
let resultObject
const datetime = new Date();

xdescribe("Dogs controller", () => {
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
            neutered: true,
            microchipped: true,
            collar_leash: true,
            obedience_classes_needed: true,
            InitialAdoption: {
                initial_id: 2,
                calculated_initial_price: "363.90",
                neutering_price_id: 1,
                microchip_price: 10.9,
                bed_size_id: 1,
                collar_leash_price: 15,
                obedience_classes_price: 65,
                dog_id: 1,
                neutering_price: 248,
                bed_price: 25
            },
            MonthlyAdoption: {
                monthly_id: 3,
                calculated_monthly_cost: "100.00",
                amount_of_food_id: 1,
                pet_insurance_id: 1,
                veterinary_care_id: 1,
                dog_id: 1,
                vet_price: 55,
                pet_insurance_price: 25,
                food_price: 20
            },
            LongTermAdoption: {
                long_term_id: 4,
                calculated_long_term_cost: "1087.00",
                end_of_life_id: 1,
                average_medical_cost: 822,
                dog_id: 1,
                end_of_life_price: 265
            }
        }
        
        
        jest.clearAllMocks()
    });

    describe("index", () => {

        it("should return results with status code 200", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Dog, "getAll").mockResolvedValueOnce([resultObject, { ...resultObject, id: 2, dog_name: "dog2" }]);

            // Act
            await dogsController.index(null, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Dog.getAll).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({ data: [resultObject, { ...resultObject, id: 2, dog_name: "dog2" }] });
        });

        it("should return an error upon failure", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Dog, "getAll").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await dogsController.index(null, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Dog.getAll).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });
    });

    describe("show", () => {
        let mockReq;
        beforeEach(() => {
            mockReq = {
                params: { id: 1 }
            };

            jest.clearAllMocks();
        });

        it("should return a result with status code 200", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Dog, "show").mockResolvedValueOnce(resultObject);

            // Act
            await dogsController.show(mockReq, mockRes);
            // Assert
            // get correct status code and the correct data
            expect(Dog.show).toHaveBeenCalledTimes(1);
            expect(Dog.show).toHaveBeenCalledWith(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({ data: resultObject });
        });

        it("should return an error upon failure", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Dog, "show").mockRejectedValue(new Error("Something happened to your DB"));
            mockReq.params.id = 5;
            // Act
            await dogsController.show(mockReq, mockRes);

            // Assert
            
            // get correct status code and the correct data
            expect(Dog.show).toHaveBeenCalledTimes(1);
            expect(Dog.show).toHaveBeenCalledWith(5);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });

    });


    describe("create", () => {
        let mockReq;
        beforeEach(() => {
            delete resultObject.dog_id;
            mockReq = {
                body: {
                    ...resultObject, dog_name: "dog2", size: "large"
                }
            };
        });

        it("should create a result with status code 201", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Dog, "create").mockResolvedValueOnce({ ...resultObject, dog_id: 2, size: "large", dog_name: "dog2" });

            // Act
            await dogsController.create(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Dog.create).toHaveBeenCalledTimes(1);
            expect(Dog.create).toHaveBeenCalledWith(mockReq.body);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith({ data: { ...resultObject, dog_id: 2, size: "large", dog_name: "dog2" } });
        });

        it("should return an error upon failure", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Dog, "create").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await dogsController.create(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Dog.create).toHaveBeenCalledTimes(1);
            expect(Dog.create).toHaveBeenCalledWith(mockReq.body);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });

    });



    describe("update", () => {
        let mockReq;
        beforeEach(() => {
            mockReq = {
                params: { id: 2 }, 
                body: {
                    ...resultObject, dog_name: "dog2", size: "large"
                }
            };
        });

        it("should update a result with status code 200", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Dog, "show").mockResolvedValueOnce(new Dog({ ...resultObject, dog_id: 2 }));        
            jest.spyOn(Dog.prototype, "update").mockResolvedValueOnce({ ...resultObject, size: "large", dog_id: 2, dog_name: "dog2" });


            // Act
            // goatToUpdate = new Goat({ name: "test result", age: 23, id: 1 });
            // const result = await goatToUpdate.update(mockReq, mockRes);
            await dogsController.update(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Dog.show).toHaveBeenCalledTimes(1);
            expect(Dog.show).toHaveBeenCalledWith(2);
            expect(Dog.prototype.update).toHaveBeenCalledTimes(1);
            expect(Dog.prototype.update).toHaveBeenCalledWith(mockReq.body);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({ data: { ...resultObject, size: "large", dog_id: 2, dog_name: "dog2" } });
        });

        it("should return an error upon failure by id", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Dog, "show").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await dogsController.update(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Dog.show).toHaveBeenCalledTimes(1);
            expect(Dog.prototype.update).toHaveBeenCalledTimes(0);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });

        it("should return an error upon failure on update method", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Dog, "show").mockResolvedValueOnce(new Dog(resultObject));        
            jest.spyOn(Dog.prototype, "update").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await dogsController.update(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Dog.show).toHaveBeenCalledTimes(1);
            expect(Dog.show).toHaveBeenCalledWith(2);
            expect(Dog.prototype.update).toHaveBeenCalledTimes(1);
            expect(Dog.prototype.update).toHaveBeenCalledWith(mockReq.body);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });

    });


    describe("destroy", () => {
        let mockReq;
        beforeEach(() => {
            mockReq = {
                params: { id: 5 }, 
            };
        });

        it("should destroy a result with status code 204", async () => {
            // Arrange
            jest.spyOn(Dog, "show").mockResolvedValueOnce(new Dog({ ...resultObject, dog_id: 5 }));        
            jest.spyOn(Dog.prototype, "destroy").mockResolvedValueOnce({});


            // Act
            await dogsController.destroy(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Dog.show).toHaveBeenCalledTimes(1);
            expect(Dog.show).toHaveBeenCalledWith(5);
            expect(Dog.prototype.destroy).toHaveBeenCalledTimes(1);
            expect(Dog.prototype.destroy).toHaveBeenCalledWith();
            expect(mockSendStatus).toHaveBeenCalledWith(204);
        });

        it("should return an error upon failure by id", async () => {
            // Arrange
            jest.spyOn(Dog, "show").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await dogsController.destroy(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Dog.show).toHaveBeenCalledTimes(1);
            expect(Dog.show).toHaveBeenCalledWith(5);
            expect(Dog.prototype.destroy).toHaveBeenCalledTimes(0);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });

        it("should return an error upon failure on destroy method", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Dog, "show").mockResolvedValueOnce(new Dog(resultObject));        
            jest.spyOn(Dog.prototype, "destroy").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await dogsController.destroy(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Dog.show).toHaveBeenCalledTimes(1);
            expect(Dog.show).toHaveBeenCalledWith(5);
            expect(Dog.prototype.destroy).toHaveBeenCalledTimes(1);
            expect(Dog.prototype.destroy).toHaveBeenCalledWith();
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });

    });

});