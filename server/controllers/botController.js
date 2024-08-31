const Preference = require("../models/Preference");
const openai = require("../services/openaiSetup");
const { updateWhatToAsk, whatToAsk } = require("../utils/chatGPTHelper");

async function interactWithAI(req, res) {
    try {
        const requiredKeys = [
            "small_animals", "young_children", "activity", "living_space_size", "garden", "allergy_information", "other_animals", "fencing", "previous_experience_years", "annual_income"
        ]

        const id = req.params.preference_id;

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

        console.log("REFINE", refinedObj);

        const updateQuestion = updateWhatToAsk(whatToAsk, requiredKeys, refinedObj);

        console.log("updarequestion", updateQuestion);
        
        if (updateQuestion.count === 10) {
            updateQuestion.question += JSON.stringify(refinedObj);
        }

        const gptResponse = await openai.chat.completions.create({
            messages: [{ "role": "assistant", "content": updateQuestion.question }],
            model: "gpt-4o-mini"
        });

        res.status(200).json({ data: { answer: gptResponse.choices[0].message.content } });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        const id = req.params.preference_id;
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
        const newPreference = await Preference.create(data.user_id);
        res.status(201).json({ data: newPreference });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.preference_id;
        const preference = await Preference.show(parseInt(id));
        await preference.destroy();
        res.sendStatus(204);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = { update, create, destroy, interactWithAI }