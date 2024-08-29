const OpenAIApi = require("openai");

const openai = new OpenAIApi({
    // organization: "org-LI3vyh2w9Zi9FBlICXYjMaNi",
    // project: "proj_9IboRjjNHEGQTkHpITd1BCEY",
    apiKey: process.env.OPENAI_API_KEY, // Ensure this environment variable is set
});


module.exports = openai;