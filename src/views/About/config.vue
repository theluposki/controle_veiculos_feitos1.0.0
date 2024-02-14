<script setup>
import { ref } from "vue";
import { db, deleteDataBase } from "../../database/dexie.js";

const inputCSV = ref("");

const deleteAllDatabase = async () => {
  const conf = confirm("Deletar base de dados.")
  
  if(conf) {
    const result = await deleteDataBase();
    alert(result);
  }
}

function pasteFromClipboardToTextarea() {
  navigator.clipboard.readText()
    .then(clipboardText => {
      inputCSV.value = clipboardText;
    })
    .catch(error => {
      console.error('Erro ao colar da área de transferência:', error);
    });
}

function trashInputCSV() {
  inputCSV.value = ""
}


/////////////////

function insertDataToDB(row) {
  const dataToInsert = {
    marca: row.marca,
    placa: row.placa,
    qtdPecas: parseInt(row.qtdPecas),
    data: row.data,
  };

  // Insere os dados no DexieDB
  db.dados.add(dataToInsert)
    .then(() => {
      console.log('Inserido com sucesso:', dataToInsert.placa);
    })
    .catch(error => {
      console.error('Erro ao inserir no banco de dados:', error);
    });
}

// Função para processar cada linha do CSV e chamar a função de inserção
function processCSV(csvContent) {
  const lines = csvContent.split('\n').slice(1); // Ignora o cabeçalho
  lines.forEach(line => {
    const [marca, placa, qtdPecas, data, id] = line.split(',');
    const row = { marca, placa, qtdPecas, data, id };
    insertDataToDB(row);
  });

  alert("Dados Inseridos com sucesso!")
}

async function importDatabaseFromCSV() {
  const fistLine = inputCSV.value.split('\n')[0]

  if(!inputCSV.value && fistLine !== 'marca,placa,qtdPecas,data,id') {
    alert("Insira um CSV válido.")
  }
  processCSV(inputCSV.value);
}

////////////////

</script>

<template>
  <div class="page-int config">
    <h1>Configurações</h1>

    <div class="importDatabase">
      <header class="headerImportDatabase">
        <h3>Importar dados</h3>
        <p>a partir de um csv</p>
      </header>
      <textarea class="inputCSV" v-model="inputCSV"></textarea>
      <div class="actions">
        <div class="left">
          <button class="btn" @click="pasteFromClipboardToTextarea">
            <i class="ri-clipboard-line"></i>
          </button>
          <button class="btn muted" @click="trashInputCSV">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
        <div class="right">
          <button class="btn success" @click="importDatabaseFromCSV">
            <i class="ri-download-2-line"></i>
            Importar
          </button>
        </div>
      </div>
    </div>


    <br><br><br>
    <br><br><br>
    <br><br><br>
    <button class="btn red" @click="deleteAllDatabase">Deletar Base de Dados</button>
  </div>
</template>

<style scoped>
.config {
  display: flex;
  flex-direction: column;
  padding: 24px;
}

.importDatabase {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 24px 0;
}

.inputCSV {
  resize: none;
  min-height: 100px;
  max-height: 100px;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 1.2rem;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.left, .right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn:focus {
  color: var(--primary);
}

.btn {
  border: solid 1px var(--dark);
  font-size: 1.6rem;
  font-weight: bold;
  border-radius: 4px;
  padding: 8px 16px;
  background-color: var(--dark);
  color: var(--white);
}

.muted {
  background-color: var(--silver);
  color: var(--dark);
}

.success {
  background-color: var(--primary);
  color: var(--dark);
}

.red {
  background-color: var(--danger);
}

.btn:hover {
  transition: opacity ease .4s;
  opacity: .95;
  cursor: pointer;
}

.btn:active {
  scale: .95;
}
</style>