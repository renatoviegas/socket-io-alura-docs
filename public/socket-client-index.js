import { insertDocumentLink } from "./index.js";

const socket = io();

socket.emit('get-documents', (documents) => {
  documents.forEach(document => {
    insertDocumentLink(document.name);
  });
});

function insertDocumentEmit(documentName) {
  socket.emit('insert-document', documentName);
}

socket.on('insert-document-interface', (documentName) => {
  insertDocumentLink(documentName);
})

export { insertDocumentEmit };