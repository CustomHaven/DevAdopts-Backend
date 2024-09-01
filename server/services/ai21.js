// https://docs.ai21.com/reference/j2-chat-api
// https://docs.ai21.com/reference/j2-complete-api-ref

const axios = require("axios");

const url = process.env.AI21_URL;
const token = process.env.AI21_API;

const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
};

const data = {
    "messages": [
        {
            "text": "What dog breeds are the fastest",
            "role": "user"
        }
    ],
    "system": "Doctor"
};

const ai21 = async () => {
    const response = await axios.post(url, data, { headers });
    return await response.data;
}


module.exports = ai21;