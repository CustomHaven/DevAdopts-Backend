const db = require("../db/connect");

class InitialAdoption {
    constructor(initial) {
        this.initial_id = initial.initial_id;
        this.calculated_initial_price = initial.calculated_price;
        this.neutering_price_id = initial.neutering_price_id;
        this.microchip_price = initial.microchip_price;
        this.bed_size_id = initial.bed_size_id;
        this.collar_leash_price = initial.collar_leash_price;
        this.obedience_classes_price = initial.obedience_classes_price;
        this.dog_id = initial.dog_id;

        if (initial.prices) {
            this.neutering_price = initial.prices.neutering_price.neutering_price;
            this.bed_price = initial.prices.bed_price.bed_price;
        }
                // "bed_price": {
        //   "bed_price": 30
        // }
    }

    static async create(data) {
        const {
            calculated_price,
            neutering_price_id,
            microchip_price,
            bed_size_id,
            collar_leash_price,
            obedience_classes_price,
            dog_id
        } = data;
        const response = await db.query(`INSERT INTO initial_adoption_cost 
                (calculated_initial_price, neutering_price_id, microchip_price, bed_size_id, collar_leash_price, obedience_classes_price, dog_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [calculated_price, neutering_price_id, microchip_price, bed_size_id, collar_leash_price, obedience_classes_price, dog_id])

        if (response.rows[0] === 0) {
            throw new Error("Failed to create the table row")
        }
        const final = new InitialAdoption(response.rows[0])

        return final;
    }

    static async show(dog_id) {
        const response = await db.query("SELECT * FROM initial_adoption_cost WHERE dog_id = $1;", [dog_id]);
        if (response.rows.length !== 1) {
            return { error: "No dog found" };
        }
        return new InitialAdoption(response.rows[0]);
    }

    async populateAssociations() {
        const neutering_price = await db.query("SELECT neutering_price FROM neutering_price WHERE neutering_price_id = $1;", [this.neutering_price_id]);
        const bed = await db.query("SELECT bed_price FROM bed_size WHERE bed_size_id = $1;", [this.bed_size_id]);

        const prices = {
            neutering_price: neutering_price.rows[0],
            bed_price: bed.rows[0]
        };

        const obj = {
            ...this, prices: { ...prices }
        };

        return new InitialAdoption(obj);
    }
};


module.exports = InitialAdoption;