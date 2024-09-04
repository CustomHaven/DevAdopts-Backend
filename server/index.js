require('dotenv').config();

const app = require('./app');

app.listen(process.env.PORT, () => {
    const memoryUsage = process.memoryUsage();
    console.log('NODE_OPTIONS:', process.env.NODE_OPTIONS);
    console.log('Memory Usage:');
    console.log(`RSS: ${Math.round(memoryUsage.rss / 1024 / 1024)} MB`);
    console.log(`Heap Total: ${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`);
    console.log(`Heap Used: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`);
    console.log(`External: ${Math.round(memoryUsage.external / 1024 / 1024)} MB`);
    console.log(`App listening on port ${process.env.PORT}... + ENV OF ${process.env.APP_LAST_NAME} ENV OF ${process.env.NODE_ENV} stage`);
})

// Memory usage logging
setInterval(() => {
    const memoryUsage = process.memoryUsage();
    console.log('Memory Usage:');
    console.log(`RSS: ${Math.round(memoryUsage.rss / 1024 / 1024)} MB`);
    console.log(`Heap Total: ${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`);
    console.log(`Heap Used: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`);
    console.log(`External: ${Math.round(memoryUsage.external / 1024 / 1024)} MB`);
}, 60000); // Logs memory usage every 60 seconds
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