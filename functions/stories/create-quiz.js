const { RetrievalQAChain } = require("langchain/chains");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { SupabaseVectorStore } = require("langchain/vectorstores/supabase");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");

const { createClient } = require("@supabase/supabase-js");

const { onDocumentUpdated } = require("firebase-functions/v2/firestore");

const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

exports.trigger = onDocumentUpdated(
  "objectives/{objectiveId}",
  async (event) => {
    const { objectiveId } = event.params;

    console.info("triggered", objectiveId);

    if (
      event.data.before.data().modulized === false &&
      event.data.after.data().modulized === true
    ) {
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
        {
          client: supabaseClient,
          tableName: `documents`,
          filter: {
            objectiveId,
          },
        }
      );

      const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

      const { modules } = event.data.after.data();

      const questions = await Promise.all(
        modules.map(async ({ topic }) => {
          const { text } = await chain.call({
            query: `Generate a question based on the context and the following topic: ${topic}`,
          });

          return text;
        })
      );

      await db.doc(`/objectives/${objectiveId}`).set(
        {
          quizReady: true,
          quizQuestions: questions,
        },
        { merge: true }
      );
    }
  }
);
