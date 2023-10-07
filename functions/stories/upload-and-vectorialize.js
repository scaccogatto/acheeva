// - leggi da storage
// - langchain -> vettorializza
// - salva su pinecone
// - salva stato documento su DB
// - leggi da storage- langchain -> vettorializza- salva su pinecone- salva stato documento su DB

import { onObjectFinalized } from "firebase-functions/v2/storage";
import { getStorage } from "firebase-admin/storage";

import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";

export const uploadAndVectorialized = onObjectFinalized(
  ({},
  async (event) => {
    const { bucket, name } = event.data;

    // download the file
    const actualBucket = getStorage().bucket(bucket);
    const downloadResponse = await actualBucket.file(name).download();
    console.log(downloadResponse);
  })
);

const supabaseClient = createClient(
  "https://gqezyrgsnggnizmjajay.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxZXp5cmdzbmdnbml6bWphamF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY2OTI2NjMsImV4cCI6MjAxMjI2ODY2M30.04n_cJx6DxWtLCmhpNbbMQ3Mf42XBeq7CQaF5itTMZQ"
);

const toVector = (docs) => {
  SupabaseVectorStore.fromDocuments(docs, embeddings, {
    client: supabaseClient,
    tableName: "documents",
    queryName: "match_documents",
  });
};
