const openai = require("../services/openaiSetup");
const Preference = require("../models/Preference");

async function interactWithAI(req, res) {
    try {
        const requiredKeys = [
            "small_animals", "young_children", "activity", "living_space_size", "garden", "allergy_information", "other_animals", "fencing", "previous_experience_years", "annual_income"
        ]
        const whatToAsk = `
        Please just ask me straight away dont start off with Sure lets get started or something similar! Ask me question around these things 1 by 1:
        
            small_animals BOOLEAN NOT NULL,
            young_children BOOLEAN NOT NULL,
            activity VARCHAR(10) NOT NULL, -- low, medium high
            living_space_size VARCHAR(50) NOT NULL,
            garden BOOLEAN NOT NULL,
            allergy_information VARCHAR(10) NOT NULL,
            other_animals BOOLEAN NOT NULL,
            fencing VARCHAR(10) NOT NULL, -- FEET
            previous_experience_years INT NOT NULL,
            annual_income INT
        
            When done gather all the information and tell me what 5 dog breed you would recommend for me.
        `

        const id = req.params.id;
        const data = req.body;
        const preference = await Preference.show(parseInt(id));

        const refinedObj = [preference].map(preference => {
            const finalObject = {};
            for (const [key, value] of Object.entries(preference)) {
                if (value !== undefined) {
                    finalObject[key] = value;
                }
            }
            return finalObject;
        })[0];
    } catch {
        res.status(400).json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const preference = await Preference.show(parseInt(id));
        const updatePrefernce = await preference.update(Object.keys(data)[0], Object.values(data)[0]);
        res.status(200).json({ data: updatePrefernce });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const newPreference = await Preference.create(data);
        res.status(201).json({ data: newPreference });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id;
        const preference = await Preference.show(parseInt(id));
        await preference.destroy();
        res.sendStatus(204);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = { update, create, destroy, interactWithAI }