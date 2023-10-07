// - leggi da storage
// - langchain -> vettorializza
// - salva su pinecone
// - salva stato documento su DB
// - leggi da storage- langchain -> vettorializza- salva su pinecone- salva stato documento su DB

const { onObjectFinalized } = require("firebase-functions/v2/storage");
const { getStorage } = require("firebase-admin/storage");

const { SupabaseVectorStore } = require("langchain/vectorstores/supabase");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { createClient } = require("@supabase/supabase-js");

const { PDFLoader } = require("langchain/document_loaders/fs/pdf");

const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

const CHUNK_SIZE = 1000;

exports.trigger = onObjectFinalized({ memory: '4GiB' }, async (event) => {
  const { bucket, name } = event.data;
  const objectiveId = name.split("objectives/")[1].split("/")[0];

  await db.doc(`/objectives/${objectiveId}`).set(
    {
      sourceReady: false,
      modulized: false,
      quizReady: false,
    },
    { merge: true }
  );

  // download the file
  const actualBucket = getStorage().bucket(bucket);
  const buffer = await actualBucket.file(name).download();
  const blob = new Blob(buffer);

  const loader = new PDFLoader(blob);
  const docs = await loader.loadAndSplit(
    new RecursiveCharacterTextSplitter({
      chunkSize: CHUNK_SIZE,
      chunkOverlap: CHUNK_SIZE / 5,
    })
  );

  const metaDocs = docs.map((doc) => {
    doc.metadata = { ...doc.metadata, objectiveId };
    return doc;
  });

  console.info("processing", objectiveId);

  await toVector(metaDocs);

  await db.doc(`/objectives/${objectiveId}`).set(
    {
      sourceReady: true,
    },
    { merge: true }
  );
});

const toVector = (docs) => {
  const supabaseClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  return SupabaseVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_KEY }),
    {
      client: supabaseClient,
      tableName: "documents",
      queryName: "match_documents",
    }
  );
};
