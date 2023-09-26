import { findDocument, getDocuments, updateDocument, insertDocument } from "./documentsDB.js";
import io from "./server.js"

const documents = [
  {
    name: 'JavaScript',
    text: 'texto de javascript...'
  },
  {
    name: 'Node',
    text: 'texto de node...'
  },
  {
    name: 'Socket.io',
    text: 'texto de socket.io...'
  }
]

io.on('connection', (socket) => {
  console.log('Client connected. ID:', socket.id)

  socket.on('get-documents', async (returnDocuments) => {
    const documents = await getDocuments();

    returnDocuments(documents);
  });

  socket.on('insert-document', async (documentName) => {
    const document = await findDocument(documentName);

    if (document) {
      return;
    }

    const result = await insertDocument(documentName);

    if (result.acknowledged) {
      io.emit('insert-document-interface', documentName);
    }
  })

  socket.on('document-selection', async (documentName, returnText) => {
    socket.join(documentName)

    const document = await findDocument(documentName);

    if (document) {
      returnText(document.text)
    }
  });

  socket.on('text-editor', async ({ text, documentName }) => {
    const result = await updateDocument(documentName, text);

    if (result.modifiedCount) {
      socket.to(documentName).emit('text-editor-client', text);
    }
  })
})

