const { setGlobalOptions } = require("firebase-functions/v2");
setGlobalOptions({ region: "europe-west3" });

require("./admin.js");

const uploadAndVectorialized = require("./stories/upload-and-vectorialize.js");
const modulize = require("./stories/modulize.js");
const createQuiz = require("./stories/create-quiz.js");
const checkQuiz = require("./stories/check-quiz.js");

exports.stories = { uploadAndVectorialized, modulize, createQuiz, checkQuiz };
