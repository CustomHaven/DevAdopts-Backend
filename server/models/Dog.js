const db = require("../db/connect");

class Dog {
    constructor(dog) {
        this.dog_id = dog.dog_id;
        this.dog_name = dog.dog_name;
        this.gender = dog.gender;
        this.colour = dog.colour;
        this.age = dog.age;
        this.size = dog.size;
        this.breed = dog.breed;
        this.young_children_compatibility = dog.young_children_compatibility;
        this.small_animal_compatibility = dog.small_animal_compatibility;
        this.activity_levels = dog.activity_levels;
        this.living_space_size = dog.living_space_size;
        this.garden = dog.garden;
        this.allergenic = dog.allergenic;
        this.other_animals = dog.other_animals;
        this.fencing = dog.fencing;
        this.experience_required = dog.experience_required;
        this.photo = dog.photo;
        this.shelter_location_postcode = dog.shelter_location_postcode;
        this.adopted = dog.adopted;
        this.timestamp = (dog.timestamp instanceof Date ? dog.timestamp : new Date(dog.timestamp)).toISOString().replace(/T/, " ").replace(/\..+/, "");
    }

    static async getAll() {
        const dog = await db.query("SELECT * FROM dogs");
        if (dog.rows.length === 0) {
            throw new Error("No dogs available");
        }
        return dog.rows.map(b => new Dog(b))
    }

    static async show(id) {
        const response = await db.query("SELECT * FROM dogs WHERE dog_id = $1;", [id]);
        if (response.rows.length !== 1) {
            throw new Error("No dog found");
        }
        return new Dog(response.rows[0]);
    }

    static async create(data) {

        const { dog_name, gender, colour, age, size, breed, young_children_compatibility, small_animal_compatibility, activity_levels,
            living_space_size, garden, allergenic, other_animals, fencing, experience_required, dog_id, photo, shelter_location_postcode } = data;

        // Check for missing fields
        const missingFields = [
            "dog_name", "gender", "colour", "age", "size", "breed",
            "young_children_compatibility", "small_animal_compatibility", "activity_levels",
            "living_space_size", "garden", "allergenic", "other_animals", "fencing", "experience_required"
        ].filter(field => data[field] === undefined || data[field] === null);

        if (missingFields.length > 0) {
            throw new Error("At least one of the required fields is missing");
        }

        const existingDog = await db.query("SELECT * FROM dogs WHERE dog_id = $1", [dog_id]);

        if (existingDog.rows.length === 0) {
            const response = await db.query(`INSERT INTO dogs 
                (dog_name, gender, colour, age, size, breed, young_children_compatibility, small_animal_compatibility, activity_levels, 
                living_space_size, garden, allergenic, other_animals, fencing, experience_required, photo, shelter_location_postcode)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`, 
                [dog_name, gender, colour, age, size, breed, young_children_compatibility, small_animal_compatibility, activity_levels, 
                    living_space_size, garden, allergenic, other_animals, fencing, experience_required, photo, shelter_location_postcode]);
            return new Dog(response.rows[0]);
        }

        throw new Error("Dog already exist");
    }


    async update(data) {
        for (const key of Object.keys(this)) {
            if (key !== "dog_id" && key !== "timestamp") {
                this[key] = data[key];
            }
        }

        this.timestamp = new Date();

        const response = await db.query(`UPDATE dogs
                                            SET dog_name = $1, gender = $2, colour = $3, age = $4, size = $5, breed = $6, young_children_compatibility = $7, 
                                            small_animal_compatibility = $8, activity_levels = $9, living_space_size = $10, garden = $11, allergenic = $12,
                                            other_animals = $13, fencing = $14, experience_required = $15, adopted = $16, timestamp = $17, photo = $18, 
                                            shelter_location_postcode = $19
                                            WHERE dog_id = $20
                                            RETURNING *`, 
            [this.dog_name, this.gender, this.colour, this.age, this.size, this.breed, this.young_children_compatibility, this.small_animal_compatibility, 
            this.activity_levels, this.living_space_size, this.garden, this.allergenic,  this.other_animals, this.fencing, this.experience_required, 
            this.adopted, this.timestamp, this.photo, this.shelter_location_postcode, this.dog_id]);


        if (response.rows[0]) {
            return new Dog(response.rows[0]);
        } else {
            throw new Error("Failed to update dog");
        }
        
    }


    async destroy() {
        const response = await db.query("DELETE FROM dogs WHERE dog_id = $1 RETURNING *;", [this.dog_id]);
        return new Dog(response.rows[0]);
    }

};


module.exports = Dog;



