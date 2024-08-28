// https://github.com/axa-group/nlp.js/blob/master/examples/02-qna-classic/index.js
const { NlpManager } = require("node-nlp");
const trainnlp = require("./train-ai");
const fs = require("fs")
const ConsoleConnector = require("./ConsoleConnector");

const nlp = new NlpManager({ languages: ["en"], threshold: 0.5 });
nlp.container.register("fs", fs);


const connector = new ConsoleConnector();
connector.onHear = async (parent, line) => {
  if (line.toLowerCase() === "quit") {
    connector.destroy();
    process.exit();
  } else {
    const result = await nlp.process(line);
    connector.say(result.answer);
  }
};

module.exports = {
  trainNlp: (async () => {
    await trainnlp(nlp);
    connector.say("Say something!");
  })
};