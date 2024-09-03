require('dotenv').config();

const app = require('./app');

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}... + ENV OF ${process.env.APP_LAST_NAME} ENV OF`);
})


// require("dotenv").config();
// const { trainNlp } = require("./services/runTrainedAI");
// const ai21 = require("./services/ai21");
// 
// trainNlp();
// 
// (async function main() {
  // try {
      // const result = await ai21();
      // console.log('Received data:', result);
  // } catch (error) {
      // console.error('Error:', error);
  // }
// })();