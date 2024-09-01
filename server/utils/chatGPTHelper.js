const whatToAsk = `
Do not assume my gender or name. Please just ask me straight away from the list below starting from the first (-). Also dont start off with Sure lets get started or something similar, and also dont put a number before the question! Ask me question around these things below 1 by 1 and in chronological order starting from the first (-) and only ask me 1 question at a time:

- small_animals (Ask if they got small animals? true/false),
- young_children (Ask if they got young children),
- activity (Ask how active they are: low, medium, high),
- living_space_size (Ask about the size of their home? is it small, medium, large),
- garden (Ask if they have a garden),
- allergy_information (Ask if they got allergies),
- other_animals (Ask if they got other animals),
- fencing (Ask the size of their fence in FEET),
- previous_experience_years (Ask if they got previous experience with dogs),
- annual_income (Ask about their annual income),

When done gather all the information and tell me what 5 dog breed you would recommend for me.
`;

const updateWhatToAsk = (question, helperArray, alreadyAsked) => {
    let updatedquestion = question;
    let count = 0;
    helperArray.forEach(key => {
        if (alreadyAsked[key] !== null) {
            count++;
            const regex = new RegExp(`-\\s*${key}\\s*\\(.*?\\)\\s*,?\\s*`, "i");
            updatedquestion = updatedquestion.replace(regex, "");
        }
    });
    if (count === 10) {
        return { question: `Based on the answers for each key value pair below of my preferences.\n
Tell me 5 dog breeds that is good for me. Start of with saying based on your answers here is what we recommend.\n\nPreferences:\n`, count: count }
    }
    return { question: updatedquestion.trim(), count: count };
}

module.exports = {
    updateWhatToAsk, whatToAsk
}