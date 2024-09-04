const db = require("../db/connect");
const InitialAdoption = require("./InitialAdoption");
const MonthlyAdoption = require("./MonthlyAdoption");
const LongTermAdoption = require("./LongTermAdoption");
const { calculateAdoptionCosts } = require("../utils/adoptionCalculator");
const { getCostsBySize } = require("../models/adoptionCosts")

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
        this.neutered = dog.neutered;
        this.microchipped = dog.microchipped;
        this.collar_leash = dog.collar_leash;
        this.obedience_classes_needed = dog.obedience_classes_needed;
        this.timestamp = (dog.timestamp instanceof Date ? dog.timestamp : new Date(dog.timestamp)).toISOString().replace(/T/, " ").replace(/\..+/, "");

        if (dog.associates) {
            this.InitialAdoption = dog.associates.InitialAdoption;
            this.MonthlyAdoption = dog.associates.MonthlyAdoption;
            this.LongTermAdoption = dog.associates.LongTermAdoption;
        }
    }

    static async populateAssociations(dog_id) {
        // Gather the adoption plans
        let initial, monthly, lta;
        initial = await InitialAdoption.show(dog_id);
        if (initial.error) {
            await calculateAdoptionCosts(dog_id, Dog, InitialAdoption, MonthlyAdoption, LongTermAdoption, getCostsBySize);
        }
        
        initial = await InitialAdoption.show(dog_id);
        monthly = await MonthlyAdoption.show(dog_id);
        lta = await LongTermAdoption.show(dog_id);

        console.log("initial")
        console.log(initial)

        console.log("monthly")
        console.log(monthly)

        console.log("lta")
        console.log(lta)

        // Gather the adoption plans additional assoiciated costs
        const initialPopulated = await initial.populateAssociations();
        const monthlyPopulated = await monthly.populateAssociations();
        const ltaPopulated = await lta.populateAssociations();

        console.log("initial populate")
        console.log(initialPopulated)

        console.log("monthly populate")
        console.log(monthlyPopulated)

        console.log("lta populate")
        console.log(ltaPopulated)

        return {
            InitialAdoption: initialPopulated,
            MonthlyAdoption: monthlyPopulated,
            LongTermAdoption: ltaPopulated
        }
    }

    static async getAll() {
        console.log("getALL")
        const org = {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        }

        console.log("org", org);
        const dog = await db.query("SELECT * FROM dogs");
        console.log("dog result query: ");
        const memoryUsage = process.memoryUsage();
        console.log('NODE_OPTIONS:', process.env.NODE_OPTIONS);
        console.log('Memory Usage:');
        console.log(`RSS: ${Math.round(memoryUsage.rss / 1024 / 1024)} MB`);
        console.log(`Heap Total: ${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`);
        console.log(`Heap Used: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`);
        console.log(`External: ${Math.round(memoryUsage.external / 1024 / 1024)} MB`);
        console.log(dog.rows.length);
        if (dog.rows.length === 0) {
            throw new Error("No dogs available");
        }
        return await Promise.all(dog.rows.map(async b => {
            const associates = await Dog.populateAssociations(b.dog_id);
            const ob = {
                ...b, associates: { ...associates }
            }
            return new Dog(ob);
        }));
    }

    static async show(id) {
        const response = await db.query("SELECT * FROM dogs WHERE dog_id = $1;", [id]);
        if (response.rows.length !== 1) {
            throw new Error("No dog found");
        }
        const associates = await Dog.populateAssociations(id);

        const obj = {
            ...response.rows[0], associates: { ...associates }
        }
        return new Dog(obj);
    }

    static async create(data) {

        const { dog_name, gender, colour, age, size, breed, young_children_compatibility,
            small_animal_compatibility, activity_levels, living_space_size, garden, allergenic, 
            other_animals, fencing, experience_required, dog_id, photo, shelter_location_postcode, neutered,
            microchipped, collar_leash, obedience_classes_needed } = data;

        // Check for missing fields
        const missingFields = [
            "dog_name", "gender", "colour", "age", "size", "breed", "neutered", "microchipped", "collar_leash",
            "young_children_compatibility", "small_animal_compatibility", "activity_levels", "obedience_classes_needed",
            "living_space_size", "garden", "allergenic", "other_animals", "fencing", "experience_required", "photo"
        ].filter(field => data[field] === undefined || data[field] === null);

        if (missingFields.length > 0) {
            throw new Error("At least one of the required fields is missing");
        }
        const existingDog = await db.query("SELECT * FROM dogs WHERE dog_id = $1", [dog_id]);
        if (existingDog.rows.length === 0) {
            const response = await db.query(`INSERT INTO dogs 
                (dog_name, gender, colour, age, size, breed, young_children_compatibility,
                small_animal_compatibility, activity_levels, living_space_size, garden, allergenic, 
                other_animals, fencing, experience_required, photo, shelter_location_postcode, neutered,
                microchipped, collar_leash, obedience_classes_needed)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING *`, 
                [dog_name, gender, colour, age, size, breed, young_children_compatibility,
                small_animal_compatibility, activity_levels, living_space_size, garden, allergenic, 
                other_animals, fencing, experience_required, photo, shelter_location_postcode, 
                neutered, microchipped, collar_leash, obedience_classes_needed]);
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

        const response = await db.query(
                                        `UPDATE dogs
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
        const response = await db.query(
            "DELETE FROM dogs WHERE dog_id = $1 RETURNING *;",
            [this.dog_id]
        );
        return new Dog(response.rows[0]);
    }
}

module.exports = Dog;
