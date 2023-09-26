import { insertDocumentEmit } from './socket-client-index.js';

const documentList = document.getElementById('lista-documentos');
const form = document.getElementById('form-adiciona-documento');
const inputDocument = document.getElementById('input-documento');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  insertDocumentEmit(inputDocument.value);
  inputDocument.value = '';
})

function insertDocumentLink(documentName) {
  documentList.innerHTML += `
    <a href="documento.html?nome=${documentName}" class="list-group-item list-group-item-action">${documentName}</a>`;
}

export { insertDocumentLink };

