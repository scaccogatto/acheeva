const { onCall, HttpsError } = require("firebase-functions/v2/https");

const { RetrievalQAChain } = require("langchain/chains");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { SupabaseVectorStore } = require("langchain/vectorstores/supabase");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");

const { createClient } = require("@supabase/supabase-js");

const { onDocumentUpdated } = require("firebase-functions/v2/firestore");

const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

exports.trigger = onCall(async (request) => {
  const { reply, question, objectiveId } = request.data;

  console.log("got check quiz", objectiveId, reply);
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_KEY,
  });

  const supabaseClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  const vectorStore = new SupabaseVectorStore(
    new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_KEY }),
    // { client: supabaseClient, tableName: `documents_${objectiveId}` }
    {
      client: supabaseClient,
      tableName: `documents`,
      filter: {
        objectiveId,
      },
    }
  );

  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

  // TODO
  const { text } = await chain.call({
    query: `About this question:
    
    ${question}
    -----
    a student gave this reply:
    
    ${reply}
    -----

    do you think this is a good reply based on context? Reply "YES" or "NO"`,
  });

  await db.doc(`/objectives/${objectiveId}`).set(
    {
      goodReply: true,
      questionCheck: text,
    },
    { merge: true }
  );
});
