require("dotenv").config();
const { trainNlp } = require("./services/runTrainedAI");
const ai21 = require("./services/ai21");

// trainNlp();

(async function main() {
  try {
      const result = await ai21();
      console.log('Received data:', result);
  } catch (error) {
      console.error('Error:', error);
  }
})()