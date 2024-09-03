const whatToAsk = `
Do not assume my gender or name. Please just ask me straight away from the list below starting from the first dash you see. Also dont start off with Sure lets get started or something similar, and also dont put a number before the question! Ask me question around these things below 1 by 1 and in chronological order starting from the first dash and only ask me 1 question at a time:

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

const questionObj = {
    small_animals: "Have you got any small animals? (True/False): ",
    young_children: "Do you have any small children?: ",
    activity: "How active are you? (Low, Medium, High): ",
    living_space_size: "How big is your living space?: ",
    garden: "Do you have a garden? (Yes/No): ",
    allergy_information: "Do you have any allergies?: ",
    other_animals: "Is there any other animals in your possession?: ",
    fencing: "How long is your fence? (Feet): ",
    previous_experience_years: "Do you have any previous experience with dogs?: ",
    annual_income: "What is your annual income?: ",
}

const updateWhatToAsk = (question, helperArray, alreadyAsked) => {
    let updatedquestion = question;
    let count = 0;
    const arr = [ ...helperArray ]; 
    const newList = arr.filter(key => {
        if (alreadyAsked[key] !== null) {
            count++;
            const regex = new RegExp(`-\\s*${key}\\s*\\(.*?\\)\\s*,?\\s*`, "i");
            updatedquestion = updatedquestion.replace(regex, "");
            // so delete arr value with null
            return false;
        }
        return true;
    });
    if (count === 10) {
        return { question: `Based on the answers for each key value pair below of my preferences.\n
Tell me 5 dog breeds that is good for me. Start of with saying based on your answers here is what we recommend.\n\nPreferences:\n`, count: count }
    }
    return { question: updatedquestion.trim(), count: count, updatedList: newList };
}

module.exports = {
    updateWhatToAsk, whatToAsk, questionObj
}