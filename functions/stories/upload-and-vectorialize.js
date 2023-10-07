// - leggi da storage
// - langchain -> vettorializza
// - salva su pinecone
// - salva stato documento su DB
// - leggi da storage- langchain -> vettorializza- salva su pinecone- salva stato documento su DB

const { onObjectFinalized } = require("firebase-functions/v2/storage");
const { getStorage } = require("firebase-admin/storage");

const { SupabaseVectorStore } = require("langchain/vectorstores/supabase");
const { createClient } = require("@supabase/supabase-js");

const { PDFLoader } = require("langchain/document_loaders/fs/pdf");

const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore()

exports.trigger = onObjectFinalized({ region: 'europe-west3' },
  async (event) => {
    const { bucket, name } = event.data;

    // download the file
    // const actualBucket = getStorage().bucket(bucket);
    // const pdfUrl = actualBucket.file(name).publicUrl();
    const pdfUrl = "./objectives/1/test-pdf.pdf"

    const loader = new PDFLoader(pdfUrl);
    const docs = await loader.load();

    const objectiveId = name
      .split('objectives/')
      [1]
      .split('/')
      [0]

    console.log('processing', objectiveId)

    await db
      .doc(`/objectives/${objectiveId}`)
      .set({
        sourceReady: true
      }, { merge: true })
  });

const supabaseClient = createClient(
  "https://gqezyrgsnggnizmjajay.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxZXp5cmdzbmdnbml6bWphamF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY2OTI2NjMsImV4cCI6MjAxMjI2ODY2M30.04n_cJx6DxWtLCmhpNbbMQ3Mf42XBeq7CQaF5itTMZQ"
);

const toVector = (objectiveId, docs) => {
  SupabaseVectorStore.fromDocuments(docs, embeddings, {
    client: supabaseClient,
    tableName: `${objectiveId}_documents`,
    queryName: "match_documents",
  });
};
