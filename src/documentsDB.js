import { documentsCollection } from "./dbConnect.js";

function findDocument(documentName) {
  return documentsCollection.findOne({ name: documentName });
}

async function updateDocument(documentName, text) {
  const updated = await documentsCollection.updateOne({
    name: documentName
  }, {
    $set: {
      text
    }
  });

  return updated;
}

function getDocuments() {
  return documentsCollection.find().toArray();
}

function insertDocument(documentName) {
  return documentsCollection.insertOne({ name: documentName, text: '' });
}

export { findDocument, updateDocument, getDocuments, insertDocument }