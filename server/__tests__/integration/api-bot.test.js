const request = require("supertest");
const app = require("../../app");
const { resetTestDB } = require("./config");

let resultObject;

xdescribe("Bot API Endpoints", () => {
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

});