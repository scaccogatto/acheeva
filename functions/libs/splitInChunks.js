import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

async function splitIntoChunks(text, chunkSize) {

    const splitter = new RecursiveCharacterTextSplitter ({
      chunkSize: chunkSize,
      chunkOverlap: chunkSize / 5,
    });
    
    const docOutput = await splitter.splitDocuments([
      new Document({ pageContent: text }),
    ]);
  
    return docOutput;
  }