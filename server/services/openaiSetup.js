const OpenAIApi = require("openai");

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this environment variable is set
});


module.exports = openai;