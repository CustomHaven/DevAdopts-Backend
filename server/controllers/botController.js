const Preference = require("../models/Preference");
const openai = require("../services/openaiSetup");
const { updateWhatToAsk, whatToAsk, questionObj } = require("../utils/chatGPTHelper");
const axios = require("axios");

async function interactWithAI(req, res) {
    try {
        const url = process.env.AI21_URL;
        const token = process.env.AI21_API;

        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
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

        // refinedObj.small_animals = "I have 4";
        // refinedObj.young_children = "I have 6";
        // refinedObj.activity = "High";
        // refinedObj.living_space_size = "large";
        // refinedObj.garden = "yes";
        // refinedObj.allergy_information = "High";
        // refinedObj.other_animals = "3 cats";
        // refinedObj.fencing = "6 foot";
        // refinedObj.previous_experience_years = "yes i got 5 years";
        // refinedObj.annual_income= 50000;

        const updateQuestion = updateWhatToAsk(whatToAsk, requiredKeys, refinedObj);
        
        if (updateQuestion.count === 10) {
            updateQuestion.question += JSON.stringify(refinedObj);
        }

        const secondOptionData = {
            "messages": [
                {
                    "text": updateQuestion.question,
                    "role": "user"
                }
            ],
            "system": "Doctor"
        };

        let
        gptResponse = await openai.chat.completions.create({
            // messages: [{ "role": "user", "content": "Explain quantum computing in detail." }],
            messages: [{ "role": "assistant", "content": updateQuestion.question }],
            // model: "gpt-3.5-turbo"
            model: "gpt-4o-mini"
            // model: "text-embedding-3-small"
        });

        console.log("GETRESPONSE!?", gptResponse)
        console.log("\n\n\n\n\n")

        if (gptResponse.status === 429) {
            if (updateQuestion.count === 10) {
                const secondAI = await axios.post(url, secondOptionData, { headers });
                return res.status(200).json({ data: { answer: secondAI.data.outputs[0].text } });
            } else {
                const theQuestion = questionObj[updateQuestion.updatedList[0]]
                return res.status(200).json({ data: { answer: theQuestion } });
            }
            
        }


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
        console.log("create reached", req.body);
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