// - leggi da storage
// - langchain -> vettorializza
// - salva su pinecone
// - salva stato documento su DB
// - leggi da storage- langchain -> vettorializza- salva su pinecone- salva stato documento su DB
async function readDocumentFromCloudStorage(bucketName, fileName) {
    // Import the Cloud Storage client library.
    const { Storage } = require('@google-cloud/storage');
  
    // Create a new Cloud Storage client.
    const storage = new Storage();
  
    // Get the bucket object.
    const bucket = storage.bucket(bucketName);
  
    // Get the file object.
    const file = bucket.file(fileName);
  
    // Create a read stream for the file.
    const readStream = file.createReadStream();
  
    // Read the contents of the file.
    const fileContents = await new Promise((resolve, reject) => {
      const chunks = [];
      readStream.on('data', (chunk) => {
        chunks.push(chunk);
      });
      readStream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      readStream.on('error', (err) => {
        reject(err);
      });
    });
  
    // Return the contents of the file.
    return fileContents;
  }


  