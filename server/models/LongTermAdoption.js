const db = require("../db/connect");

class LongTermAdoption {
    constructor(lta) {
        this.long_term_id = lta.long_term_id;
        this.calculated_long_term_cost = lta.calculated_long_term_cost;
        this.end_of_life_id = lta.end_of_life_id;
        this.average_medical_cost = lta.average_medical_cost;
        this.dog_id = lta.dog_id;

        if (lta.prices) {
            this.end_of_life_price = lta.prices.end_of_life_price.end_of_life_price;
        }
    }

    static async create(data) {
        const { calculated_long_term_cost, end_of_life_id, average_medical_cost, dog_id } = data;
        const response = await db.query(`INSERT INTO long_term_adoption_cost 
                (calculated_long_term_cost, end_of_life_id, average_medical_cost, dog_id)
                VALUES ($1, $2, $3, $4) RETURNING *`,
            [calculated_long_term_cost, end_of_life_id, average_medical_cost, dog_id])

        if (response.rows[0] === 0) {
            throw new Error("Failed to create the table row")
        }
        const final = new LongTermAdoption(response.rows[0])
        return final;
    }

    static async show(dog_id) {
        const response = await db.query("SELECT * FROM long_term_adoption_cost WHERE dog_id = $1;", [dog_id]);
        if (response.rows.length !== 1) {
            return { error: "No dog found" };
        }
        return new LongTermAdoption(response.rows[0]);
    }

    async populateAssociations() {
        const eol = await db.query("SELECT end_of_life_price FROM end_of_life WHERE end_of_life_id = $1;", [this.end_of_life_id]);

        const prices = {
            end_of_life_price: eol.rows[0],
        };

        const obj = {
            ...this, prices: { ...prices }
        };

        return new LongTermAdoption(obj);
    }
};


module.exports = LongTermAdoption;