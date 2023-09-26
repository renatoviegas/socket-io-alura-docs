import { updateTextEditor } from "./document.js";

const socket = io();

function textEditorEmit(data) {
  socket.emit('text-editor', data);
};

function selectDocument(name) {
  socket.emit('document-selection', name, (text) => {
    updateTextEditor(text);
  });
};

socket.on('text-editor-client', (text) => {
  updateTextEditor(text)
});

export { textEditorEmit, selectDocument };