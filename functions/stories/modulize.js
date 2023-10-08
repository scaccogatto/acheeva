const { RetrievalQAChain } = require("langchain/chains");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { SupabaseVectorStore } = require("langchain/vectorstores/supabase");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");

const { createClient } = require("@supabase/supabase-js");

const { onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

const OpenAI = require("openai");

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

      const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

      const modules = await Promise.all(
        topics.map(async (topic) => {
          const title = topic.trim();
          const imageprompt = (await chain.call({
            query: `Avoiding generating images with text in it, act like a prompt engineer and give me a prompt with maximum 10 words for that generates an image about the topic: ${title} considering the whole context`,
          })).text;

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
            picture: (await openai.images.generate({
              prompt: imageprompt,
              n: 1,
              size: "256x256",
            })).data[0].url,
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
