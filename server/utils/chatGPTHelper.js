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
`;

const updateWhatToAsk = (question, helperArray, alreadyAsked) => {
    let updatedquestion = question;
    let count = 0;
    helperArray.forEach(key => {
        if (key in alreadyAsked) {
            count++;
            const regex = new RegExp(`\\s*${key}\\s+\\S+\\s+\\S*\\s*,?`, "i");
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