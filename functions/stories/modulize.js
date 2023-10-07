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
      event.data.before.data().sourceReady === false &&
      event.data.after.data().sourceReady === true
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

      const { text } = await chain.call({
        query:
          "Give me a list of the main topics about the context, divided by a pipe character.",
      });

      const topics = text.split("|").map((e) => e.trim());

      const modules = await Promise.all(
        topics.map(async (topic) => {
          const title = topic.trim();

          return {
            title,
            subtitle: (
              await chain.call({
                query: `Give me a subtitle about the topic: ${title}`,
              })
            ).text,
            summary: (
              await chain.call({
                query: `Give me a summary about the topic: ${title}`,
              })
            ).text,
          };
        })
      );

      await db.doc(`/objectives/${objectiveId}`).set(
        {
          modulized: true,
          modules,
        },
        { merge: true }
      );
    }
  }
);
