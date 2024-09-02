const db = require("../db/connect");

class MonthlyAdoption {
    constructor(monthly) {
        this.monthly_id = monthly.monthly_id;
        this.calculated_monthly_cost = monthly.calculated_monthly_cost;
        this.amount_of_food_id = monthly.amount_of_food_id;
        this.pet_insurance_id = monthly.pet_insurance_id;
        this.veterinary_care_id = monthly.veterinary_care_id;
        this.dog_id = monthly.dog_id;

        if (monthly.prices) {
            this.vet_price = monthly.prices.vet_price.vet_price;
            this.pet_insurance_price = monthly.prices.insurance_price.insurance_price;
            this.food_price = monthly.prices.food_price.food_price;
        }
    }

    static async create(data) {
        const { calculated_monthly_cost, amount_of_food_id, pet_insurance_id, veterinary_care_id, dog_id } = data;
        const response = await db.query(`INSERT INTO monthly_adoption_cost 
                (calculated_monthly_cost, amount_of_food_id, pet_insurance_id, veterinary_care_id, dog_id)
                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [calculated_monthly_cost, amount_of_food_id, pet_insurance_id, veterinary_care_id, dog_id])

        if (response.rows[0] === 0) {
            throw new Error("Failed to create the table row")
        }
        const final = new MonthlyAdoption(response.rows[0])
        return final;
    }

    static async show(dog_id) {
        const response = await db.query("SELECT * FROM monthly_adoption_cost WHERE dog_id = $1;", [dog_id]);
        if (response.rows.length !== 1) {
            return { error: "No dog found" };
        }
        return new MonthlyAdoption(response.rows[0]);
    }

    async populateAssociations() {
        const food = await db.query("SELECT food_price FROM amount_of_food WHERE amount_of_food_id = $1;", [this.amount_of_food_id]);
        const insurance = await db.query("SELECT insurance_price FROM pet_insurance WHERE pet_insurance_id = $1;", [this.pet_insurance_id]);
        const vet = await db.query("SELECT vet_price FROM veterinary_care WHERE veterinary_care_id = $1;", [this.veterinary_care_id]);

        const prices = {
            food_price: food.rows[0],
            insurance_price: insurance.rows[0],
            vet_price: vet.rows[0]
        };

        const obj = {
            ...this, prices: { ...prices }
        };

        return new MonthlyAdoption(obj);
    }
};


module.exports = MonthlyAdoption;