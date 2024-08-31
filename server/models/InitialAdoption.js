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
        this.timestamp = initial.timestamp;
        this.dog_id = initial.dog_id;
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
        console.log("CODE REACHES")
        const response = await db.query(`INSERT INTO initial_adoption_cost 
                (calculated_initial_price, neutering_price_id, microchip_price, bed_size_id, collar_leash_price, obedience_classes_price, dog_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [calculated_price, neutering_price_id, microchip_price, bed_size_id, collar_leash_price, obedience_classes_price, dog_id])

        if (response.rows[0] === 0) {
            throw new Error("Failed to create the table row")
        }

        return new InitialAdoption(response.rows[0]);
    }
};


module.exports = InitialAdoption;