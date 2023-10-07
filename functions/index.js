const { setGlobalOptions } = require("firebase-functions/v2");
setGlobalOptions({ region: "europe-west3" });

require("./admin.js");
const uploadAndVectorialized = require("./stories/upload-and-vectorialize.js");
const summarize = require("./stories//summarize.js");

exports.stories = { uploadAndVectorialized, summarize };
