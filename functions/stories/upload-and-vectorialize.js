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

console.log(process.env.OPENAI_KEY);

exports.trigger = onObjectFinalized(
  { region: "europe-west3" },
  async (event) => {
    console.log(process.env.SUPABASE_URL);
    const { bucket, name } = event.data;

    // download the file
    // const actualBucket = getStorage().bucket(bucket);
    // const pdfUrl = actualBucket.file(name).publicUrl();
    const pdfUrl = "./objectives/1/test-pdf.pdf";

    const loader = new PDFLoader(pdfUrl);
    const docs = await loader.loadAndSplit(
      new RecursiveCharacterTextSplitter({
        chunkSize: CHUNK_SIZE,
        chunkOverlap: CHUNK_SIZE / 5,
      })
    );

    const objectiveId = name.split("objectives/")[1].split("/")[0];

    console.info("processing", objectiveId);
    console.info(docs);

    toVector(objectiveId, docs);

    await db.doc(`/objectives/${objectiveId}`).set(
      {
        sourceReady: true,
      },
      { merge: true }
    );
  }
);

const toVector = (objectiveId, docs) => {
  const supabaseClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  SupabaseVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_KEY }),
    {
      client: supabaseClient,
      tableName: `${objectiveId}_documents`,
      queryName: "match_documents",
    }
  );
};
