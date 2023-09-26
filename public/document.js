import { selectDocument, textEditorEmit } from "./socket-client-document.js";

const params = new URLSearchParams(window.location.search);
const documentName = params.get('nome');
const textEditor = document.getElementById('editor-texto');
const documentTitle = document.getElementById('titulo-documento');

documentTitle.textContent = documentName || 'Documento sem título';

selectDocument(documentName);

textEditor.addEventListener('keyup', () => {
  textEditorEmit({
    text: textEditor.value,
    documentName
  });
});

function updateTextEditor(text) {
  textEditor.value = text;
}

export { updateTextEditor }