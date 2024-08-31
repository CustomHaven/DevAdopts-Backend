const db = require("../db/connect");

class Preference {
    constructor(preference) {
        this.preference_id = preference.preference_id;
        this.small_animals = preference.small_animals; // important
        this.young_children = preference.young_children; // important
        this.activity = preference.activity; // imporant
        this.living_space_size = preference.living_space_size; // imporant
        this.garden = preference.garden; // imporant
        this.allergy_information = preference.allergy_information; // imporant
        this.other_animals = preference.other_animals; // imporant
        this.fencing = preference.fencing; // imporant
        this.previous_experience_years = preference.previous_experience_years; // imporant
        this.annual_income = preference.annual_income; // imporant
        this.timestamp = (preference.timestamp instanceof Date ? preference.timestamp : new Date(preference.timestamp)).toISOString().replace(/T/, " ").replace(/\..+/, "");
        this.user_id = preference.user_id;
    }

    static async show(id) {
        const response = await db.query("SELECT * FROM preferences WHERE preference_id = $1;", [id]);
        if (response.rows.length !== 1) {
            throw new Error("No Preference found");
        }
        return new Preference(response.rows[0]);
    }

    static async create(user_id) {
        if (!user_id) {
            throw new Error("User Id is requried.");
        }
        const response = await db.query(`INSERT INTO preferences 
            (user_id)
            VALUES ($1) RETURNING *`, 
            [user_id]);
        
        const preferenceInstanceArray = [new Preference(response.rows[0])];
        
        const finalObject = preferenceInstanceArray.map(preference => {
            const finalObject = {};
            for (const [key, value] of Object.entries(preference)) {
                if (value !== undefined) {
                    finalObject[key] = value;
                }
            }
            return finalObject;
        })[0];
        return finalObject;
        // return response.rows.filter(preference => new Preference(preference) !== undefined)[0];
    }

    async update(key, value) {
        if (!key || value === undefined) {
            throw new Error("Key-value pair must be given");
        }
        this[key] = String(value);
        this.timestamp = new Date();

        const response = await db.query(`UPDATE preferences
                                            SET ${key} = $1,
                                            timestamp = $2
                                            WHERE preference_id = $3
                                            RETURNING *`, 
            [this[key], this.timestamp, this.preference_id]);

        if (response.rows[0]) {
            const preferenceInstanceArray = [new Preference(response.rows[0])];

            const finalObject = preferenceInstanceArray.map(preference => {
                
                const finalObject = {};
                for (const [key, value] of Object.entries(preference)) {
                    if (value !== undefined) {
                        finalObject[key] = value;
                    }
                }
                return finalObject;
            })[0];

            return finalObject;
        } else {
            throw new Error("Failed to update preference table");
        }

        
    }


    async destroy() {
        const response = await db.query("DELETE FROM preferences WHERE preference_id = $1 RETURNING *;", [this.preference_id]);
        return new Preference(response.rows[0]);
    }
}


module.exports = Preference;